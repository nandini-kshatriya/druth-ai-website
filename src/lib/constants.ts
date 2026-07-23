export const NAV_LINKS = [
  { label: "Case Studies", href: "#case-studies" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "#blog" },
  { label: "Open Source", href: "#open-source" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
] as const;

export const HERO_CONTENT = {
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