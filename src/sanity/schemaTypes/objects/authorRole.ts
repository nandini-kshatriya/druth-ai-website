import { defineType, defineField } from "sanity";

export const authorRole = defineType({
  name: "authorRole",
  title: "Author with Role",
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
      title: "Role for this article",
      type: "string",
      description: "e.g. 'AI Engineer', 'Research Scientist' — overrides the author's default role for this post",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "author.name", subtitle: "role" },
  },
});