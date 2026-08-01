import { defineType, defineField } from "sanity";

export const endpoint = defineType({
  name: "endpoint",
  title: "Endpoint",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Endpoint Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "method",
      title: "HTTP Method",
      type: "string",
      options: {
        list: ["GET", "POST", "PUT", "PATCH", "DELETE"].map((v) => ({ title: v, value: v })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Endpoint URL",
      type: "string",
      description: "e.g. '/v1/rag/query'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Retrieval",
          "Embedding",
          "Memory",
          "Reranking",
          "Generation",
          "SQL",
          "Agents",
          "Search",
        ].map((v) => ({ title: v, value: v })),
      },
    }),
  ],
  preview: {
    select: { title: "url", subtitle: "method" },
  },
});