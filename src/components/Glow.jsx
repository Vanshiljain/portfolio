// Ambient drifting color blobs dropped into a section for a "living"
// background — cheap CSS animation, no canvas/JS cost.
export default function Glow({ variant = "default" }) {
  if (variant === "reverse") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="blob absolute -right-32 top-0 h-96 w-96 rounded-full bg-cyan-600/20 blur-[110px]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="blob absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-magenta-500/15 blur-[120px]"
          style={{ animationDelay: "-13s" }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="blob absolute -left-28 top-0 h-96 w-96 rounded-full bg-cyan-600/20 blur-[110px]"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="blob absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-magenta-500/15 blur-[120px]"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
