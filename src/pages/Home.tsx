import Arrow from "../components/Arrow";
import { asset } from "../lib/assets";
import { Link } from "react-router-dom";
import AssemblyViewer from "../components/AssemblyViewer";
import ProjectArchive from "../components/ProjectArchive";
import Capabilities from "../components/Capabilities";
import {
  ArrowLink,
  PlaceholderNote,
  SectionLabel,
} from "../components/Primitives";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
export default function Home() {
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const count = (discipline: string) =>
    projects
      .filter((project) => project.discipline === discipline)
      .length.toString()
      .padStart(2, "0");
  return (
    <>
      <section className="hero">
        <div className="hero-kicker">
          <span>MATIAS / MECHANICAL ENGINEER</span>
          <span>PORTFOLIO — VOL. 01</span>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <h1>
              Think deeply.
              <br />
              Build <span className="serif">precisely.</span>
            </h1>
            <p>
              Mechanical engineering at the core.
              <br />
              Technology and finance in the field of view.
            </p>
            <Link className="primary-link" to="/projects">
              Explore the work{" "}
              <span aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          </div>
          <AssemblyViewer />
          <span className="hero-vertical" aria-hidden="true">
            FORM / FUNCTION / FIRST PRINCIPLES
          </span>
        </div>
        <div className="hero-baseline">
          <span>
            MASTER’S GRADUATE
            <br />
            <strong>MECHANICAL ENGINEERING</strong>
          </span>
          <span className="hero-note">
            A study in how things work.
            <br />
            And how they could work better.
          </span>
          <a href="#disciplines" className="scroll-cue">
            SCROLL TO EXPLORE{" "}
            <span aria-hidden="true">
              <Arrow direction="down" />
            </span>
          </a>
        </div>
      </section>
      <section id="disciplines" className="disciplines section-pad" data-reveal>
        <SectionLabel code="01">
          THREE FIELDS / ONE WAY OF THINKING
        </SectionLabel>
        <div className="discipline-rail">
          <Link
            className="discipline-panel engineering"
            to="/projects?discipline=Engineering"
          >
            <span className="eyebrow">01 / THE FOUNDATION</span>
            <h2>
              Engineering<span>{count("Engineering")}</span>
            </h2>
            <p>
              Physical systems.
              <br />
              From first principles to final detail.
            </p>
            <span className="discipline-bottom">
              DESIGN · SIMULATE · MAKE{" "}
              <b aria-hidden="true">
                <Arrow />
              </b>
            </span>
          </Link>
          <Link
            className="discipline-panel tech"
            to="/projects?discipline=Tech"
          >
            <span className="eyebrow">02 / THE TOOLKIT</span>
            <h2>
              Tech<span>{count("Tech")}</span>
            </h2>
            <p>
              Computational tools.
              <br />
              Making complexity useful.
            </p>
            <span className="discipline-bottom">
              CODE · ANALYSE · AUTOMATE{" "}
              <b aria-hidden="true">
                <Arrow />
              </b>
            </span>
          </Link>
          <Link
            className="discipline-panel finance"
            to="/projects?discipline=Finance"
          >
            <span className="eyebrow">03 / THE PERSPECTIVE</span>
            <h2>
              Finance<span>{count("Finance")}</span>
            </h2>
            <p>
              Models and markets.
              <br />
              Decisions backed by evidence.
            </p>
            <span className="discipline-bottom">
              MODEL · QUESTION · EVALUATE{" "}
              <b aria-hidden="true">
                <Arrow />
              </b>
            </span>
          </Link>
        </div>
      </section>
      <section className="featured section-pad" data-reveal>
        <SectionLabel code="02">
          UNDER THE SURFACE / FEATURED STUDY
        </SectionLabel>
        <div className="featured-heading">
          <h2>
            Every detail.
            <br />
            <span className="serif">A decision.</span>
          </h2>
          <div>
            <span className="eyebrow">
              PROJECT {featured.number} / {featured.discipline.toUpperCase()}
            </span>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            {featured.placeholder && <PlaceholderNote compact />}
          </div>
        </div>
        <Link to={`/projects/${featured.slug}`} className="featured-media">
          <img
            src={featured.heroMedia.src}
            alt={featured.heroMedia.alt}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <span className="media-annotation">
            FIG. {featured.number} /{" "}
            {featured.placeholder ? "CONCEPT ARTWORK" : "PROJECT STUDY"}
            <br />
            {featured.discipline.toUpperCase()}
          </span>
          <span className="media-open">
            Explore case study <Arrow />
          </span>
        </Link>
        <div className="featured-meta">
          <span>
            FIELD <strong>{featured.subcategory}</strong>
          </span>
          <span>
            METHOD <strong>{featured.tools.join(" / ")}</strong>
          </span>
          <span>
            ROLE <strong>{featured.role}</strong>
          </span>
          <span>
            STATUS{" "}
            <strong>
              {featured.placeholder
                ? "Illustrative project"
                : "Project case study"}
            </strong>
          </span>
        </div>
      </section>
      <section className="index-section section-pad" data-reveal>
        <SectionLabel code="03">THE WORK / AN OPEN INDEX</SectionLabel>
        <div className="section-title-row">
          <h2>
            Selected work<span className="title-dot">.</span>
          </h2>
          <span className="eyebrow">2023—2026 / SAMPLE ARCHIVE</span>
        </div>
        <ProjectArchive compact />
      </section>
      <Capabilities />
      <section className="trajectory section-pad" data-reveal>
        <SectionLabel code="05">THE THREAD / EXPERIENCE</SectionLabel>
        <div className="trajectory-heading">
          <h2>Built over time.</h2>
          <ArrowLink to="/experience">Experience & CV</ArrowLink>
        </div>
        <div className="timeline-mini">
          {profile.timeline.map((entry, i) => (
            <div key={entry.date}>
              <span className="timeline-tick">0{i + 1}</span>
              <span className="eyebrow">{entry.date}</span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-moment section-pad" data-reveal>
        <SectionLabel code="06">BEYOND THE DRAWING BOARD</SectionLabel>
        <div className="about-moment-grid">
          <div className="contour-panel" aria-hidden="true">
            <img
              src={asset("/media/contours.svg")}
              alt=""
              width="600"
              height="600"
              loading="lazy"
            />
            <span>
              LANDSCAPE / STRUCTURE
              <br />A DIFFERENT KIND OF BLUEPRINT
            </span>
          </div>
          <div>
            <span className="eyebrow">A LITTLE CONTEXT</span>
            <h2>
              Curiosity,
              <br />
              <span className="serif">with roots.</span>
            </h2>
            <p>{profile.introduction}</p>
            <p>{profile.heritage}</p>
            <ArrowLink to="/about">A little more about me</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
