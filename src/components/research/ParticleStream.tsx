/*"use client";

import { useEffect, useRef } from "react";

export function ParticleStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    const particles: {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
    }[] = [];

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      width = canvas!.width = rect.width;
      height = canvas!.height = rect.height;

      particles.length = 0;
      const count = 140;

      for (let i = 0; i < count; i++) {
        const t = i / count;
        // S-curve path hugging the right edge, drifting inward and back out
        const curveX = width * (0.78 + 0.18 * Math.sin(t * Math.PI * 2.2));
        const y = t * height;
        const x = curveX + (Math.random() - 0.5) * 60;

        particles.push({
          baseX: x,
          baseY: y,
          x,
          y,
          size: Math.random() * 1.6 + 0.5,
          opacity: Math.random() * 0.5 + 0.25,
        });
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const repelRadius = 80;

      for (const p of particles) {
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.baseX;
        let targetY = p.baseY;

        if (dist < repelRadius) {
          const force = (1 - dist / repelRadius) * 22;
          const angle = Math.atan2(dy, dx);
          targetX = p.baseX + Math.cos(angle) * force;
          targetY = p.baseY + Math.sin(angle) * force;
        }

        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(62, 207, 142, ${p.opacity})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    canvas.parentElement!.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement!.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}*/