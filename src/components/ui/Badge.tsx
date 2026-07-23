import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}