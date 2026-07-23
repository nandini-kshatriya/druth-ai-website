import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { BuiltLikeCode } from "@/components/sections/BuiltLikeCode";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeBuild />
      <BuiltLikeCode />
    </main>
  );
}