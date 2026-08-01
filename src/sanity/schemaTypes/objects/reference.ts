import { defineType, defineField } from "sanity";

export const citationReference = defineType({
  name: "citationReference",
  title: "Reference",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "authors", title: "Authors", type: "string", description: "e.g. 'Smith, J., Doe, A.'" }),
    defineField({ name: "publication", title: "Publication", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "doi", title: "DOI", type: "string" }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({ name: "citationText", title: "Full Citation Text", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});