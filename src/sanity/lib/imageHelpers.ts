import { urlFor } from "./image";
import type { SanityImageSource } from "@sanity/image-url";

export function getImageUrl(source: SanityImageSource, width = 800) {
  return urlFor(source).width(width).auto("format").url();
}