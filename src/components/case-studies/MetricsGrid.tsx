import { Clock, Layers, Star, TrendingDown, TrendingUp, Target, Timer } from "lucide-react";

const iconMap: Record<string, any> = {
  clock: Clock,
  layers: Layers,
  star: Star,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  target: Target,
  timer: Timer,
};

const fallbackIcons = [Clock, Layers, Star, TrendingDown, TrendingUp, Target, Timer];

type Metric = {
  value: string;
  label: string;
  icon?: string;
  color?: "accent" | "white" | "muted";
};

export function MetricsGrid({
  metrics,
  compact = false,
}: {
  metrics?: Metric[];
  compact?: boolean;
}) {
  if (!metrics?.length) return null;

  return (
    <div
      className={`grid gap-6 ${
        compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {metrics.map((m, i) => {
        const Icon = (m.icon && iconMap[m.icon]) || fallbackIcons[i % fallbackIcons.length];
        const colorClass =
          m.color === "white"
            ? "text-foreground"
            : m.color === "muted"
            ? "text-muted"
            : "text-accent";

        return (
          <div key={i} className="min-w-0">
            <Icon className={`w-4 h-4 mb-2 ${colorClass}`} />
            <p className={`font-display text-2xl font-bold truncate ${colorClass}`}>
              {m.value}
            </p>
            <p className="text-[11px] text-muted uppercase tracking-wide mt-1 line-clamp-2">
              {m.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}