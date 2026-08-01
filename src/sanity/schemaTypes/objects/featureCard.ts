import { defineType, defineField } from "sanity";

export const featureCard = defineType({
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name — optional",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});