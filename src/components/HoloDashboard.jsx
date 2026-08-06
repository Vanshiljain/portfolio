import { motion } from "framer-motion";

// Decorative "holographic dashboard" graphic for the featured project card —
// abstract bars, a scanning sweep, and a small routing node-graph, standing
// in for the agent-orchestration UI the copy describes.
export default function HoloDashboard({ className = "" }) {
  const bars = [38, 62, 45, 78, 30, 54];

  return (
    <div className={`aspect-[260/170] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 260 170" className="h-full w-full overflow-visible">
        <rect
          x="1"
          y="1"
          width="258"
          height="168"
          rx="14"
          fill="none"
          stroke="#3ee9ff"
          strokeOpacity="0.45"
          strokeWidth="1"
        />

        {/* routing node-graph, top strip */}
        <g opacity="0.9">
          <circle cx="30" cy="26" r="3" fill="#ff2fd0" />
          <circle cx="80" cy="14" r="3" fill="#3ee9ff" />
          <circle cx="130" cy="30" r="3" fill="#3ee9ff" />
          <circle cx="185" cy="16" r="3" fill="#ff2fd0" />
          <circle cx="230" cy="28" r="3" fill="#3ee9ff" />
          <path
            d="M30 26 L80 14 L130 30 L185 16 L230 28"
            fill="none"
            stroke="#3ee9ff"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        </g>

        {/* bar chart */}
        <g transform="translate(24, 60)">
          {bars.map((h, i) => (
            <motion.rect
              key={i}
              x={i * 34}
              width="20"
              rx="3"
              fill={i % 2 === 0 ? "#3ee9ff" : "#ff2fd0"}
              fillOpacity="0.55"
              initial={{ height: 0, y: 90 - 0 }}
              whileInView={{ height: h, y: 90 - h }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </g>

        {/* scan sweep */}
        <motion.rect
          x="1"
          y="1"
          width="258"
          height="10"
          fill="url(#holo-scan)"
          initial={{ y: 1 }}
          animate={{ y: [1, 150, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="holo-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ee9ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#3ee9ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3ee9ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
