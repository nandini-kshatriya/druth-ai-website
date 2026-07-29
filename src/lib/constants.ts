export const NAV_LINKS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Open Source", href: "#open-source" },
  { label: "Solutions", href: "/offerings" },
  { label: "About", href: "#about" },
] as const;

/*export const HERO_CONTENT = {
  eyebrow: "PRODUCTION-GRADE AI SYSTEMS -- EST. 2022",
  headlineLines: [
    { text: "We build AI", accent: false },
    { text: "systems", accent: true },
    { text: "that actually", accent: false },
    { text: "work.", accent: false },
  ],
  paragraph:
    "Druth AI is a research-driven AI engineering company. We build agents, fine-tuned models, memory architectures and the infrastructure that makes them production-ready.",
  ctaPrimary: "View Case Studies",
  ctaSecondary: "Talk To Us",
  scrollLabel: "Scroll to explore",
};*/
export const HERO_CONTENT = {
  headline: "We build AI ",
  headlineAccent: "systems",
  headlineEnd: " that actually work.",
  paragraph:
    "Druth AI is a research-driven AI engineering company. We build agents, fine-tuned models, memory architectures and the infrastructure that makes them production-ready.",
  ctaPrimary: "View Case Studies",
  ctaSecondary: "Talk To Us",
  scrollLabel: "Scroll to explore",
};

export const WHAT_WE_BUILD = {
  eyebrow: "WHAT WE BUILD",
  heading: "End-to-end AI systems that scale.",
  paragraph:
    "From intelligent agents to scalable infrastructure, we design, build, and ship systems that perform in the real world.",
  items: [
    {
      title: "AI Agents",
      description: "Autonomous agents that reason, plan, and act.",
    },
    {
      title: "Model Systems",
      description: "Fine-tuned models and custom architectures.",
    },
    {
      title: "Memory Layers",
      description: "Long-term memory systems that learn and adapt.",
    },
    {
      title: "Infrastructure",
      description: "Scalable, secure, and production-ready infra.",
    },
  ],
};
export const BUILT_LIKE_CODE = {
  eyebrow: "OUR APPROACH",
  heading: "Built like code.\nDeployed like infra.",
  paragraph:
    "We combine cutting-edge research with engineering discipline to deliver systems that are robust, reliable, and ready for real-world impact.",
  checklist: [
    "Research-driven engineering",
    "Production-first mindset",
    "Open source at our core",
  ],
  codeLines: [
    { text: "// Build intelligent systems", type: "comment" },
    { text: "// that make an impact", type: "comment" },
    { text: "", type: "blank" },
    { text: "import druth", type: "keyword" },
    { text: "", type: "blank" },
    { text: "system = druth.build({", type: "code" },
    { text: '    agents: true,', type: "code" },
    { text: '    models: "custom",', type: "code" },
    { text: '    memory: "long_term",', type: "code" },
    { text: '    infrastructure: "production"', type: "code" },
    { text: "})", type: "code" },
    { text: "", type: "blank" },
    { text: "system.deploy()", type: "code" },
    { text: "// AI systems that actually work.", type: "comment" },
  ],
};
export const CONTACT_CONTENT = {
  eyebrow: "CONTACT",
  headingLines: [
    { text: "Let's build something", accent: false },
    { text: "exceptional", accent: true },
    { text: "together.", accent: false },
  ],
  paragraph:
    "Whether you're launching an AI product, need a production-grade agent, or want to fine-tune a model for your domain — we respond within 24 hours.",
  email: "hello@druthai.com",
  office: "Hyderabad, IN",
  hours: "Mon–Fri, 9AM–6PM IST",
  budgetOptions: [
    "Select a range",
    "$10k – $25k",
    "$25k – $50k",
    "$50k – $100k",
    "$100k+",
  ],
};

export const BLOG_CATEGORIES = [
  "All Articles",
  "Engineering",
  "Infrastructure",
  "AI Systems",
  "Research",
  "Case Studies",
  "Announcements",
];
export const CASE_STUDY_FILTERS = [
  "All",
  "RAG Systems",
  "Agents",
  "Fine-Tuning",
  "Infrastructure",
  "Research Automation",
  "Inference Cost",
];

export const FOOTER_LINKS = {
  platform: ["AI Agents", "Model Systems", "Memory Layers", "Infrastructure"],
  useCases: ["Autonomous Workflows", "Fine-Tuning", "RAG Systems", "Evals"],
  resources: ["Blog", "Docs", "Research", "Case Studies"],
  company: ["About", "Careers", "Contact Us", "Agency"],
  community: ["X", "GitHub", "Discord", "LinkedIn"],
};