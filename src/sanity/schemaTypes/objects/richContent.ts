import { defineType, defineArrayMember } from "sanity";

export const richContent = defineType({
  name: "richContent",
  title: "Rich Content",
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
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code Block",
      fields: [
        { name: "language", type: "string", title: "Language", initialValue: "typescript" },
        { name: "filename", type: "string", title: "Filename (optional)" },
        { name: "code", type: "text", title: "Code", rows: 10 },
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "table",
      title: "Table",
      fields: [
        {
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            {
              type: "object",
              name: "row",
              fields: [
                {
                  name: "cells",
                  title: "Cells",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineArrayMember({ type: "callout" }),
    defineArrayMember({ type: "quoteBlock" }),
  ],
});
