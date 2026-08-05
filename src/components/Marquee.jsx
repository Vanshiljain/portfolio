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
    <div className="relative overflow-hidden border-y border-cobalt-500/10 bg-ink-950 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent md:w-40" />

      <div className="marquee-track">
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex shrink-0 items-center gap-8 px-8 font-mono text-sm uppercase tracking-widest text-paper-dim/50"
          >
            {tech}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-400/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
