import { defineType, defineField } from "sanity";

export const download = defineType({
  name: "download",
  title: "Download",
  type: "object",
  fields: [
    defineField({
      name: "enableDownload",
      title: "Enable Download",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "paperPdf",
      title: "Paper PDF",
      type: "file",
    }),
    defineField({
      name: "supplementaryMaterial",
      title: "Supplementary Material",
      type: "file",
    }),
    defineField({
      name: "datasetLink",
      title: "Dataset Link",
      type: "url",
    }),
    defineField({
      name: "githubRepo",
      title: "GitHub Repository",
      type: "url",
    }),
    defineField({
      name: "arxivUrl",
      title: "ArXiv URL",
      type: "url",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "PDF Paper",
    }),
  ],
});