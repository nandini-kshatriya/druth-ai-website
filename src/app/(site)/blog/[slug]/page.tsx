import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: POSTS_QUERY });
  const posts = (data ?? []) as any[];
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });
  const post = data as any;

  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: post.seo?.ogImage
      ? { images: [getImageUrl(post.seo.ogImage, 1200)] }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });
  const post = data as any;

  if (!post) notFound();

  return (
    <main className="min-h-screen pt-40 pb-32">
      <article className="max-w-3xl mx-auto px-8">
        <SectionLabel>BLOG</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted font-mono mb-10">
          {post.author?.name && <span>{post.author.name}</span>}
          {post.publishedAt && (
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          )}
        </div>

        {post.featuredImage && (
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={getImageUrl(post.featuredImage, 1200)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <PortableTextRenderer value={post.body} />

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            {post.tags.map((tag: string) => (
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