/*"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Brain, Network } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WHAT_WE_BUILD } from "@/lib/constants";

const icons = [Cpu, Layers, Brain, Network];

export function WhatWeBuild() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <SectionLabel>{WHAT_WE_BUILD.eyebrow}</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              {WHAT_WE_BUILD.heading}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-muted text-lg leading-relaxed">
              {WHAT_WE_BUILD.paragraph}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHAT_WE_BUILD.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="w-14 h-14 rounded-xl border border-border flex items-center justify-center mb-6 text-accent transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(62,207,142,0.2)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-mono text-sm uppercase tracking-wide mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}*/
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconShape } from "@/lib/generateShapePoints";
import { WHAT_WE_BUILD } from "@/lib/constants";

const ParticleIconCanvas = dynamic(
  () => import("@/components/ParticleIconCanvas").then((mod) => mod.ParticleIconCanvas),
  { ssr: false, loading: () => <div className="h-40 w-full" /> }
);

//const shapes: IconShape[] = ["brain", "layers", "network", "stack"];
const shapes: IconShape[] = ["cube", "layers", "brain", "network"];

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const count = WHAT_WE_BUILD.items.length;

  const next = () => setActive((p) => (p + 1) % count);
  const prev = () => setActive((p) => (p - 1 + count) % count);

  return (
    <section className="relative overflow-hidden bg-[#08150f] py-24 px-6 md:px-16 border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(62,207,142,0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <SectionLabel>{WHAT_WE_BUILD.eyebrow}</SectionLabel>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              {WHAT_WE_BUILD.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {WHAT_WE_BUILD.paragraph}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted">Our Capabilities</p>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous capability"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next capability"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black transition hover:opacity-90"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_WE_BUILD.items.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(i)}
                className={`group flex h-[420px] flex-col justify-between rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                  /*isActive
                    ? "border-accent/60 bg-emerald-950/30 shadow-[0_0_30px_rgba(62,207,142,0.12)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"*/
                    isActive
  ? "border-accent bg-black shadow-[0_0_30px_rgba(62,207,142,0.12)]"
  : "border-white/10 bg-black hover:border-accent/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:text-white" />
                </div>

                <div className="h-40 w-full">
                  <ParticleIconCanvas shape={shapes[i]} active={isActive} />
                </div>

                <div>
                  <div className="mb-3 h-px w-6 bg-accent/60" />
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{item.description}</p>
                  <button className="flex items-center gap-2 text-sm font-medium text-accent">
                    Explore
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-black">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {WHAT_WE_BUILD.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to capability ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-accent" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}