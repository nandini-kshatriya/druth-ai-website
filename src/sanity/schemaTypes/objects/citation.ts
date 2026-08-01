import { defineType, defineField } from "sanity";

export const citation = defineType({
  name: "citation",
  title: "Citation Count",
  type: "object",
  fields: [
    defineField({
      name: "count",
      title: "Times Cited",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
});