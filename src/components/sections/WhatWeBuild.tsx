"use client";

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
}