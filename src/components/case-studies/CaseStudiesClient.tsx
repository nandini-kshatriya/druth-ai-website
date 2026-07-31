/*"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CaseStudyStats } from "./CaseStudyStats";
import { CASE_STUDY_FILTERS } from "@/lib/constants";

type CaseStudy = {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  summary?: string;
  categories?: { title: string; slug: { current: string } }[];
  results?: string[];
};

export function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((cs) =>
      cs.categories?.some((c) => c.title === activeFilter)
    );
  }, [caseStudies, activeFilter]);

  const featured = filtered.slice(0, 2);

  return (
    <div>
      {featured.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-6">
            <span className="h-px w-4 bg-accent" />
            FEATURED PROJECTS
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {featured.map((cs) => (
              <Link
                key={cs._id}
                href={`/case-studies/${cs.slug.current}`}
                className="group rounded-2xl border border-border bg-background-soft/60 p-8 hover:border-accent/40 transition-colors"
              >
                {cs.categories?.[0]?.title && (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent">
                    {cs.categories[0].title}
                  </span>
                )}
                {cs.clientName && (
                  <p className="text-xs text-muted mt-1 mb-3">{cs.clientName}</p>
                )}
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {cs.title}
                </h3>
                {cs.summary && (
                  <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                    {cs.summary}
                  </p>
                )}
                <div className="pt-6 border-t border-border">
                  <CaseStudyStats results={cs.results} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted">
          Filter:
        </span>
        {CASE_STUDY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
              activeFilter === f
                ? "bg-accent text-black border-accent"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mt-10 mb-6">
        <span className="h-px w-4 bg-accent" />
        ALL CASE STUDIES ({filtered.length})
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No case studies match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((cs) => (
            <Link
              key={cs._id}
              href={`/case-studies/${cs.slug.current}`}
              className="group rounded-2xl border border-border bg-background-soft/60 p-6 hover:border-accent/40 transition-colors"
            >
              {cs.categories?.[0]?.title && (
                <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
                  {cs.categories[0].title}
                </span>
              )}
              {cs.clientName && (
                <p className="text-[11px] text-muted mt-1 mb-3">{cs.clientName}</p>
              )}
              <h3 className="font-semibold mb-3 leading-snug group-hover:text-accent transition-colors">
                {cs.title}
              </h3>
              {cs.summary && (
                <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                  {cs.summary}
                </p>
              )}
              <div className="pt-4 border-t border-border">
                <CaseStudyStats results={cs.results?.slice(0, 2)} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}*/
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MetricsGrid } from "./MetricsGrid";
import { CASE_STUDY_FILTERS } from "@/lib/constants";

type Metric = {
  value: string;
  label: string;
  icon?: string;
  color?: "accent" | "white" | "muted";
};

type CaseStudy = {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  shortDescription?: string;
  categories?: { title: string; slug: { current: string } }[];
  metrics?: Metric[];
};

export function CaseStudiesClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((cs) =>
      cs.categories?.some((c) => c.title === activeFilter)
    );
  }, [caseStudies, activeFilter]);

  const featured = filtered.slice(0, 2);

  return (
    <div>
      {featured.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-6">
            <span className="h-px w-4 bg-accent" />
            FEATURED PROJECTS
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {featured.map((cs) => (
              <Link
                key={cs._id}
                href={`/case-studies/${cs.slug.current}`}
                className="group rounded-2xl border border-border bg-background-soft/60 p-8 hover:border-accent/40 transition-colors"
              >
                {cs.categories?.[0]?.title && (
                  <span className="text-xs font-mono uppercase tracking-widest text-accent">
                    {cs.categories[0].title}
                  </span>
                )}
                {cs.clientName && (
                  <p className="text-xs text-muted mt-1 mb-3">{cs.clientName}</p>
                )}
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {cs.title}
                </h3>
                {cs.shortDescription && (
                  <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                    {cs.shortDescription}
                  </p>
                )}
                <div className="pt-6 border-t border-border">
                  <MetricsGrid metrics={cs.metrics} compact />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-muted">
          Filter:
        </span>
        {CASE_STUDY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
              activeFilter === f
                ? "bg-accent text-black border-accent"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mt-10 mb-6">
        <span className="h-px w-4 bg-accent" />
        ALL CASE STUDIES ({filtered.length})
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No case studies match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((cs) => (
            <Link
              key={cs._id}
              href={`/case-studies/${cs.slug.current}`}
              className="group rounded-2xl border border-border bg-background-soft/60 p-6 hover:border-accent/40 transition-colors"
            >
              {cs.categories?.[0]?.title && (
                <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
                  {cs.categories[0].title}
                </span>
              )}
              {cs.clientName && (
                <p className="text-[11px] text-muted mt-1 mb-3">{cs.clientName}</p>
              )}
              <h3 className="font-semibold mb-3 leading-snug group-hover:text-accent transition-colors">
                {cs.title}
              </h3>
              {cs.shortDescription && (
                <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                  {cs.shortDescription}
                </p>
              )}
              <div className="pt-4 border-t border-border">
                <MetricsGrid metrics={cs.metrics?.slice(0, 2)} compact />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}