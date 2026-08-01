import { defineType, defineField } from "sanity";

export const researchAuthor = defineType({
  name: "researchAuthor",
  title: "Research Author",
  type: "object",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role for this paper",
      type: "string",
      description: "e.g. 'Research Scientist', 'Principal Scientist'",
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
      initialValue: "Druth AI Research",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isCorresponding",
      title: "Corresponding Author",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author.name", subtitle: "role" },
  },
});