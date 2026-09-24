import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { render, routes, getMetadata, siteUrl } from "../.ssr/entry-server.js";
const shell = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const route of [...routes, "/404"]) {
  const html = await render(route),
    meta = getMetadata(route);
  const tags = `<title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"><link rel="canonical" href="${escape(meta.url)}"><meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}"><meta property="og:url" content="${escape(meta.url)}"><meta property="og:type" content="website"><meta property="og:image" content="${siteUrl}/media/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">${route === "/404" ? '<meta name="robots" content="noindex">' : ""}`;
  const file =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : `dist${route}/index.html`;
  await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
  await writeFile(
    file,
    shell
      .replace(/<title>.*?<\/title>/, tags)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`),
  );
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((r) => `<url><loc>${siteUrl}${r}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await rm(".ssr", { recursive: true, force: true });
console.log(
  `Pre-rendered ${routes.length} routes + 404 with individual metadata.`,
);
