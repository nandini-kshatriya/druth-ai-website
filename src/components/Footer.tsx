import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/lib/constants";
import { FooterParticles } from "@/components/FooterParticles";

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-5">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Starfield dot background */}
      {/*<div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />*/}
      {/* Interactive particle background */}
        <FooterParticles />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at 20% 0%, rgba(62,207,142,0.06), transparent)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-8 pt-20 pb-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-16">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Druth AI" width={28} height={28} />
            <span className="font-semibold text-lg">Druth AI</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            All systems operational
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
          <FooterColumn title="Platform" links={[...FOOTER_LINKS.platform]} />
          <FooterColumn title="Use Cases" links={[...FOOTER_LINKS.useCases]} />
          <FooterColumn title="Resources" links={[...FOOTER_LINKS.resources]} />
          <FooterColumn title="Company" links={[...FOOTER_LINKS.company]} />
          <FooterColumn title="Community" links={[...FOOTER_LINKS.community]} />
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted font-mono">
  <span>© {new Date().getFullYear()} Druth AI. All rights reserved.</span>
  <div className="flex items-center gap-6 uppercase tracking-wide">
    <Link href="/research" className="hover:text-accent transition-colors">
      Research
    </Link>
    <Link href="/case-studies" className="hover:text-accent transition-colors">
      Case Studies
    </Link>
    <Link href="#open-source" className="hover:text-accent transition-colors">
      Open Source
    </Link>
    <Link href="#privacy" className="hover:text-accent transition-colors">
      Privacy
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
}