import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { BuiltLikeCode } from "@/components/sections/BuiltLikeCode";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeBuild />
      <BuiltLikeCode />
      <Contact />
    </main>
  );
}