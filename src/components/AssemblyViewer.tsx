import Arrow from "./Arrow";
import { asset } from "../lib/assets";
import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "../lib/motion";
const Scene = lazy(() => import("./AssemblyScene"));
class Boundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}
export default function AssemblyViewer() {
  const reduced = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const [ready, setReady] = useState(false),
    [active, setActive] = useState(true),
    [failed, setFailed] = useState(false),
    [explode, setExplode] = useState(0.38),
    [wire, setWire] = useState(false),
    [angle, setAngle] = useState(0.3),
    [tilt, setTilt] = useState(0);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const low = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    if (
      !reduced &&
      !mobile &&
      !low.connection?.saveData &&
      (low.deviceMemory ?? 8) > 2
    )
      setReady(true);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduced]);
  useEffect(() => {
    if (reduced || !ready || !active) return;
    let frame = 0;
    const scroll = () => {
      if (frame || manual.current) return;
      frame = requestAnimationFrame(() => {
        setExplode(0.38 + Math.min(window.scrollY / 800, 0.6));
        frame = 0;
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced, ready, active]);
  const fallback = (
    <img
      className="assembly-fallback"
      src={asset("/media/precision-impeller.webp")}
      alt="Concept render of a machined aluminium impeller with a cobalt hub"
      width="1536"
      height="1024"
      srcSet={`${asset("/media/precision-impeller-small.webp")} 768w, ${asset("/media/precision-impeller.webp")} 1536w`}
      sizes="(max-width: 760px) 100vw, 50vw"
      fetchPriority="high"
    />
  );
  return (
    <div className="assembly-viewer" ref={host}>
      <div
        className="assembly-canvas"
        role="img"
        aria-label={`Exploded mechanical assembly. ${wire ? "Wireframe" : "Solid"} view. Separation ${Math.round(explode * 100)} percent.`}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse" || !active) return;
          const box = e.currentTarget.getBoundingClientRect();
          setTilt(((e.clientY - box.top) / box.height - 0.5) * 0.14);
        }}
      >
        {ready && !failed ? (
          <Boundary fallback={fallback} onFailure={() => setFailed(true)}>
            <Suspense fallback={fallback}>
              <Scene
                explode={explode}
                wire={wire}
                angle={angle}
                tilt={tilt}
                active={active}
                onFailure={() => setFailed(true)}
              />
            </Suspense>
          </Boundary>
        ) : (
          fallback
        )}
      </div>
      <div className="assembly-annotation">
        <span>ASM—001</span>
        <span>
          PARAMETRIC ASSEMBLY
          <br />
          ILLUSTRATIVE / NOT TO SCALE
        </span>
      </div>
      <svg
        className="assembly-axis"
        viewBox="0 0 56 58"
        width="56"
        height="58"
        aria-hidden="true"
      >
        <path
          d="M12 43V12m0 31h30M8 18l4-6 4 6m20 21 6 4-6 4"
          fill="none"
          stroke="currentColor"
        />
        <text x="8" y="10" fontSize="10" fill="currentColor">
          Y
        </text>
        <text x="46" y="47" fontSize="10" fill="currentColor">
          X
        </text>
      </svg>
      <div className="assembly-controls">
        {!ready && !failed ? (
          <button onClick={() => setReady(true)}>
            Inspect in 3D{" "}
            <span aria-hidden="true">
              <Arrow />
            </span>
          </button>
        ) : (
          <>
            <button
              aria-pressed={wire}
              onClick={() => setWire(!wire)}
              disabled={failed}
            >
              {wire ? "Solid" : "Wireframe"}
            </button>
            <button
              aria-label="Rotate assembly 45 degrees"
              onClick={() => setAngle(angle + Math.PI / 4)}
              disabled={failed}
            >
              Rotate <Arrow direction="rotate" />
            </button>
            <label>
              Explode{" "}
              <input
                aria-label="Assembly separation"
                type="range"
                min="0"
                max="1"
                step=".01"
                value={explode}
                onChange={(e) => {
                  manual.current = true;
                  setExplode(Number(e.target.value));
                }}
                disabled={failed}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
}
