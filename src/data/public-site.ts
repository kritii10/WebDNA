export type MarketingFeature = {
  title: string;
  description: string;
  icon:
    | "brain"
    | "search"
    | "accessibility"
    | "gauge"
    | "sparkles"
    | "shield";
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  highlighted?: boolean;
  features: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const trustedMetrics = [
  { value: "10,000+", label: "Websites analyzed" },
  { value: "99%", label: "Customer satisfaction" },
  { value: "24/7", label: "AI monitoring" }
] as const;

export const companyLogos = [
  "Northstar Commerce",
  "Helio Health",
  "PulseStack",
  "Radian Cloud",
  "Mercury Legal",
  "Aster Labs"
] as const;

export const marketingFeatures: MarketingFeature[] = [
  {
    title: "AI Analysis",
    description:
      "Uncover structural issues, content gaps, and revenue blockers with a continuously learning audit engine.",
    icon: "brain"
  },
  {
    title: "SEO Insights",
    description:
      "Track indexation health, metadata quality, internal linking, and search visibility from one place.",
    icon: "search"
  },
  {
    title: "Accessibility Scanner",
    description:
      "Detect contrast issues, heading misuse, and assistive-tech friction before they impact users or compliance.",
    icon: "accessibility"
  },
  {
    title: "Performance Tracking",
    description:
      "Monitor Core Web Vitals and release-by-release regressions with actionable technical recommendations.",
    icon: "gauge"
  },
  {
    title: "UX Recommendations",
    description:
      "Surface conversion opportunities across navigation, forms, CTAs, and page structure with prioritized impact.",
    icon: "sparkles"
  },
  {
    title: "Security Review",
    description:
      "Spot exposed headers, outdated libraries, and trust-eroding security signals across your public site.",
    icon: "shield"
  }
];

export const comparisonRows = [
  {
    label: "Analysis Speed",
    traditional: "2-3 weeks of manual review",
    webdna: "Full AI audit in under 8 minutes"
  },
  {
    label: "Coverage",
    traditional: "Sample pages and static notes",
    webdna: "Sitewide monitoring across SEO, UX, performance, and accessibility"
  },
  {
    label: "Recommendations",
    traditional: "Generic PDF findings",
    webdna: "Prioritized fixes tied to revenue and user impact"
  },
  {
    label: "Visibility",
    traditional: "Point-in-time snapshot",
    webdna: "Always-on monitoring with real-time change detection"
  }
] as const;

export const aiSuggestions = [
  "Improve color contrast on pricing comparison tables for better readability.",
  "Reduce hero image transfer size to recover 0.6s of Largest Contentful Paint.",
  "Rewrite meta descriptions on solution pages to lift click-through rate.",
  "Increase CTA visibility on mobile by shortening the sticky announcement bar.",
  "Fix heading hierarchy on product detail pages to strengthen accessibility semantics."
] as const;

export const stats = [
  { value: 50000, suffix: "+", label: "Reports Generated" },
  { value: 95, suffix: "%", label: "Average Accuracy" },
  { value: 120, suffix: "+", label: "Countries" },
  { value: 49, suffix: "/10", label: "Customer Rating" }
] as const;

export const testimonials: Testimonial[] = [
  {
    name: "Maya Chen",
    role: "VP of Growth",
    company: "Northstar Commerce",
    quote:
      "WebDNA gave our team a shared source of truth for performance, UX, and SEO. We shipped higher-confidence improvements in the first week.",
    initials: "MC"
  },
  {
    name: "Daniel Ortiz",
    role: "Head of Digital",
    company: "Helio Health",
    quote:
      "The AI suggestions are sharp, specific, and actually useful. It feels like having a technical strategist and CRO analyst in the room.",
    initials: "DO"
  },
  {
    name: "Priya Raman",
    role: "Director of Web Experience",
    company: "PulseStack",
    quote:
      "We replaced disconnected audit tools with one elegant workflow. The product helped us prioritize fixes that materially improved conversion quality.",
    initials: "PR"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$49",
    description: "For lean teams auditing a single brand site.",
    features: [
      "1 website workspace",
      "Weekly AI website scans",
      "Core SEO and accessibility insights",
      "Performance monitoring",
      "Email summaries"
    ]
  },
  {
    name: "Pro",
    price: "$149",
    description: "For growth teams that need deeper intelligence and collaboration.",
    highlighted: true,
    features: [
      "5 website workspaces",
      "Daily AI monitoring",
      "Conversion and UX recommendations",
      "Advanced reporting and trends",
      "Team collaboration"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-brand organizations with governance and scale needs.",
    features: [
      "Unlimited workspaces",
      "Custom crawl rules",
      "Priority support and onboarding",
      "Security and governance controls",
      "Dedicated success manager"
    ]
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "How does WebDNA analyze a website?",
    answer:
      "WebDNA combines technical crawling, page experience signals, content intelligence, and behavioral heuristics to produce prioritized recommendations."
  },
  {
    question: "Can I monitor multiple domains?",
    answer:
      "Yes. Pro and Enterprise plans support multiple workspaces, making it easy to compare brands, locales, or product lines."
  },
  {
    question: "Is this only for SEO teams?",
    answer:
      "No. WebDNA is designed for growth, design, product marketing, engineering, and accessibility stakeholders who need a shared operating view."
  },
  {
    question: "Do I need to install anything on my site?",
    answer:
      "No implementation is required for the core audit experience. Teams can optionally connect analytics or release data for deeper context."
  }
] as const;

export const authHighlights = [
  "Spot conversion blockers before they become revenue leaks.",
  "Track SEO, performance, and accessibility in one premium workspace.",
  "Turn AI recommendations into a faster, more focused optimization cycle."
] as const;
