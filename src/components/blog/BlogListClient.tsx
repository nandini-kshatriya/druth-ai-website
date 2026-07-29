"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { BLOG_CATEGORIES } from "@/lib/constants";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: any;
  publishedAt?: string;
  author?: { name?: string };
  categories?: { title: string; slug: { current: string } }[];
  readingTime: number;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PAGE_SIZE = 6;

export function BlogListClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Always show the standard category set, plus any extra categories
  // that exist on real posts but aren't in the default list.
  const categories = useMemo(() => {
    const extra = new Set<string>();
    posts.forEach((p) =>
      p.categories?.forEach((c) => {
        if (!BLOG_CATEGORIES.includes(c.title)) extra.add(c.title);
      })
    );
    return [...BLOG_CATEGORIES, ...Array.from(extra)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        p.categories?.some((c) => c.title === activeCategory);
      const matchesQuery = p.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  const featured = filtered[0];
  const sideList = filtered.slice(1, 4);
  const gridPosts = filtered.slice(4, visibleCount);
  const hasMore = filtered.length > visibleCount;

  return (
    <div>
      {/* Filter pills + search */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
              activeCategory === cat
                ? "bg-accent text-black border-accent"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="relative ml-auto w-full sm:w-64">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-border bg-background-soft text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No articles match your search.</p>
      ) : (
        <>
          {/* Featured post + side list of next 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featured && (
              <Link
                href={`/blog/${featured.slug.current}`}
                className="lg:col-span-2 group"
              >
                <GlassCard className="overflow-hidden h-full hover:border-accent/50 transition-colors">
                  <div className="relative w-full h-64 sm:h-80 bg-background">
                    {featured.featuredImage && (
                      <Image
                        src={getImageUrl(featured.featuredImage, 900)}
                        alt={featured.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent">
                      Featured
                    </span>
                    <h2 className="font-display text-2xl font-bold mt-3 mb-3 group-hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-muted text-sm leading-relaxed mb-6 max-w-xl">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted font-mono">
                      <span>{featured.readingTime} min read</span>
                      <span>{formatDate(featured.publishedAt)}</span>
                      <span className="text-accent group-hover:underline ml-auto">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            )}

            {sideList.length > 0 && (
              <div className="flex flex-col divide-y divide-border">
                {sideList.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group py-6 first:pt-0"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
                      {post.categories?.[0]?.title ?? "Article"}
                    </span>
                    <h3 className="font-semibold mt-2 mb-3 leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-muted font-mono">
                      <span>{post.readingTime} min read</span>
                      <span>·</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining posts grid */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border pt-10">
              {gridPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group py-8 md:py-0 md:px-8 first:pt-0 md:first:pl-0"
                >
                  <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
                    {post.categories?.[0]?.title ?? "Article"}
                  </span>
                  <h3 className="font-semibold text-lg mt-3 mb-3 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-accent text-xs font-mono">
                    Read Article →
                  </span>
                </Link>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-6 py-3 rounded-full border border-border text-xs font-mono uppercase tracking-wide text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Load More Articles ↓
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}