import { motion } from "framer-motion";
import { ScanReveal } from "./Reveal";
import { SectionLabel } from "./About";
import HUDCard from "./HUDCard";
import Glow from "./Glow";
import { education } from "../data/resume";

const LOG_LINES = [
  { prefix: "degree", value: education.degree },
  { prefix: "institution", value: education.school },
  { prefix: "location", value: education.location },
  { prefix: "period", value: education.period },
  { prefix: "result", value: education.detail, accent: true },
];

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-28 md:px-10 md:py-36">
      <Glow />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="05" label="Education" />

        <ScanReveal className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl" delay={0.1}>
          Where the <span className="text-gradient-signal italic">fundamentals</span> were laid.
        </ScanReveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="mt-12"
        >
          <HUDCard tilt={4} className="scanlines p-8 md:p-12">
            <div className="flex flex-col gap-3 font-mono text-sm">
              {LOG_LINES.map((line) => (
                <motion.p
                  key={line.prefix}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className={line.accent ? "text-magenta-300" : "text-paper-dim"}
                >
                  <span className="text-cyan-400">{"> "}</span>
                  <span className="text-cyan-300">{line.prefix}</span>
                  <span className="text-paper-dim/50">: </span>
                  <span className={line.accent ? "font-display text-lg text-magenta-200" : "text-paper"}>
                    {line.value}
                  </span>
                </motion.p>
              ))}
            </div>
          </HUDCard>
        </motion.div>
      </div>
    </section>
  );
}
