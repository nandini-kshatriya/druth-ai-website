import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import NextLink from "next/link";
import { getImageUrl } from "@/sanity/lib/imageHelpers";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-muted leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-6 italic text-foreground my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    link: ({ children, value }) => (
      <NextLink
        href={value?.href || "#"}
        className="text-accent underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </NextLink>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(value, 1200)}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-muted mb-5 space-y-2">
        {children}
      </ul>
    ),
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}