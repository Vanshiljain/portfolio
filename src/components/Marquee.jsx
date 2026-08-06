const STACK = [
  "LangChain",
  "MCP",
  "Qdrant",
  "NestJS",
  "React.js",
  "TypeScript",
  "PostgreSQL",
  "Claude AI",
  "OpenAI",
  "Gemini",
  "GraphQL",
  "AWS Lambda",
  "Redis",
  "Docker",
];

export default function Marquee() {
  const loop = [...STACK, ...STACK];

  return (
    <div
      className="relative overflow-hidden border-y border-cyan-500/10 bg-ink-950 py-6"
      style={{ perspective: "500px" }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent md:w-40" />

      <div className="marquee-track" style={{ transform: "rotateX(10deg)" }}>
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="group flex shrink-0 cursor-default items-center gap-8 px-8 font-mono text-sm uppercase tracking-widest text-paper-dim/50 transition-all duration-300 hover:scale-110 hover:text-magenta-300"
          >
            {tech}
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-magenta-400/50 transition-all duration-300 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_2px_rgba(62,233,255,0.6)]"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
