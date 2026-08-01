import { defineType, defineField, defineArrayMember } from "sanity";

const heroFields = [
  defineField({
    name: "title",
    title: "Title",
    type: "string",
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    group: "hero",
    options: { source: "title", maxLength: 96 },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "category",
    title: "Category",
    type: "reference",
    to: [{ type: "category" }],
    group: "hero",
  }),
  defineField({
    name: "shortDescription",
    title: "Short Description",
    type: "text",
    rows: 3,
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "heroImage",
    title: "Hero Image",
    type: "image",
    options: { hotspot: true },
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "heroBackgroundText",
    title: "Hero Background Text",
    type: "string",
    description: "Large faint watermark text, e.g. 'API'",
    group: "hero",
  }),
  defineField({
    name: "heroBadge",
    title: "Hero Badge",
    type: "string",
    group: "hero",
  }),
  defineField({
    name: "featured",
    title: "Featured Toggle",
    type: "boolean",
    initialValue: false,
    group: "hero",
  }),
  defineField({
    name: "publishedAt",
    title: "Published Date",
    type: "datetime",
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "metrics",
    title: "Metrics",
    type: "array",
    group: "hero",
    description: "Hero KPI cards",
    of: [defineArrayMember({ type: "metric" })],
    validation: (Rule) => Rule.min(1).error("Add at least one metric"),
  }),
];

export const offering = defineType({
  name: "offering",
  title: "Offering / Service",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "apiDetails", title: "API Details" },
    { name: "features", title: "Features" },
    { name: "pricing", title: "Pricing" },
    { name: "codeExamples", title: "Code Examples" },
    { name: "cta", title: "CTA" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    ...heroFields,

    // ---- API Details ----
    defineField({
      name: "endpoints",
      title: "Endpoints",
      type: "array",
      group: "apiDetails",
      of: [defineArrayMember({ type: "endpoint" })],
      validation: (Rule) => Rule.min(1).error("Add at least one endpoint"),
    }),
    defineField({
      name: "serviceType",
      title: "Service Type",
      type: "string",
      group: "apiDetails",
      options: {
        list: [
          "Retrieval",
          "Embedding",
          "Memory",
          "Reranking",
          "Generation",
          "SQL",
          "Agents",
          "Search",
        ].map((v) => ({ title: v, value: v })),
      },
    }),
    defineField({
      name: "featureDescription",
      title: "Feature Description",
      type: "richContent",
      group: "apiDetails",
    }),
    defineField({
      name: "useCases",
      title: "Use Cases",
      type: "array",
      group: "apiDetails",
      description: "Displayed as chips",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featureMetrics",
      title: "Feature Metrics",
      type: "array",
      group: "apiDetails",
      description: "e.g. Latency: <400ms p95",
      of: [defineArrayMember({ type: "metric" })],
    }),
    defineField({
      name: "apiParameters",
      title: "API Parameters",
      type: "array",
      group: "apiDetails",
      of: [defineArrayMember({ type: "apiParameter" })],
    }),
    defineField({
      name: "responseFields",
      title: "Response Fields",
      type: "array",
      group: "apiDetails",
      of: [defineArrayMember({ type: "responseField" })],
    }),

    // ---- Features ----
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      group: "features",
      of: [defineArrayMember({ type: "featureCard" })],
    }),

    // ---- Pricing ----
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      group: "pricing",
      of: [defineArrayMember({ type: "pricingTier" })],
      validation: (Rule) => Rule.min(1).error("Add at least one pricing tier"),
    }),

    // ---- Code Examples ----
    defineField({
      name: "codeExamples",
      title: "Code Examples",
      type: "array",
      group: "codeExamples",
      of: [defineArrayMember({ type: "codeExample" })],
      validation: (Rule) => Rule.min(1).error("Add at least one code example"),
    }),

    // ---- CTA ----
    defineField({
      name: "cta",
      title: "Call To Action",
      type: "cta",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),

    // ---- Settings ----
    defineField({
      name: "technologies",
      title: "Tech Stack",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "technology" })],
    }),
    defineField({
      name: "faqs",
      title: "FAQ",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "faq" })],
    }),
    defineField({
      name: "relatedServices",
      title: "Related Services",
      type: "array",
      group: "settings",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "offering" }],
          options: {
            filter: ({ document }: any) => ({
              filter: "_id != $id",
              params: { id: document?._id?.replace("drafts.", "") },
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    // ---- SEO ----
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "heroImage",
      method: "endpoints.0.method",
      url: "endpoints.0.url",
    },
    prepare({ title, category, media, method, url }) {
      const endpoint = [method, url].filter(Boolean).join(" ");
      return {
        title,
        subtitle: [category, endpoint].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});