"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/constants";
import { ParticleLogoCanvas } from "@/components/three/ParticleLogoCanvas";
import Link from "next/link";
import { useLenis } from "@/components/LenisProvider";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const lenis = useLenis();

const handleContactClick = (e: React.MouseEvent) => {
  e.preventDefault();
  const target = document.querySelector("#contact");
  if (target && lenis) {
    lenis.scrollTo(target as HTMLElement);
  } else if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
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

      {/*<div className="max-w-[1440px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">*/}
      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">
        <div>
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8 max-w-xl"
          >
            {HERO_CONTENT.headline}
            <span className="text-accent italic">{HERO_CONTENT.headlineAccent}</span>
            {HERO_CONTENT.headlineEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
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
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex gap-4"
          >
            <Link href="/case-studies">
              <Button variant="primary">{HERO_CONTENT.ctaPrimary}</Button>
            </Link>
            <Button variant="outline" onClick={handleContactClick}>
            {HERO_CONTENT.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        <div className="hidden lg:block h-[600px] -mr-8">
          <ParticleLogoCanvas />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {HERO_CONTENT.scrollLabel}
      </motion.div>
    </section>
  );
}