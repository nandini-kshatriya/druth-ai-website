import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { OFFERINGS_QUERY } from "@/sanity/lib/queries";
import { getImageUrl } from "@/sanity/lib/imageHelpers";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

export const revalidate = 60;

export default async function OfferingsIndexPage() {
  const { data } = await sanityFetch({ query: OFFERINGS_QUERY });
  const offerings = (data ?? []) as any[];
  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionLabel>SOLUTIONS</SectionLabel>
        <h1 className="font-display text-5xl font-bold mt-6 mb-16">
          What we can build for you.
        </h1>

        {offerings.length === 0 ? (
          <p className="text-muted">No offerings published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering: any) => (
              <Link key={offering._id} href={`/offerings/${offering.slug.current}`}>
                <GlassCard className="overflow-hidden h-full group hover:border-accent/50 transition-colors">
                  {offering.featuredImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={getImageUrl(offering.featuredImage, 600)}
                        alt={offering.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {offering.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed">
                      {offering.shortDescription}
                    </p>
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