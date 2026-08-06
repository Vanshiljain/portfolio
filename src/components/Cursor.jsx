import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

// HUD-style "magnetic capture" cursor: a small dot plus a ring that morphs
// from a circle into the exact bounding box of whatever `.cursor-hover`
// element it's over (buttons, cards, links), optionally showing a
// `data-cursor-text` label inside the captured shape.
export default function Cursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const reducedMotion = useReducedMotion();

  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const ringW = useMotionValue(28);
  const ringH = useMotionValue(28);
  const ringR = useMotionValue(999);

  const springCfg = { stiffness: 260, damping: 26, mass: 0.5 };
  const sx = useSpring(ringX, springCfg);
  const sy = useSpring(ringY, springCfg);
  const sw = useSpring(ringW, springCfg);
  const sh = useSpring(ringH, springCfg);
  const sr = useSpring(ringR, { stiffness: 260, damping: 30 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add("cursor-enabled");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let activeEl = null;

    function measure() {
      if (activeEl) {
        const r = activeEl.getBoundingClientRect();
        const pad = 10;
        ringX.set(r.left - pad);
        ringY.set(r.top - pad);
        ringW.set(r.width + pad * 2);
        ringH.set(r.height + pad * 2);
        ringR.set(Math.min(18, r.height / 2 + pad));
      } else {
        ringX.set(mouseX - 14);
        ringY.set(mouseY - 14);
        ringW.set(28);
        ringH.set(28);
        ringR.set(999);
      }
    }

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (!activeEl) measure();
    }

    function onOver(e) {
      const target = e.target.closest(".cursor-hover");
      activeEl = target || null;
      setLabel(target?.dataset.cursorText || "");
      measure();
    }

    function onScroll() {
      if (activeEl) measure();
    }

    measure();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.body.classList.remove("cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion, ringH, ringR, ringW, ringX, ringY]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-magenta-400"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center overflow-hidden border border-cyan-300/60 bg-cyan-400/[0.06] backdrop-blur-[1px]"
        style={{
          x: sx,
          y: sy,
          width: sw,
          height: sh,
          borderRadius: sr,
          willChange: "transform, width, height",
        }}
        aria-hidden="true"
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-200">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
