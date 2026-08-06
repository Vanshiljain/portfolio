import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToTarget } from "../hooks/useLenis";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const IDS = SECTIONS.map((s) => s.id);

// Fixed right-side scroll-spy rail — a persistent "chapter" indicator for
// the long single-page scroll.
export default function SectionDots() {
  const active = useActiveSection(IDS);

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollToTarget(`#${s.id}`, { offset: s.id === "top" ? 0 : -88 })}
          className="cursor-hover group relative flex h-4 w-4 items-center justify-center"
          aria-label={`Go to ${s.label}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              active === s.id
                ? "scale-150 bg-magenta-400 shadow-[0_0_10px_2px_rgba(255,47,208,0.6)]"
                : "bg-paper-dim/40 group-hover:bg-cyan-300"
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-cyan-400/20 bg-ink-900/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
