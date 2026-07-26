import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_BY_SLUG_QUERY, RESEARCH_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: RESEARCH_QUERY });
  const articles = (data ?? []) as any[];
  return articles.map((article) => ({ slug: article.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: RESEARCH_BY_SLUG_QUERY,
    params: { slug },
  });
  const article = data as any;

  if (!article) return {};

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.abstract,
    openGraph: article.seo?.ogImage
      ? { images: [getImageUrl(article.seo.ogImage, 1200)] }
      : undefined,
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: RESEARCH_BY_SLUG_QUERY,
    params: { slug },
  });
  const article = data as any;

  if (!article) notFound();

  return (
    <main className="min-h-screen pt-40 pb-32">
      <article className="max-w-3xl mx-auto px-8">
        <SectionLabel>RESEARCH</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted font-mono mb-10">
          {article.author?.name && <span>{article.author.name}</span>}
          {article.publishedAt && (
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          )}
        </div>

        {article.featuredImage && (
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={getImageUrl(article.featuredImage, 1200)}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <PortableTextRenderer value={article.body} />

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 border border-border rounded-full text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}