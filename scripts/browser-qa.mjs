import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { servePreview } from "./serve-preview.mjs";
const server = process.env.TEST_BASE_URL ? null : await servePreview();
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const args = process.env.CHROMIUM_ARGS_MODULE
  ? (await import(process.env.CHROMIUM_ARGS_MODULE)).default.args
  : ["--no-sandbox", "--disable-dev-shm-usage"];
if (process.env.CHROMIUM_EXECUTABLE_PATH)
  args.push(
    "--no-zygote",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  );
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  args: args.filter((arg) => arg !== "--single-process"),
});
const results = [],
  errors = [];
await mkdir("qa-output", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.screenshot({ path: "qa-output/home-desktop.png" });
  assert.equal(await page.locator("h1").count(), 1);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Horizontal overflow: ${width}`,
    );
  }
  results.push("Home: no horizontal overflow at 1440, 1024, 768, 390, 320px");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(
    await page.locator("canvas").count(),
    0,
    "Mobile should start without WebGL",
  );
  for (let y = 0; y < 9000; y += 500) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: "qa-output/home-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Menu +", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await page.waitForURL("**/projects");
  await page.getByRole("button", { name: /Finance03/ }).click();
  assert.equal(await page.locator(".project-entry").count(), 3);
  await page.getByRole("button", { name: "Grid", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-entry").count(), 3);
  await page.getByRole("searchbox").fill("valuation");
  assert.equal(await page.locator(".project-entry").count(), 1);
  await page.getByRole("searchbox").fill("nothing-matches");
  assert.equal(await page.locator(".project-entry").count(), 0);
  await page.getByRole("searchbox").fill("");
  results.push(
    "Mobile menu, discipline filters, grid view, search and empty state",
  );
  await page.goto(`${base}/projects/wheel-assembly`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "Quick view" }).click();
  assert(
    await page.getByRole("region", { name: "Project quick view" }).isVisible(),
  );
  await page
    .getByRole("button", { name: "Full case study +", exact: true })
    .click();
  await page.getByRole("button", { name: "Baseline", exact: true }).click();
  await page.getByText("View chart data", { exact: true }).click();
  assert.equal(await page.locator("tbody tr").count(), 6);
  await page.screenshot({ path: "qa-output/case-mobile.png", fullPage: true });
  results.push("Project quick/full views and accessible chart data");
  const audits = [];
  for (const route of [
    "/",
    "/projects",
    "/projects/wheel-assembly",
    "/about",
    "/experience",
    "/contact",
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const audit = await new AxeBuilder({ page })
      .setLegacyMode(true)
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    audits.push({
      route,
      violations: audit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Mobile overflow: ${route}`,
    );
  }
  await writeFile(
    "qa-output/accessibility.json",
    JSON.stringify(audits, null, 2),
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/projects", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "qa-output/projects-desktop.png",
    fullPage: true,
  });
  await page.goto(base + "/projects/wheel-assembly", {
    waitUntil: "networkidle",
  });
  await page.screenshot({ path: "qa-output/case-desktop.png", fullPage: true });
  const reduced = await context.newPage();
  await reduced.setViewportSize({ width: 1440, height: 1000 });
  await reduced.emulateMedia({ reducedMotion: "reduce" });
  await reduced.goto(base, { waitUntil: "networkidle" });
  assert.equal(
    await reduced.locator("canvas").count(),
    0,
    "Reduced motion should not auto-start WebGL",
  );
  await reduced.close();
  results.push("Reduced-motion static fallback");
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base + "/projects/flow-optimisation");
  assert((await staticPage.locator("h1").textContent()).includes("Flow"));
  await staticPage.close();
  results.push("Case-study content readable without JavaScript");
  await page.goto(base + "/missing-project");
  assert(
    (await page.locator("h1").textContent()).includes("Not on this sheet"),
  );
  results.push("404 view");
  const violations = audits.reduce((n, a) => n + a.violations.length, 0);
  console.log(
    JSON.stringify(
      { results, errors, accessibilityViolations: violations },
      null,
      2,
    ),
  );
  await writeFile(
    "qa-output/results.json",
    JSON.stringify(
      { results, errors, accessibilityViolations: violations },
      null,
      2,
    ),
  );
  assert.equal(errors.length, 0, "Unexpected browser errors");
  assert.equal(
    violations,
    0,
    "Accessibility audit violations; see qa-output/accessibility.json",
  );
} finally {
  await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
