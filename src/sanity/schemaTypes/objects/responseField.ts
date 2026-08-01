import { defineType, defineField } from "sanity";

export const responseField = defineType({
  name: "responseField",
  title: "Response Field",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "type", title: "Type", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "name", subtitle: "type" },
  },
});