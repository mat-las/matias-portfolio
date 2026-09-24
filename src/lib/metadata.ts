import { getProject } from "../content/projects";
export const siteUrl = (
  import.meta.env.VITE_SITE_URL || "https://mat-las.github.io/matias-portfolio"
).replace(/\/$/, "");
export function getMetadata(path: string) {
  path = path.replace(/\/+$/, "") || "/";
  const p = getProject(path.split("/")[2]);
  const titles: Record<string, string> = {
    "/": "Matias — Mechanical Engineering & Beyond",
    "/projects": "Project index — Matias",
    "/about": "About — Matias",
    "/experience": "Experience & CV — Matias",
    "/contact": "Contact — Matias",
  };
  return {
    title: p
      ? `${p.title} — Matias`
      : titles[path] || "Page not found — Matias",
    description: p
      ? `${p.summary} ${p.placeholder ? "Illustrative " : ""}${p.discipline.toLowerCase()} case study.`
      : "Mechanical engineering at the core. Explore Matias’s work across engineering, technology and finance. Portfolio preview with clearly labelled sample projects.",
    url: `${siteUrl}${path === "/" ? "/" : path}`,
  };
}
