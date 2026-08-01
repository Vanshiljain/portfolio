import { motion } from "framer-motion";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./About";
import { projects } from "../data/resume";

export default function Projects() {
  return (
    <section id="projects" className="relative bg-ink-950 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="04" label="Projects" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            Selected <span className="text-gradient-signal italic">builds</span>.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
          {projects.map((project, i) => (
            <RevealItem key={project.name}>
              <ProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      whileHover="hover"
      className="cursor-hover group relative overflow-hidden rounded-3xl border border-cobalt-500/15 bg-ink-900/60 p-8 md:p-10"
    >
      <motion.div
        variants={{ hover: { opacity: 1, scale: 1.1 } }}
        initial={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/25 to-cobalt-500/25 blur-3xl"
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-6xl text-cobalt-500/20 md:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-amber-400/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
          {project.tag}
        </span>
      </div>

      <h3 className="relative mt-4 font-display text-3xl text-paper md:text-4xl">
        {project.name}
      </h3>

      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-paper-dim">
        {project.description}
      </p>

      <p className="relative mt-5 font-mono text-xs uppercase tracking-wide text-cobalt-300">
        {project.metric}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-cobalt-400/20 px-3 py-1 font-mono text-[11px] text-paper-dim"
          >
            {tech}
          </span>
        ))}
      </div>

      <motion.div
        variants={{ hover: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 8 } }}
        initial="initial"
        className="relative mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300"
      >
        <span>Case study</span>
        <motion.span variants={{ hover: { x: 6 } }} className="inline-block">
          →
        </motion.span>
      </motion.div>

      <motion.div
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-amber-400 to-cobalt-400"
      />
    </motion.div>
  );
}
