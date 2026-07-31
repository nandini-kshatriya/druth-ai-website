import { defineType, defineField } from "sanity";

export const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Technology Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Language",
          "Framework",
          "Database",
          "Infrastructure",
          "AI/ML",
          "API",
          "DevOps",
          "Other",
        ].map((v) => ({ title: v, value: v })),
      },
    }),
    defineField({
      name: "website",
      title: "Official Website",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "logo" },
  },
});