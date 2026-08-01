import { motion } from "framer-motion";
import PipelineCanvas from "./PipelineCanvas";
import { profile } from "../data/resume";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(91,124,255,0.16),transparent)]" />
      <div className="absolute inset-0 opacity-70">
        <PipelineCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10"
      >
        <motion.p
          variants={item}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cobalt-300"
        >
          <span className="h-px w-8 bg-cobalt-400" />
          Software Engineer — Indore, India
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-[6.5rem]"
        >
          Vanshil <span className="text-gradient-signal italic">Jain</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl font-display text-xl italic text-paper-dim md:text-2xl"
        >
          {profile.pitch}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-paper-dim/80"
        >
          Backend systems, LLM agent pipelines, and enterprise automation —
          built with Node.js, NestJS, LangChain, and Claude.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="cursor-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-paper px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink-950 transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">View the work</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-400 to-cobalt-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>

          <a
            href={profile.resumeFile}
            download
            className="cursor-hover inline-flex items-center gap-2 rounded-full border border-cobalt-400/30 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-amber-400 hover:text-amber-300"
          >
            Download résumé ↓
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-cobalt-500/15 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim/70"
        >
          <span>LangChain</span>
          <span className="text-cobalt-500">·</span>
          <span>Claude AI</span>
          <span className="text-cobalt-500">·</span>
          <span>NestJS</span>
          <span className="text-cobalt-500">·</span>
          <span>AWS Lambda</span>
          <span className="text-cobalt-500">·</span>
          <span>GraphQL</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:left-10 md:translate-x-0"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper-dim/60"
        >
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-cobalt-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
