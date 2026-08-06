import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Persistent fixed backdrop for the whole page — a dark base plus a drifting
// circuit-trace layer, a Tron-style horizon grid, and an occasional scan
// sweep. Sections are transparent so this shows through continuously instead
// of resetting per-section, giving the page a single "living" background.
export default function BackgroundFX() {
  const gridRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    let raf;
    let targetX = 0.5;
    let targetY = 0.5;
    let curX = 0.5;
    let curY = 0.5;

    function onMove(e) {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    }

    function tick() {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      if (gridRef.current) {
        gridRef.current.style.setProperty("--px", `${(curX - 0.5) * 30}px`);
        gridRef.current.style.setProperty("--py", `${(curY - 0.5) * 30}px`);
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />

      {/* drifting circuit traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 1200 1200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3ee9ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#3ee9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#3ee9ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trace-magenta" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff2fd0" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff2fd0" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff2fd0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -100 180 L 260 180 L 340 260 L 700 260 L 780 180 L 1300 180"
          fill="none"
          stroke="url(#trace-cyan)"
          strokeWidth="1.5"
          strokeDasharray="8 14"
          className="trace-flow"
        />
        <path
          d="M -100 620 L 220 620 L 300 700 L 640 700 L 720 780 L 1300 780"
          fill="none"
          stroke="url(#trace-magenta)"
          strokeWidth="1.5"
          strokeDasharray="6 16"
          className="trace-flow-slow"
        />
        <path
          d="M -100 980 L 380 980 L 460 900 L 900 900 L 980 980 L 1300 980"
          fill="none"
          stroke="url(#trace-cyan)"
          strokeWidth="1.5"
          strokeDasharray="10 12"
          className="trace-flow"
        />
      </svg>

      {/* Tron-style horizon grid, subtle mouse parallax */}
      <div
        ref={gridRef}
        className="absolute inset-x-0 bottom-0 h-[45vh] opacity-[0.16]"
        style={{
          transform: "translate3d(var(--px, 0), var(--py, 0), 0) perspective(500px) rotateX(62deg)",
          transformOrigin: "bottom center",
          backgroundImage:
            "linear-gradient(to right, rgba(62,233,255,0.6) 1px, transparent 1px), linear-gradient(to top, rgba(62,233,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* occasional scan sweep */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-400/10 via-cyan-400/0 to-transparent [animation:scan-sweep_9s_linear_infinite]" />

      <div className="grain absolute inset-0" />
    </div>
  );
}
