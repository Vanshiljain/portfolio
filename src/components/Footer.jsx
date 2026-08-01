import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer className="relative border-t border-cobalt-500/10 bg-ink-950 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-paper-dim/60 md:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Framer Motion.</p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Available for new opportunities
        </p>
      </div>
    </footer>
  );
}
