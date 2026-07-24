import { ParticleLogoCanvas } from "@/components/three/ParticleLogoCanvas";

export default function ThreeTestPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-[600px] h-[600px]">
        <ParticleLogoCanvas />
      </div>
    </main>
  );
}