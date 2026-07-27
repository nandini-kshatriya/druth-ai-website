"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowLeft } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLenis } from "@/components/LenisProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      const target = document.querySelector("#contact");
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement);
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#contact");
    }
  };

  return (
    <div
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled || mobileOpen ? "top-4 px-4" : "top-0 px-0"
      }`}
    >
      <header
        className={`w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? "max-w-7xl rounded-2xl border border-border bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            : "max-w-none rounded-none border border-transparent bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-8 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Druth AI" width={28} height={28} />
            <span className="font-semibold text-lg">Druth AI</span>
            {isHome && <Badge>COMPANY</Badge>}
          </div>

          {isHome ? (
            <>
              <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex items-center gap-3 shrink-0">
                <Button variant="primary" onClick={handleContactClick}>
                  Get in Touch
                </Button>
              </div>

              <button
                className="md:hidden text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Home
              </Link>

              <Button variant="primary" onClick={handleContactClick} className="shrink-0">
                Get in Touch
              </Button>
            </>
          )}
        </nav>

        {isHome && mobileOpen && (
          <div className="md:hidden px-6 py-6 flex flex-col gap-6 border-t border-border">
            <ul className="flex flex-col gap-4 text-sm text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full" onClick={handleContactClick}>
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}