import TiltCard from "./TiltCard";

// Shared card shell: glass panel + animated HUD corner brackets + a
// perimeter light-sweep on hover, composed on top of the existing TiltCard.
export default function HUDCard({ children, className = "", tilt = 6, ...props }) {
  return (
    <TiltCard
      max={tilt}
      className={`hud-corners border-sweep cursor-hover group relative overflow-hidden rounded-2xl border border-cyan-500/15 bg-ink-800/40 backdrop-blur-sm transition-colors duration-300 hover:border-magenta-400/30 ${className}`}
      {...props}
    >
      {children}
    </TiltCard>
  );
}
