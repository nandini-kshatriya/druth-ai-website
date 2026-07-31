import { defineType, defineField } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call To Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Start a Project",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryButtonText",
      title: "Primary Button Text",
      type: "string",
      initialValue: "Work With Us",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Primary Button Link",
      type: "string",
      description: "Internal path (e.g. /#contact) or full URL",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "More Case Studies",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Secondary Button Link",
      type: "string",
      initialValue: "/case-studies",
    }),
  ],
});
