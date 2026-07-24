import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen bg-background p-16 space-y-16">
      <div>
        <h1 className="text-5xl font-bold mb-4">
          We build AI <span className="text-accent">systems</span>
        </h1>
        <p className="text-muted max-w-md font-mono text-sm">
          General Sans headline + JetBrains Mono label check.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Badge>COMPANY</Badge>
        <SectionLabel>WHAT WE BUILD</SectionLabel>
      </div>

      <div className="flex gap-4">
        <Button variant="primary">View Case Studies</Button>
        <Button variant="outline">Talk To Us</Button>
      </div>

      <GlassCard className="p-8 max-w-md">
        <p className="text-sm text-muted">
          This is a glassmorphic card — border, blur, soft background.
        </p>
      </GlassCard>
    </main>
  );
}