import { defineType, defineField } from "sanity";

export const apiParameter = defineType({
  name: "apiParameter",
  title: "API Parameter",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "type", title: "Type", type: "string", description: "e.g. 'string', 'number', 'boolean'" }),
    defineField({ name: "required", title: "Required", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "defaultValue", title: "Default Value", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "type" },
  },
});