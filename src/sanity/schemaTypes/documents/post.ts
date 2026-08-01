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
    name: "featuredBadge",
    title: "Featured Badge (optional)",
    type: "string",
    group: "hero",
  }),
  defineField({
    name: "heroIllustration",
    title: "Hero Illustration (optional)",
    type: "image",
    options: { hotspot: true },
    group: "hero",
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
    name: "excerpt",
    title: "Excerpt",
    type: "text",
    rows: 3,
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
    title: "Reading Time",
    type: "readingTime",
    group: "hero",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "featured",
    title: "Featured Article Toggle",
    type: "boolean",
    initialValue: false,
    group: "hero",
  }),
];

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "authors", title: "Authors" },
    { name: "sharing", title: "Sharing" },
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
      of: [defineArrayMember({ type: "articleSection" })],
      validation: (Rule) => Rule.min(1).error("Add at least one section"),
    }),

    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      group: "authors",
      of: [defineArrayMember({ type: "authorRole" })],
      validation: (Rule) => Rule.min(1).error("Add at least one author"),
    }),

    defineField({
      name: "share",
      title: "Share Settings",
      type: "socialShare",
      group: "sharing",
    }),

    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      group: "settings",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
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
      media: "featuredImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, category, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "";
      return {
        title,
        subtitle: [category, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});