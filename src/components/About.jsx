import { motion } from "framer-motion";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import CountUp from "./CountUp";
import { summary, stats } from "../data/resume";

export default function About() {
  return (
    <section id="about" className="relative bg-ink-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="01" label="About" />

        <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-7">
            <h2 className="font-display text-4xl leading-[1.15] text-paper md:text-5xl">
              I build the orchestration layer that lets{" "}
              <span className="text-gradient-signal italic">AI agents</span>{" "}
              actually get work done.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
              {summary}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-6 md:col-span-5 md:gap-8">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="group relative rounded-2xl border border-cobalt-500/15 bg-ink-800/40 p-6 transition-colors hover:border-amber-400/30 hover:-translate-y-1 duration-300">
                  <p className="font-display text-4xl text-paper md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-paper-dim/70">
                    {stat.label}
                  </p>
                  <motion.span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-amber-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ num, label }) {
  return (
    <Reveal direction="up" duration={0.5}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cobalt-300">
        <span className="text-amber-400">//</span>
        <span>{num}</span>
        <span className="h-px w-8 bg-cobalt-500/40" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}
