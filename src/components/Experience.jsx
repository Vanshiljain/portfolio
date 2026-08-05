import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./About";
import { experience } from "../data/resume";

export default function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative bg-ink-900 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="03" label="Experience" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            One company, three{" "}
            <span className="text-gradient-signal italic">roles</span>, five
            production systems.
          </h2>
        </Reveal>

        <div ref={trackRef} className="relative mt-16">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-cobalt-500/10 md:left-[7px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-amber-400 via-cobalt-400 to-cobalt-500/40 md:left-[7px]"
          />

          <div className="flex flex-col gap-16">
            {experience.map((job) => (
              <RoleBlock key={job.role} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleBlock({ job }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute h-3.5 w-3.5 rounded-full bg-ink-900 ring-2 ring-amber-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      </span>

      <Reveal direction="up" delay={0.05}>
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-cobalt-500/15 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl text-paper md:text-3xl">{job.role}</h3>
              {job.current && (
                <span className="rounded-full border border-amber-400/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-sm text-cobalt-300">{job.company}</p>
          </div>
          <div className="text-right font-mono text-xs uppercase tracking-widest text-paper-dim/70">
            <p>{job.period}</p>
            <p className="mt-1">{job.location}</p>
          </div>
        </div>
      </Reveal>

      <div className="relative mt-4">
        <RevealGroup className="flex flex-col">
          {job.projects.map((project) => (
            <RevealItem key={project.name}>
              <ProjectRow project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pl-8 py-6">
      <span className="absolute left-0 top-9 flex h-3 w-3 items-center justify-center">
        <span className="absolute h-3 w-3 rounded-full bg-ink-900 ring-2 ring-cobalt-400/60" />
        <span className="h-1 w-1 rounded-full bg-cobalt-300" />
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
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="list-none text-sm leading-relaxed text-paper-dim"
                >
                  {point}
                </motion.li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
