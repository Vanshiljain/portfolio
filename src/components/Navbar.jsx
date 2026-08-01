import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/resume";

const LINKS = [
  { href: "#about", label: "About", num: "01" },
  { href: "#skills", label: "Skills", num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#education", label: "Education", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink-950/80 backdrop-blur-md border-b border-cobalt-500/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-mono text-sm tracking-wider text-paper cursor-hover"
        >
          <span className="text-amber-400">/</span>vanshil-jain
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-widest text-paper-dim transition-colors hover:text-paper cursor-hover"
              >
                <span className="mr-1.5 text-cobalt-400">{link.num}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeFile}
          download
          className="hidden rounded-full border border-cobalt-400/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-amber-400 hover:text-amber-300 md:block cursor-hover"
        >
          Resume ↓
        </a>

        <button
          className="flex flex-col gap-1.5 md:hidden cursor-hover"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-cobalt-500/10 bg-ink-950/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-mono text-sm uppercase tracking-widest text-paper-dim"
                  >
                    <span className="mr-2 text-cobalt-400">{link.num}</span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeFile}
                  download
                  className="mt-2 inline-block rounded-full border border-cobalt-400/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-amber-300"
                >
                  Resume ↓
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
