import { type SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { author } from "./objects/author";
import { category } from "./objects/category";

import { post } from "./documents/post";
import { researchArticle } from "./documents/researchArticle";
import { caseStudy } from "./documents/caseStudy";
import { offering } from "./documents/offering";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    post,
    researchArticle,
    caseStudy,
    offering,
    author,
    category,
    // Objects
    seo,
  ],
};