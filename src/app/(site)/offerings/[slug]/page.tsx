import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { OFFERING_BY_SLUG_QUERY, OFFERINGS_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: OFFERINGS_QUERY });
  const offerings = (data ?? []) as any[];
  return offerings.map((offering) => ({ slug: offering.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: OFFERING_BY_SLUG_QUERY,
    params: { slug },
  });
  const offering = data as any;

  if (!offering) return {};

  return {
    title: offering.seo?.metaTitle || offering.title,
    description: offering.seo?.metaDescription || offering.shortDescription,
    openGraph: offering.seo?.ogImage
      ? { images: [getImageUrl(offering.seo.ogImage, 1200)] }
      : undefined,
  };
}

export default async function OfferingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: OFFERING_BY_SLUG_QUERY,
    params: { slug },
  });
  const offering = data as any;

  if (!offering) notFound();

  return (
    <main className="min-h-screen pt-40 pb-32">
      <article className="max-w-3xl mx-auto px-8">
        <SectionLabel>SOLUTIONS</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-6 leading-tight">
          {offering.title}
        </h1>

        {offering.featuredImage && (
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={getImageUrl(offering.featuredImage, 1200)}
              alt={offering.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <PortableTextRenderer value={offering.body} />
      </article>
    </main>
  );
}