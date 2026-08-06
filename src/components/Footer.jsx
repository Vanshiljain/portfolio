import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowIcon } from "./Icons";
import { scrollToTarget } from "../hooks/useLenis";
import { profile } from "../data/resume";

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useClock();

  return (
    <footer className="relative z-[1] border-t border-cyan-500/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim/60 md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js &amp; Framer
          Motion.
        </p>

        <div className="flex items-center gap-6">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta-400" />
            Available for new opportunities
          </p>
          <p className="hidden text-cyan-300 sm:block" suppressHydrationWarning>
            {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} IST
          </p>
        </div>

        <MagneticButton
          as="button"
          onClick={() => scrollToTarget("#top", { offset: 0 })}
          className="cursor-hover group relative flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 text-cyan-300 transition-colors hover:border-magenta-400 hover:text-magenta-300"
          aria-label="Back to top"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="-rotate-90"
          >
            <ArrowIcon />
          </motion.span>
        </MagneticButton>
      </div>
    </footer>
  );
}
