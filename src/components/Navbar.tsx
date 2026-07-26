"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-xl border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Druth AI" width={28} height={28} />
          <span className="font-semibold text-lg">Druth AI</span>
          <Badge>COMPANY</Badge>
        </div>

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
          <Button variant="outline">Agency</Button>
          <Button variant="primary">Get in Touch</Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-6 py-6 flex flex-col gap-6">
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
            <Button variant="outline">Agency</Button>
            <Button variant="primary">Get in Touch</Button>
          </div>
        </div>
      )}
    </header>
  );
}