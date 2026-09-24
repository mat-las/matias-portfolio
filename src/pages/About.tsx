import { asset } from "../lib/assets";
import { profile } from "../content/profile";
import { ArrowLink, SectionLabel } from "../components/Primitives";
import Capabilities from "../components/Capabilities";
export default function About() {
  return (
    <>
      <section className="page-section section-pad">
        <SectionLabel code="ABOUT">THE PERSON BEHIND THE PROCESS</SectionLabel>
        <div className="page-heading">
          <h1>
            Curious by
            <br />
            <span className="serif">construction.</span>
          </h1>
        </div>
        <div className="about-detail">
          <div className="about-graphic">
            <img
              src={asset("/media/contours.svg")}
              alt="Abstract topographic contour study, connecting landscape with engineering drawing"
              width="600"
              height="600"
            />
            <span>MATIAS / MECHANICAL ENGINEER</span>
          </div>
          <div>
            <h2>Hi, I’m Matias.</h2>
            <p className="lead">{profile.introduction}</p>
            <p>{profile.biography}</p>
            <p>{profile.heritage}</p>
            <ArrowLink to="/projects">See how I work</ArrowLink>
          </div>
        </div>
        <div className="principles">
          {[
            [
              "01",
              "Understand the system.",
              "Start with the relationships, boundaries and assumptions.",
            ],
            [
              "02",
              "Make the thinking visible.",
              "Use drawings, code and data to explain a decision.",
            ],
            [
              "03",
              "Stay curious.",
              "Take useful ideas across disciplines, then test them.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span className="eyebrow">{n} / WORKING PRINCIPLE</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <Capabilities />
    </>
  );
}
