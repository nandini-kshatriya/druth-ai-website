import { defineType, defineField } from "sanity";

export const socialShare = defineType({
  name: "socialShare",
  title: "Share Settings",
  type: "object",
  fields: [
    defineField({
      name: "enableShare",
      title: "Enable Share Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableCopyLink",
      title: "Enable Copy Link",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableXShare",
      title: "Enable Share on X",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableLinkedInShare",
      title: "Enable Share on LinkedIn",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Optional override — frontend defaults to the post's own URL if left blank",
    }),
    defineField({
      name: "shareTitle",
      title: "Share Title",
      type: "string",
      description: "Optional override for the title used when sharing",
    }),
    defineField({
      name: "shareDescription",
      title: "Share Description",
      type: "text",
      rows: 2,
    }),
  ],
});