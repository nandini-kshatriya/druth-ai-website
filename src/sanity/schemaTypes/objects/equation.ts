import { defineType, defineField } from "sanity";

export const equation = defineType({
  name: "equation",
  title: "Equation",
  type: "object",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX / KaTeX Source",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "description", subtitle: "latex" },
  },
});