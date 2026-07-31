import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { MetricsGrid } from "@/components/case-studies/MetricsGrid";
import { ContentsSidebar } from "@/components/case-studies/ContentsSidebar";
import { CaseStudySection } from "@/components/case-studies/CaseStudySection";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: CASE_STUDIES_QUERY });
  const caseStudies = (data ?? []) as any[];
  return caseStudies.map((study) => ({ slug: study.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  });
  const study = data as any;

  if (!study) return {};

  return {
    title: study.seo?.metaTitle || study.title,
    description: study.seo?.metaDescription || study.shortDescription,
    openGraph: study.seo?.ogImage
      ? { images: [getImageUrl(study.seo.ogImage, 1200)] }
      : undefined,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug },
  });
  const study = data as any;

  if (!study) notFound();

  const sections = study.sections ?? [];

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-10">
          <SectionLabel>CASE STUDY</SectionLabel>
          {study.clientName && (
            <p className="text-accent font-mono text-sm uppercase tracking-wide mt-6">
              {study.clientName}
              {study.industry ? ` · ${study.industry}` : ""}
            </p>
          )}
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
            {study.title}
          </h1>
          {study.shortDescription && (
            <p className="text-muted text-lg leading-relaxed">
              {study.shortDescription}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted font-mono mt-6">
            {study.author?.name && <span>{study.author.name}</span>}
            {study.readingTime && <span>{study.readingTime} min read</span>}
            {study.publishedAt && (
              <span>{new Date(study.publishedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {study.featuredImage && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={getImageUrl(study.featuredImage, 1600)}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {study.metrics?.length > 0 && (
          <div className="border-t border-b border-border py-10 mb-16">
            <MetricsGrid metrics={study.metrics} />
          </div>
        )}

        {/* Sticky sidebar + sections */}
        <div className="flex gap-16">
          <ContentsSidebar sections={sections} />

          <div className="flex-1 min-w-0">
            {sections.map((section: any, i: number) => (
              <CaseStudySection key={i} section={section} />
            ))}

            {/* Project Details */}
            {study.projectDetails && (
              <div className="border-t border-border pt-10 mb-16">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Project Details
                </h2>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(study.projectDetails)
                    .filter(([k, v]) => v && k !== "additionalInfo")
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-xs font-mono uppercase tracking-wide text-muted mb-1">
                          {key.replace(/([A-Z])/g, " $1")}
                        </dt>
                        <dd className="text-sm">{value as string}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}

            {/* Technology stack */}
            {study.technologies?.length > 0 && (
              <div className="border-t border-border pt-10 mb-16">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Technology Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {study.technologies.map((t: any, i: number) => (
                    <span
                      key={i}
                      className="text-sm font-mono px-4 py-2 border border-border rounded-full text-muted"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {study.cta && (
              <div className="border-t border-border pt-10 mb-16 text-center">
                <h2 className="font-display text-3xl font-bold mb-3">
                  {study.cta.heading}
                </h2>
                {study.cta.description && (
                  <p className="text-muted mb-6 max-w-lg mx-auto">
                    {study.cta.description}
                  </p>
                )}
                <div className="flex justify-center gap-4">
                  {study.cta.primaryButtonText && (
                    <Link href={study.cta.primaryButtonLink || "/#contact"}>
                      <Button variant="primary">{study.cta.primaryButtonText}</Button>
                    </Link>
                  )}
                  {study.cta.secondaryButtonText && (
                    <Link href={study.cta.secondaryButtonLink || "/case-studies"}>
                      <Button variant="outline">{study.cta.secondaryButtonText}</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Related case studies */}
            {study.relatedCaseStudies?.length > 0 && (
              <div className="border-t border-border pt-10">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Related Case Studies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {study.relatedCaseStudies.map((rel: any) => (
                    <Link
                      key={rel._id}
                      href={`/case-studies/${rel.slug.current}`}
                      className="group"
                    >
                      {rel.featuredImage && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3">
                          <Image
                            src={getImageUrl(rel.featuredImage, 500)}
                            alt={rel.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="font-semibold group-hover:text-accent transition-colors">
                        {rel.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}