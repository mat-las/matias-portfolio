import { lazy, Suspense, useEffect } from "react";
import type { ComponentType } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { usePageReveal } from "./lib/motion";
import { getMetadata } from "./lib/metadata";
import "./App.css";
const LazyProjects = lazy(() => import("./pages/Projects"));
const LazyProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const LazyAbout = lazy(() => import("./pages/About"));
const LazyExperience = lazy(() => import("./pages/Experience"));
const LazyContact = lazy(() => import("./pages/Contact"));
const LazyNotFound = lazy(() => import("./pages/NotFound"));
type PageComponents = Record<
  | "Projects"
  | "ProjectDetail"
  | "About"
  | "Experience"
  | "Contact"
  | "NotFound",
  ComponentType
>;
export default function App({ pages }: { pages?: PageComponents } = {}) {
  const Projects = pages?.Projects ?? LazyProjects;
  const ProjectDetail = pages?.ProjectDetail ?? LazyProjectDetail;
  const About = pages?.About ?? LazyAbout;
  const Experience = pages?.Experience ?? LazyExperience;
  const Contact = pages?.Contact ?? LazyContact;
  const NotFound = pages?.NotFound ?? LazyNotFound;

  const location = useLocation();
  usePageReveal(location.pathname);
  useEffect(() => {
    const meta = getMetadata(location.pathname);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    for (const [property, content] of [
      ["og:title", meta.title],
      ["og:description", meta.description],
      ["og:url", meta.url],
    ])
      document
        .querySelector(`meta[property="${property}"]`)
        ?.setAttribute("content", content);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash]);
  return (
    <>
      <div id="top" />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="route-loading" role="status">
              Opening the next sheet…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/projects/:slug"
              element={<ProjectDetail key={location.pathname} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
