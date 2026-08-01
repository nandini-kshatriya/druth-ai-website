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

import { readingTime } from "./objects/readingTime";
import { authorRole } from "./objects/authorRole";
import { socialShare } from "./objects/socialShare";
import { articleSection } from "./objects/articleSection";

import { researchFigure } from "./objects/researchFigure";
import { equation } from "./objects/equation";
import { researchContent } from "./objects/researchContent";
import { researchSection } from "./objects/researchSection";
import { researchAuthor } from "./objects/researchAuthor";
import { citation } from "./objects/citation";
import { download } from "./objects/download";
import { citationReference } from "./objects/reference";

import { endpoint } from "./objects/endpoint";
import { codeExample } from "./objects/codeExample";
import { pricingTier } from "./objects/pricingTier";
import { featureCard } from "./objects/featureCard";
import { faq } from "./objects/faq";
import { apiParameter } from "./objects/apiParameter";
import { responseField } from "./objects/responseField";

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
    readingTime,
    authorRole,
    socialShare,
    articleSection,
    researchFigure,
    equation,
    researchContent,
    researchSection,
    researchAuthor,
    citation,
    download,
    citationReference,
    endpoint,
    codeExample,
    pricingTier,
    featureCard,
    faq,
    apiParameter,
    responseField,
  ],
};