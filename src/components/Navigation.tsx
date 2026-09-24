import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const links = [
  ["/projects", "Projects"],
  ["/about", "About"],
  ["/experience", "Experience / CV"],
  ["/contact", "Contact"],
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link
          to="/"
          className="wordmark"
          aria-label="Matias home"
          onClick={() => setOpen(false)}
        >
          matias
          <span className="wordmark-symbol" aria-hidden="true">
            m.
          </span>
        </Link>
        <span className="header-caption">ENGINEERING & BEYOND</span>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="primary-nav"
          aria-label="Main navigation"
          className={open ? "is-open" : ""}
        >
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
              {location.pathname === to && (
                <span className="nav-mark" aria-hidden="true">
                  {" "}
                  /
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}
