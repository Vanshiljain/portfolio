import { motion } from "framer-motion";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./About";
import TiltCard from "./TiltCard";
import Glow from "./Glow";
import { projects } from "../data/resume";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative bg-ink-950 px-6 py-28 md:px-10 md:py-36">
      <Glow variant="reverse" />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="04" label="Projects" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-10 max-w-2xl font-display text-4xl leading-tight text-paper md:text-5xl">
            Selected <span className="text-gradient-signal italic">builds</span>.
          </h2>
        </Reveal>

        {featured && (
          <Reveal direction="up" delay={0.15} className="mt-14">
            <FeaturedCard project={featured} />
          </Reveal>
        )}

        <RevealGroup className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
          {rest.map((project, i) => (
            <RevealItem key={project.name}>
              <ProjectCard project={project} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function FeaturedCard({ project }) {
  return (
    <TiltCard
      max={5}
      className="conic-border cursor-hover group relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800/80 via-ink-900/60 to-ink-800/80 p-8 glow-amber md:p-14"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/25 to-cobalt-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cobalt-500/15 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <span className="rounded-full border border-amber-400/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
          {project.tag}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-paper-dim/60">
          Current role · 2025
        </span>
      </div>

      <h3 className="relative mt-6 font-display text-5xl text-paper md:text-6xl">
        {project.name}
      </h3>

      <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-paper-dim md:text-lg">
        {project.description}
      </p>

      <p className="relative mt-6 font-mono text-sm uppercase tracking-wide text-amber-300">
        {project.metric}
      </p>

      <div className="relative mt-8 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-cobalt-400/25 bg-ink-900/50 px-3.5 py-1.5 font-mono text-xs text-paper-dim"
          >
            {tech}
          </span>
        ))}
      </div>
    </TiltCard>
  );
}

function ProjectCard({ project, index }) {
  return (
    <TiltCard className="cursor-hover group relative overflow-hidden rounded-3xl border border-cobalt-500/15 bg-ink-900/60 p-8 md:p-10">
      <motion.div
        whileHover={{ opacity: 1, scale: 1.1 }}
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
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-amber-400 to-cobalt-400"
      />
    </TiltCard>
  );
}
