import { defineType, defineField } from "sanity";

export const codeExample = defineType({
  name: "codeExample",
  title: "Code Example",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: ["curl", "TypeScript", "Python", "Go", "JavaScript"].map((v) => ({
          title: v,
          value: v,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "filename",
      title: "Filename (optional)",
      type: "string",
    }),
    defineField({
      name: "requestCode",
      title: "Request Code",
      type: "text",
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "responseCode",
      title: "Response Code",
      type: "text",
      rows: 10,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "language" },
  },
});