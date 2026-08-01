import { defineType, defineField, defineArrayMember } from "sanity";

export const articleSection = defineType({
  name: "articleSection",
  title: "Article Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "slug",
      description: "Used for the sticky Contents sidebar + jump links",
      options: {
        source: (_doc: any, context: any) => context.parent?.title,
        maxLength: 60,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Portable Text Content",
      type: "richContent",
    }),
    defineField({
      name: "image",
      title: "Optional Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Optional Quote",
      type: "quoteBlock",
    }),
    defineField({
      name: "callout",
      title: "Optional Callout",
      type: "callout",
    }),
    defineField({
      name: "showDivider",
      title: "Show Divider After Section",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});