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
const launch = {
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  args,
};
const results = [],
  errors = [],
  audits = [];
await mkdir("qa-output", { recursive: true });
async function run(options, fn) {
  const browser = await chromium.launch(launch);
  try {
    const context = await browser.newContext(options),
      page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on("pageerror", (e) => errors.push(e.message));
    await fn(page, context);
  } finally {
    await browser.close();
  }
}
async function go(page, path = "") {
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.load('500 16px "Archivo Variable"');
    await document.fonts.load('400 16px "IBM Plex Mono"');
    await document.fonts.ready;
  });
  await page.waitForTimeout(150);
}
async function screenshot(page, name, fullPage = false) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `qa-output/${name}.png`, fullPage });
}
try {
  await run({ viewport: { width: 1440, height: 1000 } }, async (page) => {
    await go(page);
    await screenshot(page, "home-desktop");
    assert.equal(await page.locator("h1").count(), 1);
    const inspect = page.getByRole("button", { name: "Inspect in 3D" });
    if (await inspect.isVisible()) await inspect.click();
    await page.getByRole("button", { name: "Wireframe", exact: true }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Solid", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    const before = await page.locator("canvas").screenshot();
    await page
      .getByRole("button", { name: "Rotate assembly 45 degrees" })
      .click();
    await page.waitForTimeout(100);
    const after = await page.locator("canvas").screenshot();
    assert(!before.equals(after), "Rotation should change the rendered object");
    await page.getByRole("slider", { name: "Assembly separation" }).focus();
    await page.keyboard.press("ArrowRight");
    assert(Number(await page.getByRole("slider").inputValue()) > 0.38);
    results.push(
      "3D wireframe, rendered rotation and keyboard separation control",
    );
    await page.getByRole("button", { name: "Solid", exact: true }).click();
    await page.locator(".capabilities").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "FEA", exact: true }).click();
    assert.equal(await page.locator(".capability-results a").count(), 2);
    results.push("Capability selection exposes related projects");
    await go(page, "/projects");
    await screenshot(page, "projects-desktop", true);
    await go(page, "/projects/wheel-assembly");
    await screenshot(page, "case-desktop", true);
    await go(page, "/missing-project");
    assert(
      (await page.locator("h1").textContent()).includes("Not on this sheet"),
    );
    results.push("404 view");
  });
  await run({ viewport: { width: 390, height: 844 } }, async (page) => {
    await go(page);
    assert.equal(await page.locator("canvas").count(), 0);
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `Home overflow: ${width}`,
      );
    }
    results.push(
      "Home layout at 1440, 1024, 768, 390 and 320px without horizontal overflow",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await go(page);
    for (let y = 0; y < 12000; y += 600) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(60);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await screenshot(page, "home-mobile", true);
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
    results.push(
      "Mobile navigation, category filtering, list/grid switching, search and empty state",
    );
    await go(page, "/projects/wheel-assembly");
    await page.getByRole("button", { name: "Quick view", exact: true }).click();
    assert(
      await page
        .getByRole("region", { name: "Project quick view" })
        .isVisible(),
    );
    await page
      .getByRole("button", { name: "Full case study +", exact: true })
      .click();
    await page.getByRole("button", { name: "Baseline", exact: true }).click();
    await page.getByText("View chart data", { exact: true }).click();
    assert.equal(await page.locator("tbody tr").count(), 6);
    await screenshot(page, "case-mobile", true);
    results.push("Quick/full case studies and accessible chart data");
  });
  await run(
    { viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" },
    async (page) => {
      await go(page);
      assert.equal(await page.locator("canvas").count(), 0);
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(() => document.activeElement?.tagName),
        "A",
      );
      results.push("Reduced-motion static fallback and keyboard focus");
    },
  );
  await run({ javaScriptEnabled: false }, async (page) => {
    await page.goto(base + "/projects/flow-optimisation");
    assert((await page.locator("h1").textContent()).includes("Flow"));
    assert(
      await page
        .getByText("Start with the question.", { exact: true })
        .isVisible(),
    );
    results.push("Full case-study reading content works without JavaScript");
  });
  await run({ viewport: { width: 1440, height: 1000 } }, async (page) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type.startsWith("webgl") || type === "experimental-webgl")
          return null;
        return original.call(this, type, ...args);
      };
    });
    await go(page);
    assert(await page.locator(".assembly-fallback").isVisible());
    assert(
      await page
        .getByRole("link", { name: "Explore the work", exact: true })
        .isVisible(),
    );
    results.push("WebGL unavailable: usable static fallback");
  });
  await run({ viewport: { width: 390, height: 844 } }, async (page) => {
    for (const route of [
      "/",
      "/projects",
      "/projects/wheel-assembly",
      "/about",
      "/experience",
      "/contact",
    ]) {
      await go(page, route);
      const audit = await new AxeBuilder({ page })
        .setLegacyMode(true)
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      audits.push({
        route,
        violations: audit.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
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
  });
  const violations = audits.reduce((n, a) => n + a.violations.length, 0);
  await writeFile(
    "qa-output/accessibility.json",
    JSON.stringify(audits, null, 2),
  );
  await writeFile(
    "qa-output/results.json",
    JSON.stringify(
      { results, errors, accessibilityViolations: violations },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      { results, errors, accessibilityViolations: violations },
      null,
      2,
    ),
  );
  assert.equal(
    errors.filter((e) => !e.includes("Error creating WebGL context")).length,
    0,
  );
  assert.equal(violations, 0);
} finally {
  if (server) await new Promise((resolve) => server.close(resolve));
}
