"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  return (
    <section className="py-24">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="rounded-2xl border border-border bg-background-soft/60 backdrop-blur-xl px-8 py-12 md:px-12 md:py-16">
          <SectionLabel>NEWSLETTER</SectionLabel>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight mt-6 mb-4">
            Stay up to date
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl whitespace-nowrap mb-8">
            New posts every week. No marketing — only engineering depth.
            Unsubscribe anytime.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}