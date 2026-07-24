import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Recommended: under 60 characters",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Recommended: under 160 characters",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});