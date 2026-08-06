import { motion } from "framer-motion";

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  as: Component = motion.div,
  className = "",
  once = true,
  amount = 0.2,
}) {
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({ children, className = "", stagger = 0.12 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

// Clip-path scan-wipe, reserved for section headings — reads as a HUD
// panel powering on rather than a plain fade/slide.
//
// The clip-path lives on an inner span driven by variant propagation
// rather than its own whileInView: animating clip-path on the same element
// that Framer Motion's IntersectionObserver is watching stops that
// observer from ever reporting the element in view, so the reveal gets
// stuck at its (invisible) initial state while still reserving its full
// layout height — a large blank gap above whatever follows.
export function ScanReveal({ children, className = "", delay = 0, as: Component = motion.h2 }) {
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className="inline-block"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
          show: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            transition: { duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

export function RevealItem({ children, className = "", direction = "up" }) {
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
