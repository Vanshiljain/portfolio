import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./About";
import { experience } from "../data/resume";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-ink-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="03" label="Experience" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            One role, four{" "}
            <span className="text-gradient-signal italic">production</span> systems.
          </h2>
        </Reveal>

        {experience.map((job) => (
          <div key={job.company} className="mt-16">
            <Reveal direction="up" delay={0.15}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-cobalt-500/15 pb-6">
                <div>
                  <h3 className="font-display text-2xl text-paper md:text-3xl">{job.company}</h3>
                  <p className="mt-1 font-mono text-sm text-cobalt-300">{job.role}</p>
                </div>
                <div className="text-right font-mono text-xs uppercase tracking-widest text-paper-dim/70">
                  <p>{job.period}</p>
                  <p className="mt-1">{job.location}</p>
                </div>
              </div>
            </Reveal>

            <div className="relative mt-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cobalt-400/50 via-cobalt-500/20 to-transparent md:left-[7px]" />
              <RevealGroup className="flex flex-col">
                {job.projects.map((project) => (
                  <RevealItem key={project.name}>
                    <ProjectRow project={project} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pl-8 py-6">
      <span className="absolute left-0 top-9 flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute h-3.5 w-3.5 rounded-full bg-ink-900 ring-2 ring-cobalt-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      </span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-hover group flex w-full flex-wrap items-center justify-between gap-3 text-left"
      >
        <div>
          <h4 className="font-display text-xl text-paper transition-colors group-hover:text-amber-300 md:text-2xl">
            {project.name}
          </h4>
          <p className="mt-1 max-w-xl text-sm text-paper-dim">{project.blurb}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cobalt-400/30 font-mono text-lg text-cobalt-300"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-3 border-l border-cobalt-500/20 pl-5">
              {project.points.map((point, i) => (
                <li key={i} className="list-none text-sm leading-relaxed text-paper-dim">
                  {point}
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
