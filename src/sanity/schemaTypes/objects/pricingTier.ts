import { defineType, defineField, defineArrayMember } from "sanity";

export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing Tier",
  type: "object",
  fields: [
    defineField({
      name: "planName",
      title: "Plan Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. '$0.008' or 'Custom'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "billingUnit",
      title: "Billing Unit",
      type: "string",
      description: "e.g. 'query', 'month'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted Toggle",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "planName", subtitle: "price" },
  },
});