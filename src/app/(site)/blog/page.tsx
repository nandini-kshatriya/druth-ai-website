import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const { data } = await sanityFetch({ query: POSTS_QUERY });
  const posts = (data ?? []) as any[];;

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionLabel>BLOG</SectionLabel>
        <h1 className="font-display text-5xl font-bold mt-6 mb-16">
          Insights from the team building AI systems.
        </h1>

        {posts.length === 0 ? (
          <p className="text-muted">No posts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <GlassCard className="overflow-hidden h-full group hover:border-accent/50 transition-colors">
                  {post.featuredImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={getImageUrl(post.featuredImage, 600)}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted font-mono">
                      {post.author?.name && <span>{post.author.name}</span>}
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
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