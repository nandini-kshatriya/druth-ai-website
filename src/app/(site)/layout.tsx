import { LenisProvider } from "@/components/LenisProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
      <Footer />
      <SanityLive />
    </LenisProvider>
  );
}