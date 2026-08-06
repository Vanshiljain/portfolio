import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const BOOT_LINES = [
  "> initializing agent_runtime.sys",
  "> mounting neural interface...",
  "> establishing signal — cyan/magenta channels",
  "> orchestration core online",
];

export default function Preloader({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }

    const lineTimers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setLineCount((c) => Math.max(c, i + 1)), 220 + i * 260)
    );

    const start = performance.now();
    const duration = 1500;
    let raf;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 260);
      }
    }
    raf = requestAnimationFrame(tick);

    return () => {
      lineTimers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.15 : 0.4, delay: reducedMotion ? 0 : 0.35 } }}
          onAnimationEnd={() => {
            document.body.style.overflow = "";
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
        >
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 0 }}
            className="pointer-events-none absolute inset-0 bg-ink-950"
          />

          <div className="scanlines relative z-10 w-full max-w-md px-8 font-mono text-xs text-cyan-300 sm:text-sm">
            <div className="flex flex-col gap-2">
              {BOOT_LINES.slice(0, reducedMotion ? BOOT_LINES.length : lineCount).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={i === BOOT_LINES.length - 1 ? "text-magenta-300" : "text-paper-dim"}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="mt-6 h-px w-full overflow-hidden bg-ink-600">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-paper to-magenta-400"
                style={{ width: `${reducedMotion ? 100 : progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-[10px] uppercase tracking-widest text-paper-dim/60">
              {reducedMotion ? 100 : progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
