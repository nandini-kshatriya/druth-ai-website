import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Druth AI — We build AI systems that actually work.",
  description:
    "Druth AI is a research-driven AI engineering company. We build agents, fine-tuned models, memory architectures, and the infrastructure that makes them production-ready.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}