import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { ScanReveal } from "./Reveal";
import { SectionLabel } from "./About";
import Glow from "./Glow";
import SkillConstellation from "./SkillConstellation";
import { skillGroups } from "../data/resume";

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].key);
  const activeGroup = skillGroups.find((g) => g.key === active);

  return (
    <section id="skills" className="relative px-6 py-28 md:px-10 md:py-36">
      <Glow variant="reverse" />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="02" label="Skills" />

        <ScanReveal className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl" delay={0.1}>
          The stack behind every{" "}
          <span className="text-gradient-signal italic">pipeline</span>.
        </ScanReveal>

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
                    className="absolute inset-0 rounded-full bg-magenta-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {group.label}
                  <span
                    className={`ml-2 ${active === group.key ? "text-ink-950/50" : "text-paper-dim/40"}`}
                  >
                    {group.items.length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="conic-border scanlines relative mt-12 min-h-[220px] overflow-hidden rounded-3xl bg-ink-900/60 p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(62,233,255,0.6) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <SkillConstellation items={activeGroup.items} activeKey={active} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-6 flex flex-wrap gap-3"
            >
              {activeGroup.items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="cursor-hover rounded-full border border-cyan-400/25 bg-ink-800/60 px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:border-magenta-400/50 hover:text-magenta-300 hover:shadow-[0_8px_24px_-8px_rgba(255,47,208,0.35)]"
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
