import { useSearchParams } from "react-router-dom";
import ProjectArchive from "../components/ProjectArchive";
import { disciplines } from "../content/projects";
import type { Discipline } from "../content/projects";
import { SectionLabel } from "../components/Primitives";
export default function Projects() {
  const [params] = useSearchParams();
  const value = params.get("discipline") as Discipline;
  const initial = disciplines.includes(value) ? value : "All";
  return (
    <section className="page-section section-pad">
      <SectionLabel code="INDEX">ENGINEERING / TECH / FINANCE</SectionLabel>
      <div className="page-heading">
        <h1>
          The work<span className="title-dot">.</span>
        </h1>
        <p>
          Questions explored.
          <br />
          Systems understood. Things made.
        </p>
      </div>
      <ProjectArchive key={initial} initial={initial} />
    </section>
  );
}
