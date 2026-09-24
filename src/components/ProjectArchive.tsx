import Arrow from "./Arrow";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { disciplines, projects } from "../content/projects";
import type { Discipline } from "../content/projects";
import { PlaceholderNote } from "./Primitives";
export default function ProjectArchive({
  initial = "All",
  compact = false,
}: {
  initial?: Discipline | "All";
  compact?: boolean;
}) {
  const [filter, setFilter] = useState<Discipline | "All">(initial),
    [view, setView] = useState<"list" | "grid">("list"),
    [sort, setSort] = useState("index"),
    [query, setQuery] = useState("");
  const shown = useMemo(
    () =>
      projects
        .filter(
          (p) =>
            (filter === "All" || p.discipline === filter) &&
            `${p.title} ${p.tools.join(" ")} ${p.subcategory}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "year" ? b.year - a.year : a.number.localeCompare(b.number),
        ),
    [filter, sort, query],
  );
  return (
    <div className="archive">
      <div className="archive-toolbar">
        <div
          className="filter-group"
          aria-label="Filter projects by discipline"
        >
          {(["All", ...disciplines] as const).map((d) => (
            <button
              key={d}
              aria-pressed={filter === d}
              onClick={() => setFilter(d)}
            >
              {d}
              <sup>
                {d === "All"
                  ? projects.length
                  : projects
                      .filter((p) => p.discipline === d)
                      .length.toString()
                      .padStart(2, "0")}
              </sup>
            </button>
          ))}
        </div>
        <div className="view-toggle" aria-label="Project layout">
          <button
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            List
          </button>
          <button
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
        </div>
      </div>
      {!compact && (
        <div className="archive-search">
          <label>
            Find a project
            <input
              type="search"
              placeholder="Title, tool or subject…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="index">Project number</option>
              <option value="year">Newest first</option>
            </select>
          </label>
        </div>
      )}
      <div className="archive-status" aria-live="polite">
        {shown.length.toString().padStart(2, "0")} PROJECTS /{" "}
        {filter.toUpperCase()} <span>ILLUSTRATIVE CONTENT</span>
      </div>
      <div className={`project-${view}`} key={`${filter}-${view}`}>
        {shown.slice(0, compact ? 6 : undefined).map((p) => (
          <Link
            className={`project-entry discipline-${p.discipline.toLowerCase()}`}
            key={p.slug}
            to={`/projects/${p.slug}`}
          >
            <span className="project-number">{p.number}</span>
            <div className="project-entry-main">
              <h3>{p.title}</h3>
              <p>{p.subcategory}</p>
              <span className="entry-summary">{p.summary}</span>
            </div>
            <div className="project-entry-media">
              <img
                src={p.heroMedia.src}
                alt={p.heroMedia.alt}
                width="600"
                height="400"
                loading="lazy"
              />
            </div>
            <span className="entry-category">{p.discipline}</span>
            <span className="entry-year">{p.year}</span>
            <span className="entry-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="empty-state">
          No matching projects. Try another subject or clear your search.
        </p>
      )}
      {compact && (
        <Link
          to={`/projects${filter === "All" ? "" : `?discipline=${filter}`}`}
          className="archive-all"
        >
          Explore the complete archive{" "}
          <span>
            {projects.length} PROJECTS <Arrow />
          </span>
        </Link>
      )}
      <PlaceholderNote />
    </div>
  );
}
