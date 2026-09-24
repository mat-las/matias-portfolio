import Arrow from "../components/Arrow";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="page-section section-pad">
      <span className="eyebrow">404 / OUTSIDE THE DRAWING</span>
      <h1>Not on this sheet.</h1>
      <p>This page could not be found.</p>
      <Link className="primary-link" to="/projects">
        Return to the project index <Arrow />
      </Link>
    </section>
  );
}
