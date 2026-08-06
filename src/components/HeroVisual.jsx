import { Suspense, lazy, useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import PipelineCanvas from "./PipelineCanvas";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HeroScene = lazy(() => import("./HeroScene"));

function getTier() {
  if (typeof window === "undefined") return "lite";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  return coarse || narrow ? "lite" : "full";
}

// Orchestrates the hero's signature visual: the real WebGL neural-core scene
// when the device can afford it, the existing Canvas2D pipeline as both the
// Suspense fallback and the reduced-motion substitute. The WebGL canvas
// unmounts once the hero scrolls well out of view to save GPU cycles.
export default function HeroVisual({ scrollRef }) {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { margin: "200px 0px 200px 0px" });
  const tier = useMemo(getTier, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {reducedMotion ? (
        <PipelineCanvas />
      ) : (
        <SceneErrorBoundary fallback={<PipelineCanvas />}>
          <Suspense fallback={<PipelineCanvas />}>
            {inView && <HeroScene scrollRef={scrollRef} tier={tier} />}
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
