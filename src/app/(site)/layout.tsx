import { LenisProvider } from "@/components/LenisProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    </LenisProvider>
  );
}