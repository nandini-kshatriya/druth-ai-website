import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { GlassCard } from "@/components/ui/GlassCard";
import { LetterGrid } from "@/components/research/LetterGrid";
//import { ParticleStream } from "@/components/research/ParticleStream";
import { FocusGrid } from "@/components/research/FocusGrid";

export const revalidate = 60;

export default async function ResearchIndexPage() {
  const { data } = await sanityFetch({ query: RESEARCH_QUERY });
  const articles = (data ?? []) as any[];

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="relative mb-16 pb-16 overflow-hidden">
  {/* Layer 1: subtle global grid, barely visible, spans whole hero */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage:
        "linear-gradient(rgba(62,207,142,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.06) 1px, transparent 1px)",
      backgroundSize: "44px 44px",
    }}
  />

  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
    <div className="max-w-xl">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-6">
        <span className="h-px w-4 bg-accent" />
        RESEARCH
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground">
        Latest from our lab.
      </h1>
      <p className="text-muted mt-6 leading-relaxed">
        From early experiments to real-world impact. Explore the
        research behind every breakthrough.
      </p>
    </div>

    {/* Stage: Layer 2 (illuminated focus grid) + particles + tiles, all layered together */}
    <div className="hidden lg:block relative">
      <FocusGrid />
      {/*<div className="absolute -inset-16 z-0">
        <ParticleStream />
      </div>*/}
      <div className="relative z-10">
        <LetterGrid />
      </div>
    </div>
  </div>
        </div>

        {articles.length === 0 ? (
          <p className="text-muted">No research articles published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Link
                key={article._id}
                href={`/research/${article.slug.current}`}
              >
                <GlassCard className="overflow-hidden h-full group hover:border-accent/50 transition-colors">
                  {article.featuredImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={getImageUrl(article.featuredImage, 600)}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {article.abstract}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted font-mono">
                      {article.author?.name && <span>{article.author.name}</span>}
                      {article.publishedAt && (
                        <span>
                          {new Date(article.publishedAt).toLocaleDateString()}
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