import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

let rippleId = 0;

// Shared CTA primitive: magnetic pull (via MagneticButton) + animated
// gradient border-sweep on outline variants + a click ripple.
export default function Button({
  as = "a",
  variant = "solid",
  icon = null,
  children,
  className = "",
  onClick,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId++;
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick?.(e);
  }

  const base =
    "cursor-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors";
  const styles =
    variant === "solid"
      ? "bg-paper text-ink-950"
      : "border-sweep border border-cyan-400/30 text-paper hover:border-magenta-400 hover:text-magenta-300";

  return (
    <MagneticButton
      as={as}
      onClick={handleClick}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {variant === "solid" && (
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-magenta-400 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute z-0 h-4 w-4 rounded-full bg-paper/60"
          style={{ left: r.x - 8, top: r.y - 8 }}
        />
      ))}
    </MagneticButton>
  );
}
