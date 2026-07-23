"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-accent/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-6"
          >
            <span className="h-px w-4 bg-accent" />
            {HERO_CONTENT.eyebrow}
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-6xl md:text-7xl font-bold leading-[1.05] mb-8"
          >
            {HERO_CONTENT.headlineLines.map((l, i) => (
              <motion.span
                key={i}
                variants={line}
                className={`block ${l.accent ? "text-accent" : "text-foreground"}`}
              >
                {l.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-muted text-lg max-w-md mb-10 leading-relaxed"
          >
            Druth AI is a research-driven AI engineering company. We build{" "}
            <span className="text-foreground">agents</span>,{" "}
            <span className="text-foreground">fine-tuned models</span>,{" "}
            <span className="text-foreground">memory architectures</span> and
            the <span className="text-foreground">infrastructure</span> that
            makes them production-ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex gap-4"
          >
            <Button variant="primary">{HERO_CONTENT.ctaPrimary}</Button>
            <Button variant="outline">{HERO_CONTENT.ctaSecondary}</Button>
          </motion.div>
        </div>

        {/* Right side — placeholder for Phase 4 particle logo */}
        <div className="hidden lg:flex items-center justify-center h-[500px] rounded-2xl border border-border/50 text-muted text-sm font-mono">
          [ Three.js particle logo goes here — Phase 4 ]
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-10 left-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {HERO_CONTENT.scrollLabel}
      </motion.div>
    </section>
  );
}