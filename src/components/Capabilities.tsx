import Arrow from "./Arrow";
import { useState } from "react";
import { Link } from "react-router-dom";
import { disciplines, projects } from "../content/projects";
import { SectionLabel } from "./Primitives";
export default function Capabilities() {
  const [selected, setSelected] = useState("Python");
  const matches = projects.filter((p) => p.skills.includes(selected));
  return (
    <section className="capabilities section-pad">
      <SectionLabel code="04">TOOLS / CONNECTED TO THE WORK</SectionLabel>
      <div className="capability-layout">
        <div>
          <h2>
            A toolkit.
            <br />
            <span className="serif">With context.</span>
          </h2>
          <p>
            A tool matters when it helps answer a question. Select one to find
            the work behind it.
          </p>
          <span className="eyebrow">EXAMPLE PROJECT–SKILL CONNECTIONS</span>
        </div>
        <div className="capability-map">
          {disciplines.map((d) => (
            <div className="capability-row" key={d}>
              <h3>{d}</h3>
              <div>
                {[
                  ...new Set(
                    projects
                      .filter((p) => p.discipline === d)
                      .flatMap((p) => p.skills),
                  ),
                ].map((s) => (
                  <button
                    key={s}
                    aria-pressed={selected === s}
                    onClick={() => setSelected(s)}
                  >
                    {s}
                    <span aria-hidden="true">
                      {selected === s ? <Arrow /> : " +"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="capability-results" aria-live="polite">
        <span className="eyebrow">
          {selected} / {matches.length.toString().padStart(2, "0")} CONNECTIONS
        </span>
        <div>
          {matches.map((p) => (
            <Link to={`/projects/${p.slug}`} key={p.slug}>
              <span>{p.number}</span>
              {p.title}
              <span aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
