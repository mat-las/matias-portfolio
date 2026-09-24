import { readdir, readFile, stat } from "node:fs/promises";
import assert from "node:assert/strict";
import path from "node:path";
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? files(path.join(dir, e.name))
          : [path.join(dir, e.name)],
      ),
    )
  ).flat();
}
const htmlFiles = (await files("dist")).filter((f) => f.endsWith(".html"));
assert(
  htmlFiles.length >= 18,
  "Expected home, four main routes, 12 studies, and 404",
);
const titles = new Set();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${file}: expected one h1`,
  );
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title, `${file}: missing title`);
  assert(!titles.has(title), `${file}: duplicate title`);
  titles.add(title);
  for (const required of [
    'name="description"',
    'rel="canonical"',
    'property="og:image"',
  ])
    assert(html.includes(required), `${file}: missing ${required}`);
  assert(
    !html.includes("Opening the next sheet"),
    `${file}: unresolved loading state`,
  );
  for (const match of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || !url.match(/\.(?:webp|svg|png|pdf|js|css)$/))
      continue;
    const assetPath = url.replace(/^\/matias-portfolio\//, "/");
    await stat(path.join("dist", assetPath)).catch(() => {
      throw Error(`${file}: missing asset ${url}`);
    });
  }
  if (file.includes("dist/projects/") && !file.endsWith("projects/index.html"))
    assert(
      html.includes("Illustrative project"),
      `${file}: example project requires a visible label`,
    );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert(
  (sitemap.match(/<loc>/g) || []).length === htmlFiles.length - 1,
  "Sitemap route count mismatch",
);
console.log(
  `Checked ${htmlFiles.length} HTML pages: unique metadata, rendered headings, local assets, sample labels and sitemap.`,
);
