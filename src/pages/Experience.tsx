import Arrow from "../components/Arrow";
import { profile } from "../content/profile";
import { SectionLabel } from "../components/Primitives";
export default function Experience() {
  return (
    <section className="page-section section-pad">
      <SectionLabel code="EXPERIENCE">
        FOUNDATION / PRACTICE / DIRECTION
      </SectionLabel>
      <div className="page-heading">
        <h1>
          A work
          <br />
          in progress<span className="title-dot">.</span>
        </h1>
        <div>
          <p>
            Mechanical engineering.
            <br />
            An expanding frame of reference.
          </p>
          <a className="primary-link" href={profile.cv} download>
            Download CV preview <Arrow direction="down" />
          </a>
        </div>
      </div>
      <p className="placeholder-note">
        + CV preview · institutions, dates and employment details await your
        verified CV.
      </p>
      <div className="experience-layout">
        <aside>
          <h2>Matias</h2>
          <p>{profile.qualification}</p>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
        </aside>
        <div className="full-timeline">
          {profile.timeline.map((entry, i) => (
            <section key={entry.date}>
              <span className="timeline-tick">0{i + 1}</span>
              <span className="eyebrow">
                {entry.date} / {entry.type}
              </span>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
            </section>
          ))}
        </div>
      </div>
      <div className="cv-capabilities">
        <h2>Technical toolkit</h2>
        <div>
          <p>
            <strong>Engineering</strong>Mechanical design · CAD · FEA · CFD ·
            MATLAB
          </p>
          <p>
            <strong>Technology</strong>Python · data analysis · automation · Git
          </p>
          <p>
            <strong>Finance</strong>Financial modelling · valuation ·
            quantitative analysis
          </p>
          <span className="eyebrow">
            ILLUSTRATIVE CAPABILITY STRUCTURE / TO BE VERIFIED
          </span>
        </div>
      </div>
    </section>
  );
}
