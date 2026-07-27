import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDIES_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { BackLink } from "@/components/ui/BackLink";

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
    description: study.seo?.metaDescription || study.summary,
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

  return (
    <main className="min-h-screen pt-40 pb-32">
      <article className="max-w-3xl mx-auto px-8">
        <BackLink href="/case-studies" label="Back to Case Studies" />
        <SectionLabel>CASE STUDY</SectionLabel>
        {study.clientName && (
          <p className="text-accent font-mono text-sm uppercase tracking-wide mt-6">
            {study.clientName}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
          {study.title}
        </h1>

        {study.publishedAt && (
          <div className="text-sm text-muted font-mono mb-10">
            {new Date(study.publishedAt).toLocaleDateString()}
          </div>
        )}

        {study.featuredImage && (
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={getImageUrl(study.featuredImage, 1200)}
              alt={study.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {study.results?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {study.results.map((result: string, i: number) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 text-center"
              >
                <p className="text-accent font-mono text-sm">{result}</p>
              </div>
            ))}
          </div>
        )}

        <PortableTextRenderer value={study.body} />
      </article>
    </main>
  );
}