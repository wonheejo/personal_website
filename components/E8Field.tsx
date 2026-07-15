"use client";

import { useEffect, useRef } from "react";

// The 240 roots of the E8 lattice:
// - 112 of the form (±2 at position i, ±2 at position j, 0 elsewhere), i < j
// - 128 of the form (±1)^8 with an even number of minus signs
function buildRoots(): number[][] {
  const roots: number[][] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      for (const si of [2, -2]) {
        for (const sj of [2, -2]) {
          const v = new Array(8).fill(0);
          v[i] = si;
          v[j] = sj;
          roots.push(v);
        }
      }
    }
  }
  for (let mask = 0; mask < 256; mask++) {
    let bits = 0;
    for (let b = 0; b < 8; b++) if (mask & (1 << b)) bits++;
    if (bits % 2 !== 0) continue;
    const v = new Array(8);
    for (let b = 0; b < 8; b++) v[b] = mask & (1 << b) ? -1 : 1;
    roots.push(v);
  }
  return roots;
}

// Edges connect nearest neighbors: pairs of roots at squared distance 8
function buildEdges(roots: number[][]): [number, number][] {
  const edges: [number, number][] = [];
  for (let a = 0; a < roots.length; a++) {
    for (let b = a + 1; b < roots.length; b++) {
      let d2 = 0;
      for (let k = 0; k < 8; k++) {
        const d = roots[a][k] - roots[b][k];
        d2 += d * d;
      }
      if (d2 === 8) edges.push([a, b]);
    }
  }
  return edges;
}

function dot8(a: number[], b: number[]): number {
  let s = 0;
  for (let k = 0; k < 8; k++) s += a[k] * b[k];
  return s;
}

const FPS_INTERVAL = 1000 / 30;
const DRIFT = 0.0012; // radians-ish per frame of 8D tumble

interface E8FieldProps {
  className?: string;
}

export default function E8Field({ className }: E8FieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const roots = buildRoots();
    const edges = buildEdges(roots);
    const xs = new Float64Array(roots.length);
    const ys = new Float64Array(roots.length);

    let width = 0;
    let height = 0;
    let raf = 0;
    let lastDraw = 0;
    let visible = true;

    let gaussSpare: number | null = null;
    const gauss = () => {
      if (gaussSpare !== null) {
        const g = gaussSpare;
        gaussSpare = null;
        return g;
      }
      const u = Math.random() || 1e-9;
      const v = Math.random();
      const r = Math.sqrt(-2 * Math.log(u));
      gaussSpare = r * Math.sin(2 * Math.PI * v);
      return r * Math.cos(2 * Math.PI * v);
    };

    // h[0], h[1] span the projection plane; h[2], h[3] are their velocities.
    // The plane drifts as a smooth random walk through 8D rotation space.
    const h: number[][] = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
      for (let k = 0; k < 8; k++) h[i][k] = gauss();
    }

    // Gram-Schmidt: h1 ⊥ h0, h2 ⊥ h0, h3 ⊥ h0,h1,h2; all normalized
    const orthonormalize = () => {
      const deps = [[], [0], [0], [0, 1, 2]];
      for (let i = 0; i < 4; i++) {
        for (const j of deps[i]) {
          const p = dot8(h[i], h[j]);
          for (let k = 0; k < 8; k++) h[i][k] -= p * h[j][k];
        }
        const norm = Math.sqrt(dot8(h[i], h[i])) || 1;
        for (let k = 0; k < 8; k++) h[i][k] /= norm;
      }
    };
    orthonormalize();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = (Math.min(width, height) / 2) * 0.92;

      for (let i = 0; i < roots.length; i++) {
        xs[i] = cx + (dot8(h[0], roots[i]) / 3) * scale;
        ys[i] = cy + (dot8(h[1], roots[i]) / 3) * scale;
      }

      ctx.beginPath();
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        ctx.moveTo(xs[a], ys[a]);
        ctx.lineTo(xs[b], ys[b]);
      }
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = "rgba(15, 15, 15, 0.32)";
      ctx.stroke();
    };

    const step = () => {
      for (let k = 0; k < 8; k++) {
        h[0][k] += DRIFT * h[2][k];
        h[1][k] += DRIFT * h[3][k];
        h[2][k] += DRIFT * gauss();
        h[3][k] += DRIFT * gauss();
      }
      orthonormalize();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastDraw < FPS_INTERVAL) return;
      lastDraw = now;
      step();
      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (!reducedMotion) {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
