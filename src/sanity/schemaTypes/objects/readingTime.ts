import { defineType, defineField } from "sanity";

export const readingTime = defineType({
  name: "readingTime",
  title: "Reading Time",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      options: {
        list: [{ title: "Minutes", value: "minutes" }],
      },
      initialValue: "minutes",
    }),
  ],
});