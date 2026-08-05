import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PipelineCanvas from "./PipelineCanvas";
import MagneticButton from "./MagneticButton";
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

const ROLES = ["Full Stack Engineer", "AI Agent Architect", "Backend Systems Builder"];

function useTypewriter(words, { typeSpeed = 55, deleteSpeed = 30, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(20,166,204,0.16),transparent)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-cobalt-600/25 blur-[110px]" />
        <div
          className="blob absolute right-[-6rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-500/15 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="blob absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-cobalt-400/10 blur-[100px]"
          style={{ animationDelay: "-11s" }}
        />
      </div>

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
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          Open to work — Indore, India
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-[6.5rem]"
        >
          Vanshil <span className="text-gradient-signal-animated italic">Jain</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-6 flex h-8 items-center font-mono text-lg text-amber-300 md:text-xl"
        >
          <span>{typed}</span>
          <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-amber-300" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl font-display text-xl italic text-paper-dim md:text-2xl"
        >
          {profile.pitch}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-paper-dim/80"
        >
          Multi-agent orchestration, vector-backed memory, and enterprise
          automation — built with NestJS, React, LangChain, MCP, and Qdrant.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#projects"
            className="cursor-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-paper px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink-950"
          >
            <span className="relative z-10">View the work</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-400 to-cobalt-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href={profile.resumeFile}
            download
            className="cursor-hover inline-flex items-center gap-2 rounded-full border border-cobalt-400/30 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-amber-400 hover:text-amber-300"
          >
            Download résumé ↓
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-cobalt-500/15 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim/70"
        >
          <span>LangChain</span>
          <span className="text-cobalt-500">·</span>
          <span>MCP</span>
          <span className="text-cobalt-500">·</span>
          <span>Qdrant</span>
          <span className="text-cobalt-500">·</span>
          <span>NestJS</span>
          <span className="text-cobalt-500">·</span>
          <span>Claude AI</span>
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
