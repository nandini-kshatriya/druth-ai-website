import { defineType, defineField, defineArrayMember } from "sanity";

const challengeBlock = defineType({
  name: "challengeBlock",
  title: "Challenge Block",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "richText", title: "Rich Text", type: "richContent" }),
  ],
  preview: { select: { title: "heading" } },
});

const solutionBlock = defineType({
  name: "solutionBlock",
  title: "Solution Block",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "richText", title: "Rich Text", type: "richContent" }),
    defineField({
      name: "diagramImage",
      title: "Diagram Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "heading" } },
});

const resultBlock = defineType({
  name: "resultBlock",
  title: "Result Block",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "richText", title: "Rich Text", type: "richContent" }),
    defineField({
      name: "quote",
      title: "Quote (optional)",
      type: "quoteBlock",
    }),
  ],
  preview: { select: { title: "heading" } },
});

const SECTION_TYPES = [
  "Challenge",
  "Solution",
  "Results",
  "Timeline",
  "Architecture",
  "Implementation",
  "Technology",
  "Lessons Learned",
  "Outcome",
  "Custom",
];

export const pageSection = defineType({
  name: "pageSection",
  title: "Page Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionType",
      title: "Section Type",
      type: "string",
      options: {
        list: SECTION_TYPES.map((v) => ({ title: v, value: v })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "slug",
      description: "Used for the sticky Contents sidebar + jump links",
      options: {
        source: (_doc: any, context: any) => context.parent?.title,
        maxLength: 60,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Portable Text Content",
      type: "richContent",
    }),
    defineField({
      name: "image",
      title: "Optional Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Optional Quote",
      type: "quoteBlock",
    }),
    defineField({
      name: "callout",
      title: "Optional Callout",
      type: "callout",
    }),
    defineField({
      name: "showDivider",
      title: "Show Divider After Section",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Soft (subtle panel)", value: "soft" },
          { title: "Accent tint", value: "accent" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "twoColumnLayout",
      title: "Two Column Layout",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "fullWidthLayout",
      title: "Full Width Layout",
      type: "boolean",
      initialValue: false,
    }),

    // Type-specific block arrays — shown/hidden in Studio based on sectionType
    defineField({
      name: "challengeBlocks",
      title: "Challenge Blocks",
      type: "array",
      of: [defineArrayMember({ type: "challengeBlock" })],
      hidden: ({ parent }) => parent?.sectionType !== "Challenge",
    }),
    defineField({
      name: "solutionBlocks",
      title: "Solution Blocks",
      type: "array",
      of: [defineArrayMember({ type: "solutionBlock" })],
      hidden: ({ parent }) => parent?.sectionType !== "Solution",
    }),
    defineField({
      name: "resultBlocks",
      title: "Result Blocks",
      type: "array",
      of: [defineArrayMember({ type: "resultBlock" })],
      hidden: ({ parent }) => parent?.sectionType !== "Results",
    }),
    defineField({
      name: "timelineItems",
      title: "Timeline Items",
      type: "array",
      of: [defineArrayMember({ type: "timelineItem" })],
      hidden: ({ parent }) => parent?.sectionType !== "Timeline",
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "technology" })],
      hidden: ({ parent }) => parent?.sectionType !== "Technology",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sectionType" },
  },
});

export const pageSectionRelatedTypes = [
  challengeBlock,
  solutionBlock,
  resultBlock,
];