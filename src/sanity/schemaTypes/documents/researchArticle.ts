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
    name: "researchCategory",
    title: "Research Category",
    type: "reference",
    to: [{ type: "category" }],
    group: "hero",
  }),
  defineField({
    name: "featuredBadge",
    title: "Featured Badge (optional)",
    type: "string",
    group: "hero",
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
    name: "abstract",
    title: "Abstract",
    type: "text",
    rows: 4,
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "publishedAt",
    title: "Published Date",
    type: "datetime",
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "readTime",
    title: "Read Time",
    type: "readingTime",
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "citation",
    title: "Citation Count",
    type: "citation",
    group: "hero",
  }),
  defineField({
    name: "featured",
    title: "Featured Research Toggle",
    type: "boolean",
    initialValue: false,
    group: "hero",
  }),
];

export const researchArticle = defineType({
  name: "researchArticle",
  title: "Research Article",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "authors", title: "Authors" },
    { name: "metadata", title: "Research Metadata" },
    { name: "downloads", title: "Downloads" },
    { name: "sharing", title: "Sharing" },
    { name: "references", title: "References" },
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
      description:
        "Drag to reorder. Powers the sticky table of contents automatically.",
      of: [defineArrayMember({ type: "researchSection" })],
      validation: (Rule) => Rule.min(1).error("Add at least one section"),
    }),

    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      group: "authors",
      of: [defineArrayMember({ type: "researchAuthor" })],
      validation: (Rule) => Rule.min(1).error("Add at least one author"),
    }),

    defineField({
      name: "download",
      title: "Download",
      type: "download",
      group: "downloads",
    }),

    defineField({
      name: "share",
      title: "Share Settings",
      type: "socialShare",
      group: "sharing",
    }),

    defineField({
      name: "references",
      title: "References",
      type: "array",
      group: "references",
      of: [defineArrayMember({ type: "citationReference" })],
    }),

    defineField({
      name: "relatedResearch",
      title: "Related Research",
      type: "array",
      group: "settings",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "researchArticle" }],
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
      title: "Research Tags",
      type: "array",
      group: "settings",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
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
      category: "researchCategory.title",
      media: "heroImage",
      publishedAt: "publishedAt",
      citationCount: "citation.count",
    },
    prepare({ title, category, media, publishedAt, citationCount }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "";
      const cited = citationCount ? `${citationCount} cited` : "";
      return {
        title,
        subtitle: [category, date, cited].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});