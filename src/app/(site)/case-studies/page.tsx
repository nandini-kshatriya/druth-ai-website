import Link from "next/link";
import Image from "next/image";
import { BackLink } from "@/components/ui/BackLink";
import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

export const revalidate = 60;

export default async function CaseStudiesIndexPage() {
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY });
  const caseStudies = (data ?? []) as any[];

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionLabel>CASE STUDIES</SectionLabel>
        <h1 className="font-display text-5xl font-bold mt-6 mb-16">
          Real systems, real results.
        </h1>

        {caseStudies.length === 0 ? (
          <p className="text-muted">No case studies published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study: any) => (
              <Link key={study._id} href={`/case-studies/${study.slug.current}`}>
                <GlassCard className="overflow-hidden h-full group hover:border-accent/50 transition-colors">
                  {study.featuredImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={getImageUrl(study.featuredImage, 600)}
                        alt={study.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {study.clientName && (
                      <p className="text-xs font-mono text-accent uppercase tracking-wide mb-2">
                        {study.clientName}
                      </p>
                    )}
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {study.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed">
                      {study.summary}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}