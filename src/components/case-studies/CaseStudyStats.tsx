import { Clock, Layers, Star, TrendingDown, TrendingUp, Target, Timer } from "lucide-react";

const icons = [Clock, Layers, Star, TrendingDown, TrendingUp, Target, Timer];

export function CaseStudyStats({ results }: { results?: string[] }) {
  if (!results?.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {results.map((r, i) => {
        const parts = r.split("|").map((s) => s.trim());
        const hasLabel = parts.length > 1;
        const value = hasLabel ? parts[0] : "";
        const label = hasLabel ? parts[1] : parts[0];
        const Icon = icons[i % icons.length];

        return (
          <div key={i} className="min-w-0">
            <Icon className="w-4 h-4 text-accent mb-2" />
            {value && (
              <p className="font-display text-2xl font-bold text-accent truncate">
                {value}
              </p>
            )}
            <p
              className={`uppercase tracking-wide mt-1 line-clamp-2 ${
                value
                  ? "text-[11px] text-muted"
                  : "text-sm text-accent normal-case tracking-normal"
              }`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}