import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { projects } from "./content/projects";
export { getMetadata, siteUrl } from "./lib/metadata";
export const routes = [
  "/",
  "/projects",
  "/about",
  "/experience",
  "/contact",
  ...projects.map((p) => `/projects/${p.slug}`),
];
const pages = { Projects, ProjectDetail, About, Experience, Contact, NotFound };
export function render(path: string) {
  return renderToString(
    <StaticRouter
      location={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`}
      basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}
    >
      <App pages={pages} />
    </StaticRouter>,
  );
}
