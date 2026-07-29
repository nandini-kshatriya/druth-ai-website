import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { CaseStudiesClient } from "@/components/case-studies/CaseStudiesClient";
import { FolderStack } from "@/components/case-studies/FolderStack";

export const revalidate = 60;

export default async function CaseStudiesIndexPage() {
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY });
  const caseStudies = (data ?? []) as any[];

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="relative mb-16 pb-16 min-h-[540px] overflow-hidden">
          <FolderStack />

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-6">
              <span className="h-px w-4 bg-accent" />
              CASE STUDIES
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Results that
              <br />
              <span className="text-accent italic">speak for themselves</span>
            </h1>
            <p className="text-muted mt-6 leading-relaxed">
              Real deployments. Measurable outcomes. No demos — only
              production systems that changed how our clients operate.
            </p>
          </div>
        </div>

        <div className="border-t border-border mb-12" />

        {caseStudies.length === 0 ? (
          <p className="text-muted">No case studies published yet.</p>
        ) : (
          <CaseStudiesClient caseStudies={caseStudies} />
        )}
      </div>
    </main>
  );
}