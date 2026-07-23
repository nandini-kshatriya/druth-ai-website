"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { CONTACT_CONTENT } from "@/lib/constants";

const inputClasses =
  "w-full bg-background-soft border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

const labelClasses =
  "block text-xs font-mono uppercase tracking-wide text-muted mb-2";

export function Contact() {
  return (
    <section className="py-32 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel>{CONTACT_CONTENT.eyebrow}</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-bold mt-6 mb-6 leading-[1.05]">
            {CONTACT_CONTENT.headingLines.map((l, i) => (
              <span
                key={i}
                className={`block ${l.accent ? "text-accent italic" : "text-foreground"}`}
              >
                {l.text}
              </span>
            ))}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10 max-w-md">
            {CONTACT_CONTENT.paragraph}
          </p>

          <div className="space-y-6">
            <div>
              <span className={labelClasses}>Email</span>
              <p className="text-accent">{CONTACT_CONTENT.email}</p>
            </div>
            <div>
              <span className={labelClasses}>Office</span>
              <p>{CONTACT_CONTENT.office}</p>
            </div>
            <div>
              <span className={labelClasses}>Hours</span>
              <p>{CONTACT_CONTENT.hours}</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>First Name</label>
              <input type="text" placeholder="Jane" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Last Name</label>
              <input type="text" placeholder="Smith" className={inputClasses} />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              type="email"
              placeholder="jane@company.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Company</label>
            <input
              type="text"
              placeholder="Your Company Inc."
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Project Budget</label>
            <select className={inputClasses}>
              {CONTACT_CONTENT.budgetOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>Tell us about your project</label>
            <textarea
              rows={4}
              placeholder="We're looking to build an AI agent that..."
              className={inputClasses}
            />
          </div>

          <Button variant="primary" type="submit" className="w-full sm:w-auto">
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
}