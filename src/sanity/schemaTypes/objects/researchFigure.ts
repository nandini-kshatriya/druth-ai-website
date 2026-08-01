import { defineType, defineField } from "sanity";

export const researchFigure = defineType({
  name: "researchFigure",
  title: "Figure",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "number",
      title: "Figure Number",
      type: "string",
      description: "e.g. '1', '2a'",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "number", media: "image" },
  },
});