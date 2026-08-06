import { motion } from "framer-motion";
import Reveal, { RevealGroup, RevealItem, ScanReveal } from "./Reveal";
import CountUp from "./CountUp";
import Glow from "./Glow";
import HUDCard from "./HUDCard";
import { summary, stats } from "../data/resume";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-36">
      <Glow />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="01" label="About" />

        <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-7">
            <ScanReveal className="font-display text-4xl leading-[1.15] text-paper md:text-5xl">
              I build the orchestration layer that lets{" "}
              <span className="text-gradient-signal italic">AI agents</span>{" "}
              actually get work done.
            </ScanReveal>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper-dim md:text-lg">
              {summary}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-6 md:col-span-5 md:gap-8">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <HUDCard tilt={4} className="p-6">
                  <p className="font-display text-4xl text-paper md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-widest text-paper-dim/70">
                    {stat.label}
                  </p>
                  <motion.span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-magenta-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </HUDCard>
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
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">
        <span>{num}</span>
        <span className="h-px w-8 bg-cyan-500/40" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}
