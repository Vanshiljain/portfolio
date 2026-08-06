import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/resume";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToTarget } from "../hooks/useLenis";
import { NodeMarkIcon, DownloadIcon } from "./Icons";

const LINKS = [
  { href: "#about", label: "About", num: "01" },
  { href: "#skills", label: "Skills", num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#education", label: "Education", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

const IDS = ["top", ...LINKS.map((l) => l.href.slice(1))];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e, href) {
    e.preventDefault();
    setOpen(false);
    // Deferred: firing the scroll in the same tick as closing the animated
    // mobile dropdown gets it silently cancelled.
    setTimeout(() => {
      scrollToTarget(href, { offset: href === "#top" ? 0 : -88 });
      history.pushState(null, "", href);
    }, 0);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink-950/80 backdrop-blur-md border-b border-cyan-500/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="cursor-hover flex items-center gap-2 font-mono text-sm tracking-wider text-paper"
        >
          <NodeMarkIcon
            className={`h-4 w-4 text-cyan-300 transition-colors ${active === "top" ? "text-magenta-300" : ""}`}
          />
          vanshil-jain
        </a>

        <ul className="relative hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`cursor-hover relative z-10 flex items-center rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive ? "text-ink-950" : "text-paper-dim hover:text-paper"
                  }`}
                >
                  <span className={`mr-1.5 ${isActive ? "text-ink-950/60" : "text-cyan-400"}`}>{link.num}</span>
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-magenta-400"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a
          href={profile.resumeFile}
          download
          className="cursor-hover hidden items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-magenta-400 hover:text-magenta-300 md:flex"
        >
          Resume <DownloadIcon className="h-3.5 w-3.5" />
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
            className="overflow-hidden border-t border-cyan-500/10 bg-ink-950/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block py-2.5 font-mono text-sm uppercase tracking-widest ${
                      active === link.href.slice(1) ? "text-magenta-300" : "text-paper-dim"
                    }`}
                  >
                    <span className="mr-2 text-cyan-400">{link.num}</span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeFile}
                  download
                  className="mt-2 inline-block rounded-full border border-cyan-400/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-magenta-300"
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
