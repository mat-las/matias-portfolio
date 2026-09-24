import Arrow from "./Arrow";
import { Link } from "react-router-dom";
import { profile } from "../content/profile";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">NEXT / A CONVERSATION</span>
          <Link className="footer-title" to="/contact">
            Let’s connect.
            <span aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </div>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <Link to="/contact">
            Email & LinkedIn <Arrow />
          </Link>
          <a href={profile.cv} download>
            Download CV preview <Arrow direction="down" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <Link to="/">MATIAS / PORTFOLIO</Link>
        <span>Engineering. Technology. Finance.</span>
        <a href="#top">
          Back to top <Arrow direction="up" />
        </a>
      </div>
    </footer>
  );
}
