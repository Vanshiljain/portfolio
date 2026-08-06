import { motion, AnimatePresence } from "framer-motion";

// Decorative header for the active skill group: a small node-graph radiating
// from a central hub, echoing the hero's neural core at section scale.
// Re-keyed per tab so the whole graph morphs into a new shape on switch.
export default function SkillConstellation({ items, activeKey }) {
  const width = 600;
  const height = 170;
  const cx = width / 2;
  const cy = height / 2;
  const n = items.length;

  const nodes = items.map((label, i) => {
    const angle = (i / n) * Math.PI * 2;
    const rx = width * 0.44;
    const ry = height * 0.68;
    const jitter = 0.7 + 0.3 * Math.sin(i * 2.399 + activeKey.length);
    return {
      label,
      x: cx + Math.cos(angle) * rx * jitter,
      y: cy + Math.sin(angle) * ry * jitter,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-24 w-full sm:h-32"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.g key={activeKey} initial="hidden" animate="show" exit="hidden">
          {nodes.map((node, i) => (
            <motion.line
              key={`spoke-${i}`}
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
              stroke="#3ee9ff"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.28 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.025 }}
            />
          ))}
          {nodes.map((node, i) =>
            i < nodes.length - 1 ? (
              <motion.line
                key={`web-${i}`}
                x1={node.x}
                y1={node.y}
                x2={nodes[i + 1].x}
                y2={nodes[i + 1].y}
                stroke="#ff2fd0"
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.14 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.025 }}
              />
            ) : null
          )}
          <motion.circle
            cx={cx}
            cy={cy}
            r={5}
            fill="#ff2fd0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.35 }}
          />
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={3.5}
              fill="#3ee9ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.18 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
