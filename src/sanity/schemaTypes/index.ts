import { type SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { author } from "./objects/author";
import { category } from "./objects/category";
import { quoteBlock } from "./objects/quoteBlock";
import { callout } from "./objects/callout";
import { metric } from "./objects/metric";
import { technology } from "./objects/technology";
import { timelineItem } from "./objects/timelineItem";
import { cta } from "./objects/cta";
import { projectDetails } from "./objects/projectDetails";
import { richContent } from "./objects/richContent";
import { pageSection, pageSectionRelatedTypes } from "./objects/pageSection";

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
    // Shared objects
    seo,
    quoteBlock,
    callout,
    metric,
    technology,
    timelineItem,
    cta,
    projectDetails,
    richContent,
    pageSection,
    ...pageSectionRelatedTypes,
  ],
};