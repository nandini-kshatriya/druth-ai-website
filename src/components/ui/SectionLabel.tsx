export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
      <span className="h-px w-4 bg-accent" />
      {children}
    </div>
  );
}