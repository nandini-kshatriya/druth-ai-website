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
    name: "clientName",
    title: "Client Name",
    type: "string",
    group: "hero",
  }),
  defineField({
    name: "industry",
    title: "Industry",
    type: "string",
    group: "hero",
  }),
  defineField({
    name: "serviceCategory",
    title: "Service Category",
    type: "string",
    description: "Used for the filter pills on the listing page (e.g. 'RAG Systems', 'Agents')",
    group: "hero",
  }),
  defineField({
    name: "featuredBadge",
    title: "Featured Badge",
    type: "string",
    description: "Small label shown on the card, e.g. 'Internal Engineering Project'",
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
    name: "featuredImage",
    title: "Featured Image",
    type: "image",
    options: { hotspot: true },
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "readingTime",
    title: "Reading Time (minutes)",
    type: "number",
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
    name: "author",
    title: "Author",
    type: "reference",
    to: [{ type: "author" }],
    group: "hero",
  }),
  defineField({
    name: "featured",
    title: "Featured Toggle",
    type: "boolean",
    description: "Show this case study in the 'Featured Projects' section",
    initialValue: false,
    group: "hero",
  }),
];

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "results", title: "Results" },
    { name: "projectDetails", title: "Project Details" },
    { name: "technology", title: "Technology" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    ...heroFields,

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      description: "Drag to reorder. Powers the sticky Contents sidebar automatically.",
      of: [defineArrayMember({ type: "pageSection" })],
      validation: (Rule) => Rule.min(1).error("Add at least one section"),
    }),

    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      group: "results",
      description: "KPI cards shown directly below the hero",
      of: [defineArrayMember({ type: "metric" })],
      validation: (Rule) => Rule.min(1).error("Add at least one metric"),
    }),

    defineField({
      name: "projectDetails",
      title: "Project Details",
      type: "projectDetails",
      group: "projectDetails",
    }),

    defineField({
      name: "technologies",
      title: "Technology Stack",
      type: "array",
      group: "technology",
      of: [defineArrayMember({ type: "technology" })],
    }),

    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",
      group: "settings",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "caseStudy" }],
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
      name: "categories",
      title: "Categories",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    defineField({
      name: "cta",
      title: "Call To Action",
      type: "cta",
      group: "settings",
    }),

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
      clientName: "clientName",
      industry: "industry",
      media: "featuredImage",
    },
    prepare({ title, clientName, industry, media }) {
      return {
        title,
        subtitle: [clientName, industry].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});