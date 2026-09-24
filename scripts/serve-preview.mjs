import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
export async function servePreview(port = 4173) {
  const root = path.resolve("dist"),
    types = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript",
      ".css": "text/css",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".png": "image/png",
      ".woff2": "font/woff2",
      ".pdf": "application/pdf",
      ".xml": "application/xml",
      ".txt": "text/plain",
    };
  const server = createServer(async (req, res) => {
    try {
      let url = decodeURIComponent((req.url || "/").split("?")[0]);
      if (process.env.TEST_BASE_PATH)
        url = url.replace(process.env.TEST_BASE_PATH, "/");
      let file = path.resolve(root, "." + url);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory())
          file = path.join(file, "index.html");
        await stat(file);
      } catch {
        file = path.join(root, "404.html");
        res.statusCode = 404;
      }
      res.setHeader(
        "Content-Type",
        types[path.extname(file)] || "application/octet-stream",
      );
      res.end(await readFile(file));
    } catch {
      res.writeHead(500);
      res.end("Preview error");
    }
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return server;
}
