import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { SectionLabel } from "./About";
import { skillGroups } from "../data/resume";

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].key);
  const activeGroup = skillGroups.find((g) => g.key === active);

  return (
    <section id="skills" className="relative bg-ink-950 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="02" label="Skills" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            The stack behind every{" "}
            <span className="text-gradient-signal italic">pipeline</span>.
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.2} className="mt-14">
          <div className="flex flex-wrap gap-2">
            {skillGroups.map((group) => (
              <button
                key={group.key}
                onClick={() => setActive(group.key)}
                className={`cursor-hover relative rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === group.key
                    ? "text-ink-950"
                    : "text-paper-dim hover:text-paper"
                }`}
              >
                {active === group.key && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-amber-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{group.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-12 min-h-[220px] overflow-hidden rounded-3xl border border-cobalt-500/15 bg-ink-900/60 p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(91,124,255,0.6) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-wrap gap-3"
            >
              {activeGroup.items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-hover rounded-full border border-cobalt-400/25 bg-ink-800/60 px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:border-amber-400/50 hover:text-amber-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
