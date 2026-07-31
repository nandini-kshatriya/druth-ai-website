import { defineType, defineField } from "sanity";

export const callout = defineType({
  name: "callout",
  title: "Callout",
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
      rows: 3,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Info", value: "info" },
          { title: "Neutral", value: "neutral" },
        ],
        layout: "radio",
      },
      initialValue: "neutral",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "variant" },
  },
});