import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Signature visual: a live "agent pipeline" — nodes (systems) linked by
// bezier connectors with light packets flowing along them, echoing the
// multi-system automation work (Zoho / Slack / Jira / GitHub / Claude)
// described in the resume. Deliberately low-contrast so it stays ambient.
export default function PipelineCanvas() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let nodes = [];
    let edges = [];
    let packets = [];
    let raf;
    let mouse = { x: 0, y: 0, active: false };

    const COBALT = "20, 166, 204";
    const AMBER = "0, 217, 255";
    const PAPER = "234, 246, 251";

    function layout() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = width < 640 ? 3 : width < 1024 ? 4 : 6;
      const rows = width < 640 ? 5 : 4;
      nodes = [];
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const jitterX = (Math.random() - 0.5) * (width / cols) * 0.6;
        const jitterY = (Math.random() - 0.5) * (height / rows) * 0.6;
        nodes.push({
          x: (col + 0.5) * (width / cols) + jitterX,
          y: (row + 0.5) * (height / rows) + jitterY,
          r: Math.random() * 1.6 + 1.2,
          pulse: Math.random() * Math.PI * 2,
          accent: Math.random() > 0.72,
        });
      }

      edges = [];
      const maxDist = Math.max(width, height) / (width < 640 ? 3.2 : 4.2);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist && Math.random() > 0.55) {
            edges.push({ a: i, b: j, dist });
          }
        }
      }

      packets = edges
        .filter(() => Math.random() > 0.55)
        .map((edge) => ({
          edge,
          t: Math.random(),
          speed: 0.0018 + Math.random() * 0.0025,
          color: Math.random() > 0.5 ? COBALT : AMBER,
        }));
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // connectors
      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const mx = (a.x + b.x) / 2 + (mouse.active ? (mouse.x - (a.x + b.x) / 2) * 0.01 : 0);
        const my = (a.y + b.y) / 2 + (mouse.active ? (mouse.y - (a.y + b.y) / 2) * 0.01 : 0);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle = `rgba(${COBALT}, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // packets travelling along connectors
      if (!reducedMotion) {
        for (const p of packets) {
          p.t += p.speed;
          if (p.t > 1) p.t = 0;
          const a = nodes[p.edge.a];
          const b = nodes[p.edge.b];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const t = p.t;
          const x = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
          const y = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 5);
          glow.addColorStop(0, `rgba(${p.color}, 0.9)`);
          glow.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = reducedMotion ? 0.6 : 0.5 + Math.sin(time * 0.0012 + n.pulse) * 0.35;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.accent
          ? `rgba(${AMBER}, ${0.35 + pulse * 0.4})`
          : `rgba(${PAPER}, ${0.18 + pulse * 0.25})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onResize() {
      layout();
      if (reducedMotion) draw(0);
    }

    layout();
    if (reducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
