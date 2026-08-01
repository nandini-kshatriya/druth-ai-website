import { defineType, defineArrayMember } from "sanity";

export const researchContent = defineType({
  name: "researchContent",
  title: "Research Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          { name: "link", type: "object", title: "Link", fields: [{ name: "href", type: "url", title: "URL" }] },
        ],
      },
    }),
    defineArrayMember({ type: "researchFigure" }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code Block",
      fields: [
        { name: "language", type: "string", title: "Language", initialValue: "python" },
        { name: "filename", type: "string", title: "Filename (optional)" },
        { name: "code", type: "text", title: "Code", rows: 10 },
        { name: "highlightedLines", type: "string", title: "Highlighted Lines", description: "e.g. '3,7-9'" },
      ],
      preview: { select: { title: "filename", subtitle: "language" } },
    }),
    defineArrayMember({
      type: "object",
      name: "table",
      title: "Table",
      fields: [
        { name: "caption", type: "string", title: "Caption" },
        {
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              name: "row",
              fields: [{ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] }],
            },
          ],
        },
      ],
      preview: { select: { title: "caption" } },
    }),
    defineArrayMember({ type: "equation" }),
    defineArrayMember({ type: "callout" }),
    defineArrayMember({ type: "quoteBlock" }),
  ],
});