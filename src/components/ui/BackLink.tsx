import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({
  href = "/",
  label = "Back to Home",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors mb-10"
    >
      <ArrowLeft size={14} />
      {label}
    </Link>
  );
}