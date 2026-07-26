import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function ResearchLoading() {
  return (
    <main className="min-h-screen pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <SectionLabel>RESEARCH</SectionLabel>
        <div className="h-12 bg-border/40 rounded w-2/3 mt-6 mb-16 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}