import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { RESEARCH_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

export const revalidate = 60;

export default async function ResearchIndexPage() {
  const { data } = await sanityFetch({ query: RESEARCH_QUERY });
  const articles = (data ?? []) as any[];

  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionLabel>RESEARCH</SectionLabel>
        <h1 className="font-display text-5xl font-bold mt-6 mb-16">
          Latest from our lab.
        </h1>

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