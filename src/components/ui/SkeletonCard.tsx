export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-background-soft/60 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-border/40" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-border/40 rounded w-3/4" />
        <div className="h-4 bg-border/40 rounded w-full" />
        <div className="h-4 bg-border/40 rounded w-5/6" />
        <div className="h-3 bg-border/40 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}