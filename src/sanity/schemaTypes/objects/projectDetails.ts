import { defineType, defineField, defineArrayMember } from "sanity";

export const projectDetails = defineType({
  name: "projectDetails",
  title: "Project Details",
  type: "object",
  fields: [
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "companySize", title: "Company Size", type: "string" }),
    defineField({ name: "timeline", title: "Timeline", type: "string", description: "e.g. '8 weeks'" }),
    defineField({ name: "deployment", title: "Deployment", type: "string", description: "e.g. 'AWS, Serverless'" }),
    defineField({ name: "teamSize", title: "Team Size", type: "string" }),
    defineField({ name: "useCase", title: "Use Case", type: "string" }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "engagementModel", title: "Engagement Model", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
          { title: "Ongoing", value: "ongoing" },
        ],
      },
    }),
    defineField({
      name: "additionalInfo",
      title: "Additional Information",
      type: "array",
      description: "Extra key/value pairs for anything not covered above",
      of: [
        defineArrayMember({
          type: "object",
          name: "infoItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
  ],
});