import Arrow from "./Arrow";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
export function SectionLabel({
  code,
  children,
}: {
  code: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{code}</span>
      <span>{children}</span>
      <span aria-hidden="true">
        <Arrow />
      </span>
    </div>
  );
}
export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`arrow-link ${className}`} to={to}>
      {children}
      <span aria-hidden="true">
        <Arrow />
      </span>
    </Link>
  );
}
export function PlaceholderNote({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`placeholder-note ${compact ? "compact" : ""}`}>
      <span aria-hidden="true">+</span>{" "}
      {compact
        ? "Illustrative project"
        : "Illustrative project · sample content and visuals, not verified achievements."}
    </p>
  );
}
