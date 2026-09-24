import Arrow from "../components/Arrow";
import { useState } from "react";
import { profile } from "../content/profile";
import { SectionLabel } from "../components/Primitives";
export default function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <section className="page-section contact-page section-pad">
      <SectionLabel code="CONTACT">
        GOOD WORK STARTS WITH A CONVERSATION
      </SectionLabel>
      <div className="page-heading">
        <h1>
          Let’s talk
          <br />
          <span className="serif">possibilities.</span>
        </h1>
      </div>
      <div className="contact-layout">
        <p className="lead">
          An engineering question.
          <br />
          An interesting opportunity.
          <br />A different way to look at a problem.
        </p>
        <div className="contact-methods">
          <div>
            <span className="eyebrow">01 / EMAIL</span>
            {profile.email ? (
              <>
                <a href={`mailto:${profile.email}`}>
                  {profile.email} <Arrow />
                </a>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(profile.email);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? "Copied" : "Copy address"}
                </button>
              </>
            ) : (
              <>
                <span className="contact-pending">Email to be added</span>
                <p>Direct contact details will appear here.</p>
              </>
            )}
          </div>
          <div>
            <span className="eyebrow">02 / LINKEDIN</span>
            {profile.linkedin ? (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <Arrow />
              </a>
            ) : (
              <span className="contact-pending">Profile to be added</span>
            )}
          </div>
          <div>
            <span className="eyebrow">03 / GITHUB</span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              Explore the source <Arrow />
            </a>
          </div>
          <div>
            <span className="eyebrow">04 / CURRICULUM VITAE</span>
            <a href={profile.cv} download>
              Download CV preview <Arrow direction="down" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
