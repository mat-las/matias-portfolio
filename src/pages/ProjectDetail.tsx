import Arrow from "../components/Arrow";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../content/projects";
import { PlaceholderNote, SectionLabel } from "../components/Primitives";
import AnalysisChart from "../components/AnalysisChart";
import NotFound from "./NotFound";
export default function ProjectDetail() {
  const { slug } = useParams();
  const p = getProject(slug);
  const [quick, setQuick] = useState(false);
  if (!p) return <NotFound />;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const sections = [
    ["01", "Context", p.problem],
    ["02", "Objective", p.objective],
    ["03", "Constraints", p.constraints.join("\n")],
    ["04", "Approach", p.approach],
    ["05", "Development", p.development],
    ["06", "Analysis", p.analysis],
    ["07", "Result", p.results],
    ["08", "Reflection", p.reflection],
  ];
  return (
    <article className="case-study">
      <div className="case-intro section-pad">
        <Link className="back-link" to="/projects">
          <Arrow direction="left" /> Project index
        </Link>
        <SectionLabel code={`PROJECT ${p.number}`}>
          {p.discipline.toUpperCase()} / {p.year}
        </SectionLabel>
        <div className="case-title-row">
          <h1>{p.title}</h1>
          <button
            className="quick-button"
            aria-pressed={quick}
            onClick={() => setQuick(!quick)}
          >
            {quick ? "Full case study +" : "Quick view"}
          </button>
        </div>
        <p className="case-summary">{p.summary}</p>
        {p.placeholder && <PlaceholderNote />}
        <dl className="case-metadata">
          {[
            ["Discipline", p.subcategory],
            ["Contribution", p.role],
            ["Team", p.team],
            ["Duration", p.duration],
            ["Tools", p.tools.join(" / ")],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className="case-hero">
        <img
          src={p.heroMedia.src}
          alt={p.heroMedia.alt}
          width="1536"
          height="1024"
        />
        <figcaption>{p.heroMedia.caption}</figcaption>
      </figure>
      {quick ? (
        <section
          className="quick-view section-pad"
          aria-label="Project quick view"
        >
          <SectionLabel code="AT A GLANCE">
            THE CHALLENGE / CONTRIBUTION / RESULT
          </SectionLabel>
          {[
            ["Challenge", p.problem],
            ["My contribution", p.approach],
            ["Tools", p.tools.join(" · ")],
            ["Result", p.results],
          ].map(([label, value]) => (
            <div key={label}>
              <h2>{label}</h2>
              <p>{value}</p>
            </div>
          ))}
          <button className="primary-link" onClick={() => setQuick(false)}>
            Read the full case study +
          </button>
        </section>
      ) : (
        <div className="case-body section-pad">
          <nav className="case-toc" aria-label="Case study sections">
            <span className="eyebrow">IN THIS STUDY</span>
            {sections.map(([n, title]) => (
              <a key={n} href={`#section-${n}`}>
                <span>{n}</span>
                {title}
              </a>
            ))}
            <a href="#artefacts">
              <span>09</span>Technical artefacts
            </a>
          </nav>
          <div className="case-sections">
            {sections.map(([n, title, body]) => (
              <section id={`section-${n}`} key={n}>
                <span className="eyebrow">
                  {n} / {title.toUpperCase()}
                </span>
                <h2>
                  {title === "Context"
                    ? "Start with the question."
                    : title === "Approach"
                      ? "A method, not a guess."
                      : title === "Result"
                        ? "What the evidence says."
                        : title}
                </h2>
                {n === "03" ? (
                  <ul>
                    {p.constraints.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{body}</p>
                )}
                {n === "05" && (
                  <div className="development-steps">
                    {["Define", "Model", "Verify"].map((s, i) => (
                      <div key={s}>
                        <span>0{i + 1}</span>
                        <h3>{s}</h3>
                        <p>
                          {
                            [
                              "Requirements & load cases",
                              "Geometry & assumptions",
                              "Checks & comparisons",
                            ][i]
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {n === "06" && p.placeholder && <AnalysisChart />}
                {n === "07" && (
                  <div className="case-metrics">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
            <section id="artefacts">
              <span className="eyebrow">09 / TECHNICAL ARTEFACTS</span>
              <h2>The detail behind the story.</h2>
              {p.gallery.map((m) => (
                <figure key={m.src}>
                  {m.type === "video" ? (
                    <video
                      controls
                      preload="metadata"
                      src={m.src}
                      aria-label={m.alt}
                    />
                  ) : (
                    <img src={m.src} alt={m.alt} loading="lazy" />
                  )}
                  <figcaption>{m.caption}</figcaption>
                </figure>
              ))}
              {p.downloads.length + p.externalLinks.length === 0 ? (
                <p>
                  CAD, drawings, reports, datasets and source code will appear
                  here when the real project material is added.
                </p>
              ) : (
                <div className="artefact-links">
                  {p.downloads.map((d) => (
                    <a key={d.href} href={d.href} download>
                      {d.label} <Arrow direction="down" />
                    </a>
                  ))}
                  {p.externalLinks.map((d) => (
                    <a
                      key={d.href}
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {d.label} <Arrow />
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      )}
      <Link to={`/projects/${next.slug}`} className="next-project section-pad">
        <span className="eyebrow">10 / NEXT PROJECT / {next.number}</span>
        <h2>
          {next.title}
          <span aria-hidden="true">
            <Arrow />
          </span>
        </h2>
      </Link>
    </article>
  );
}
