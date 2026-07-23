"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { BUILT_LIKE_CODE } from "@/lib/constants";

export function BuiltLikeCode() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>{BUILT_LIKE_CODE.eyebrow}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 leading-tight whitespace-pre-line">
            {BUILT_LIKE_CODE.heading}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
            {BUILT_LIKE_CODE.paragraph}
          </p>
          <ul className="space-y-3">
            {BUILT_LIKE_CODE.checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <Check size={12} className="text-accent" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard className="overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-accent/60" />
              <span className="ml-3 text-xs font-mono text-muted">DRUTH.AI</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              {BUILT_LIKE_CODE.codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={
                    line.type === "comment"
                      ? "text-muted"
                      : line.type === "keyword"
                      ? "text-accent"
                      : "text-foreground"
                  }
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}