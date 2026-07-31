import { defineType, defineField } from "sanity";

export const timelineItem = defineType({
  name: "timelineItem",
  title: "Timeline Item",
  type: "object",
  fields: [
    defineField({
      name: "phase",
      title: "Phase / Date Label",
      type: "string",
      description: "e.g. 'Week 1–2', 'Phase 1: Discovery'",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name — optional",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "phase" },
  },
});