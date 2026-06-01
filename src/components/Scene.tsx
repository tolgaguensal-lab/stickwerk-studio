"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Subtile Floating-Partikel als atmosphärischer Hintergrund.
 * Extrem leichtgewichtig (< 1KB JS, Canvas 2D, kein WebGL).
 * Die Partikel erinnern an feine Stickfäden — passend zum Brand.
 */
export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 12;
    const opacity = 0.04;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      const c = canvas!;
      const ct = ctx!;
      ct.clearRect(0, 0, c.width, c.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;

        ct.beginPath();
        ct.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ct.fillStyle = `rgba(138, 106, 63, ${opacity})`;
        ct.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-background via-background to-surface-muted/50" />
    </>
  );
}
