/*import { groq } from "next-sanity";

// ---- Blog Posts ----
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title, slug}
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    featuredImage,
    publishedAt,
    author->{name, avatar, role},
    categories[]->{title, slug},
    tags,
    seo
  }
`;

// ---- Research Articles ----
export const RESEARCH_QUERY = groq`
  *[_type == "researchArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    abstract,
    featuredImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title, slug}
  }
`;

export const RESEARCH_BY_SLUG_QUERY = groq`
  *[_type == "researchArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    abstract,
    body,
    featuredImage,
    publishedAt,
    author->{name, avatar, role},
    categories[]->{title, slug},
    tags,
    seo
  }
`;

// ---- Case Studies ----
export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    clientName,
    summary,
    featuredImage,
    publishedAt,
    categories[]->{title, slug}
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientName,
    summary,
    body,
    results,
    featuredImage,
    publishedAt,
    author->{name, avatar, role},
    categories[]->{title, slug},
    tags,
    seo
  }
`;

// ---- Offerings ----
export const OFFERINGS_QUERY = groq`
  *[_type == "offering"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    categories[]->{title, slug}
  }
`;

export const OFFERING_BY_SLUG_QUERY = groq`
  *[_type == "offering" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    body,
    featuredImage,
    publishedAt,
    categories[]->{title, slug},
    tags,
    seo
  }
`;*/
import { groq } from "next-sanity";

// ---- Blog Posts ----
export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title, slug},
    "plainBody": pt::text(body)
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    featuredImage,
    publishedAt,
    author->{name, avatar, role},
    categories[]->{title, slug},
    tags,
    seo
  }
`;

// ---- Research Articles ----
export const RESEARCH_QUERY = groq`
  *[_type == "researchArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    abstract,
    featuredImage,
    publishedAt,
    author->{name, avatar},
    categories[]->{title, slug}
  }
`;

export const RESEARCH_BY_SLUG_QUERY = groq`
  *[_type == "researchArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    abstract,
    body,
    featuredImage,
    publishedAt,
    author->{name, avatar, role},
    categories[]->{title, slug},
    tags,
    seo
  }
`;

// ---- Case Studies ----
export const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    clientName,
    industry,
    serviceCategory,
    featuredBadge,
    shortDescription,
    featuredImage,
    publishedAt,
    readingTime,
    featured,
    metrics,
    categories[]->{title, slug}
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientName,
    industry,
    serviceCategory,
    featuredBadge,
    shortDescription,
    featuredImage,
    publishedAt,
    readingTime,
    author->{name, avatar, role},
    metrics,
    sections[]{
      ...,
      _type == "pageSection" => {
        sectionType,
        title,
        subtitle,
        anchorId,
        content,
        image,
        quote,
        callout,
        showDivider,
        backgroundStyle,
        twoColumnLayout,
        fullWidthLayout,
        challengeBlocks,
        solutionBlocks,
        resultBlocks,
        timelineItems,
        technologies
      }
    },
    projectDetails,
    technologies,
    relatedCaseStudies[]->{
      _id, title, slug, clientName, featuredImage, shortDescription
    },
    categories[]->{title, slug},
    tags,
    cta,
    seo
  }
`;

// ---- Offerings ----
export const OFFERINGS_QUERY = groq`
  *[_type == "offering"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    categories[]->{title, slug}
  }
`;

export const OFFERING_BY_SLUG_QUERY = groq`
  *[_type == "offering" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    body,
    featuredImage,
    publishedAt,
    categories[]->{title, slug},
    tags,
    seo
  }
`;