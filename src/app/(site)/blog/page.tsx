/*import Link from "next/link";
import Image from "next/image";
import { BackLink } from "@/components/ui/BackLink";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { Newsletter } from "@/components/sections/Newsletter";

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
      <Newsletter />
    </main>
  );
}*/
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Newsletter } from "@/components/sections/Newsletter";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const { data } = await sanityFetch({ query: POSTS_QUERY });
  const rawPosts = (data ?? []) as any[];

  const posts = rawPosts.map((post) => {
    const wordCount = post.plainBody
      ? post.plainBody.trim().split(/\s+/).filter(Boolean).length
      : 0;
    const readingTime = Math.max(1, Math.round(wordCount / 200));
    return { ...post, readingTime };
  });

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="relative mb-16 pb-40 overflow-hidden">
  {/* Green outlined watermark, sitting in its own space below the heading */}
  <span
    className="hidden md:block absolute top-[13rem] lg:top-[15rem] right-0 font-display font-black text-transparent text-[8rem] lg:text-[10rem] leading-none tracking-tight select-none pointer-events-none z-0"
    style={{
      WebkitTextStroke: "1.5px var(--color-accent)",
      opacity: 0.25,
    }}
  >
    BLOG
  </span>

  <div className="relative z-10">
    <SectionLabel>BLOG</SectionLabel>
    <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mt-6">
  What we&apos;re
  <br />
  <span className="text-accent italic">
    learning &amp; building
  </span>
</h1>
    <p className="text-muted mt-6 max-w-xl leading-relaxed">
      Practical AI engineering, architecture decisions, and lessons
      from production — written by the engineers who build the
      systems.
    </p>
  </div>
</div>
<div className="border-t border-border mb-12" />
        {posts.length === 0 ? (
          <p className="text-muted">No posts published yet.</p>
        ) : (
          <BlogListClient posts={posts} />
        )}
      </div>
      <Newsletter />
    </main>
  );
}