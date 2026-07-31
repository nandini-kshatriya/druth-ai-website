"use client";
import { useEffect, useState } from "react";

type Section = { title: string; anchorId: { current: string } };

export function ContentsSidebar({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.anchorId.current);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections?.length) return null;

  return (
    <nav className="hidden xl:block sticky top-32 self-start w-56 shrink-0">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
        Contents
      </p>
      <ul className="space-y-3 border-l border-border">
        {sections.map((s) => (
          <li key={s.anchorId.current}>
            <a
              href={`#${s.anchorId.current}`}
              className={`block pl-4 -ml-px border-l text-sm transition-colors ${
                activeId === s.anchorId.current
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}