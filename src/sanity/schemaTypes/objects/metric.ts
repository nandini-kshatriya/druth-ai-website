import { defineType, defineField } from "sanity";

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. '62%', '200+', '4.8★'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. 'Reduction in manual research time'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description:
        "Lucide icon name (e.g. 'clock', 'layers', 'star') — optional, frontend maps this to a real icon",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Accent (green)", value: "accent" },
          { title: "White", value: "white" },
          { title: "Muted", value: "muted" },
        ],
      },
      initialValue: "accent",
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});