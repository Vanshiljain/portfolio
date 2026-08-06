import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroVisual from "./HeroVisual";
import Button from "./Button";
import TiltCard from "./TiltCard";
import { ArrowIcon, DownloadIcon, NodeMarkIcon } from "./Icons";
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

const CHIPS = [
  { label: "LangChain", cls: "left-[-8%] top-6" },
  { label: "MCP", cls: "right-[-10%] top-1/3" },
  { label: "Qdrant", cls: "left-[-4%] bottom-8" },
];

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
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScrollRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    heroScrollRef.current = v;
  });

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springConfig = { stiffness: 120, damping: 20, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), springConfig);

  function handlePointerMove(e) {
    mx.set(e.clientX / window.innerWidth);
    my.set(e.clientY / window.innerHeight);
  }

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="aurora-wash absolute inset-0 opacity-70 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(62,233,255,0.14),transparent)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-600/20 blur-[110px]" />
        <div
          className="blob absolute right-[-6rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-magenta-500/15 blur-[130px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="blob absolute bottom-[-8rem] left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="absolute inset-0 opacity-90">
        <HeroVisual scrollRef={heroScrollRef} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/15 to-transparent md:from-ink-950/90 md:via-ink-950/25 md:to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/90" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <motion.p
              variants={item}
              className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta-400" />
              </span>
              Open to work — Indore, India
            </motion.p>

            <motion.h1
              variants={item}
              data-text="Vanshil Jain"
              className="glitch-text font-display text-[13vw] leading-[0.95] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-[6.5rem]"
            >
              Vanshil <span className="text-gradient-signal-animated italic">Jain</span>
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-6 flex h-8 items-center font-mono text-lg text-magenta-300 md:text-xl"
            >
              <span>{typed}</span>
              <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-pulse bg-magenta-300" />
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
              <Button href="#projects" variant="solid" icon={<ArrowIcon />}>
                View the work
              </Button>
              <Button as="a" href={profile.resumeFile} download variant="outline" icon={<DownloadIcon />}>
                Résumé
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative flex justify-center md:col-span-5 md:justify-end"
          >
            <TiltCard className="group cursor-hover relative w-56 sm:w-64 md:w-full md:max-w-sm">
              <div className="conic-border glow-cyan relative aspect-square overflow-hidden rounded-[2rem] bg-ink-800">
                <img
                  src="/profile.png"
                  alt="Vanshil Jain"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
              </div>
            </TiltCard>

            {CHIPS.map((chip, i) => (
              <motion.div
                key={chip.label}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                className={`glass-panel pointer-events-none absolute hidden items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200 shadow-[0_10px_30px_-10px_rgba(62,233,255,0.4)] sm:flex ${chip.cls}`}
              >
                <NodeMarkIcon className="h-3.5 w-3.5 text-magenta-300" />
                {chip.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-24 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-cyan-500/15 pt-6 font-mono text-[11px] uppercase tracking-widest text-paper-dim/70"
        >
          <span>LangChain</span>
          <span className="text-cyan-500">·</span>
          <span>MCP</span>
          <span className="text-cyan-500">·</span>
          <span>Qdrant</span>
          <span className="text-cyan-500">·</span>
          <span>NestJS</span>
          <span className="text-cyan-500">·</span>
          <span>Claude AI</span>
          <span className="text-cyan-500">·</span>
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
          <span className="h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
