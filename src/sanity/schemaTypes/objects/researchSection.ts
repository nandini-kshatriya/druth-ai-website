import { defineType, defineField } from "sanity";

export const researchSection = defineType({
  name: "researchSection",
  title: "Research Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "slug",
      options: {
        source: (_doc: any, context: any) => context.parent?.title,
        maxLength: 60,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Portable Text Content",
      type: "researchContent",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});