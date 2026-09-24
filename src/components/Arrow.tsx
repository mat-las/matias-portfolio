/** A single geometric mark for directional actions; no icon font or icon pack. */
export default function Arrow({
  direction = "out",
}: {
  direction?: "out" | "down" | "up" | "left" | "rotate";
}) {
  const rotation = { out: 0, down: 135, up: -45, left: -135, rotate: 0 }[
    direction
  ];
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d={
          direction === "rotate"
            ? "M19 8a8 8 0 1 0 1 7M19 3v5h-5"
            : "M5 19 19 5M5 5h14v14"
        }
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
