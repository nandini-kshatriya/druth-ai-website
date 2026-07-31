import { defineType, defineField } from "sanity";

export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Author Role / Title",
      type: "string",
    }),
    defineField({
      name: "highlightStyle",
      title: "Highlight Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Accent (large, colored)", value: "accent" },
          { title: "Large statement", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: { title: "quote", subtitle: "author" },
  },
});