"use client";

import { useEffect, useRef } from "react";

// Integer lattice hash -> [0, 1)
function hash3(x: number, y: number, z: number): number {
  let h =
    Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// 3D value noise (x, y, time)
function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const zf = smooth(z - zi);

  const v000 = hash3(xi, yi, zi);
  const v100 = hash3(xi + 1, yi, zi);
  const v010 = hash3(xi, yi + 1, zi);
  const v110 = hash3(xi + 1, yi + 1, zi);
  const v001 = hash3(xi, yi, zi + 1);
  const v101 = hash3(xi + 1, yi, zi + 1);
  const v011 = hash3(xi, yi + 1, zi + 1);
  const v111 = hash3(xi + 1, yi + 1, zi + 1);

  return lerp(
    lerp(lerp(v000, v100, xf), lerp(v010, v110, xf), yf),
    lerp(lerp(v001, v101, xf), lerp(v011, v111, xf), yf),
    zf
  );
}

// Fractal brownian motion, 3 octaves
function fbm(x: number, y: number, z: number): number {
  return (
    noise3(x, y, z) * 0.5 +
    noise3(x * 2, y * 2, z * 2) * 0.3 +
    noise3(x * 4, y * 4, z * 4) * 0.2
  );
}

// Light -> dense glyph ramp; index 0 draws nothing
const RAMP = [" ", ".", "·", ":", "-", "=", "+", "*", "#", "%", "@"];

const CELL_W = 12;
const CELL_H = 18;
const FONT_SIZE = 12;
const FREQ = 0.045; // noise frequency per cell
const TIME_SPEED = 0.00018;
const FPS_INTERVAL = 1000 / 30;
const MOUSE_RADIUS = 140; // px
const MOUSE_BOOST = 0.55;

interface AsciiFieldProps {
  className?: string;
}

export default function AsciiField({ className }: AsciiFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let lastDraw = 0;
    let visible = true;
    // Mouse position in canvas coordinates; eased toward target each frame
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const fontFamily =
      getComputedStyle(document.body).fontFamily || "monospace";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL_W) + 1;
      rows = Math.ceil(height / CELL_H) + 1;
      ctx.font = `${FONT_SIZE}px ${fontFamily}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      draw(performance.now());
    };

    const draw = (now: number) => {
      const t = now * TIME_SPEED;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(20, 20, 20, 0.75)";

      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      const r2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (let gy = 0; gy < rows; gy++) {
        const py = gy * CELL_H + CELL_H / 2;
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * CELL_W + CELL_W / 2;
          let n = fbm(gx * FREQ, gy * FREQ * 1.4, t);
          // Sharpen the field so shapes have defined edges
          n = Math.max(0, (n - 0.42) * 2.2);

          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            n += MOUSE_BOOST * (1 - d2 / r2);
          }

          const idx = Math.min(RAMP.length - 1, Math.floor(n * RAMP.length));
          if (idx > 0) {
            ctx.fillText(RAMP[idx], px, py);
          }
        }
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastDraw < FPS_INTERVAL) return;
      lastDraw = now;
      draw(now);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
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
      window.addEventListener("mousemove", onMouseMove);
      document.documentElement.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
