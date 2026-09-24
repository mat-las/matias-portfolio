import { useState } from "react";
export default function AnalysisChart() {
  const [method, setMethod] = useState<"baseline" | "refined">("refined");
  const values =
    method === "baseline" ? [90, 74, 67, 62, 59, 57] : [90, 65, 46, 33, 25, 20];
  return (
    <div className="analysis-chart">
      <div className="chart-heading">
        <span className="eyebrow">ILLUSTRATIVE / CONVERGENCE STUDY</span>
        <div>
          <button
            aria-pressed={method === "baseline"}
            onClick={() => setMethod("baseline")}
          >
            Baseline
          </button>
          <button
            aria-pressed={method === "refined"}
            onClick={() => setMethod("refined")}
          >
            Refined
          </button>
        </div>
      </div>
      <svg
        viewBox="0 0 600 270"
        role="img"
        aria-label={`${method} example error values: ${values.join(", ")}. Synthetic data, not project results.`}
      >
        <g stroke="currentColor" opacity=".15">
          {[50, 100, 150, 200].map((y) => (
            <path key={y} d={`M50 ${y}H570`} />
          ))}
        </g>
        <path d="M50 25V220H570" fill="none" stroke="currentColor" />
        <polyline
          fill="none"
          stroke="#1947e5"
          strokeWidth="4"
          points={values
            .map((v, i) => `${65 + i * 96},${215 - v * 1.9}`)
            .join(" ")}
        />
        {values.map((v, i) => (
          <circle
            key={i}
            cx={65 + i * 96}
            cy={215 - v * 1.9}
            r="5"
            fill="#1947e5"
          />
        ))}
        <g fill="currentColor" fontSize="13" fontFamily="monospace">
          <text x="50" y="250">
            01
          </text>
          <text x="530" y="250">
            06
          </text>
          <text x="235" y="250">
            ITERATION
          </text>
          <text x="50" y="16">
            ERROR / ARBITRARY UNITS
          </text>
        </g>
      </svg>
      <details>
        <summary>View chart data</summary>
        <table>
          <caption>Synthetic values for layout demonstration</caption>
          <thead>
            <tr>
              <th>Iteration</th>
              <th>Error / arbitrary units</th>
            </tr>
          </thead>
          <tbody>
            {values.map((v, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
