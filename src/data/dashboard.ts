import type {
  ActivityItem,
  AISuggestion,
  KPI,
  NotificationItem,
  ReportSummary,
  TrafficPoint
} from "@/types/dashboard";

export const dashboardKpis: KPI[] = [
  {
    id: "visibility",
    label: "Search Visibility",
    value: "74.8%",
    change: "+8.2%",
    direction: "up",
    detail: "Momentum improved across high-intent landing pages."
  },
  {
    id: "conversions",
    label: "Conversion Lift",
    value: "18.4%",
    change: "+2.6%",
    direction: "up",
    detail: "CTA and form optimization are compounding this month."
  },
  {
    id: "bounce",
    label: "Bounce Reduction",
    value: "12.1%",
    change: "-1.1%",
    direction: "down",
    detail: "Session quality improved after navigation simplification."
  },
  {
    id: "revenue",
    label: "Pipeline Influence",
    value: "$248K",
    change: "+14.9%",
    direction: "up",
    detail: "Assisted revenue is rising on product comparison pages."
  }
];

export const trafficOverview: TrafficPoint[] = [
  { name: "Jan", organic: 6200, paid: 2400, conversions: 490 },
  { name: "Feb", organic: 6800, paid: 2600, conversions: 520 },
  { name: "Mar", organic: 7600, paid: 2900, conversions: 610 },
  { name: "Apr", organic: 8100, paid: 3400, conversions: 680 },
  { name: "May", organic: 9300, paid: 3600, conversions: 760 },
  { name: "Jun", organic: 10100, paid: 3900, conversions: 840 }
];

export const reports: ReportSummary[] = [
  {
    id: "r-001",
    title: "Technical SEO Health",
    status: "Ready",
    score: 91,
    updatedAt: "2026-06-26T10:00:00.000Z",
    owner: "Platform AI"
  },
  {
    id: "r-002",
    title: "Conversion Journey Analysis",
    status: "Needs Review",
    score: 83,
    updatedAt: "2026-06-26T08:30:00.000Z",
    owner: "Growth Team"
  },
  {
    id: "r-003",
    title: "Content Gap Intelligence",
    status: "Processing",
    score: 76,
    updatedAt: "2026-06-26T07:20:00.000Z",
    owner: "Search Ops"
  }
];

export const activityFeed: ActivityItem[] = [
  {
    id: "a-001",
    title: "Navigation friction detected",
    description: "Users are looping between pricing and comparison pages before converting.",
    createdAt: "2026-06-26T09:40:00.000Z",
    category: "Insight"
  },
  {
    id: "a-002",
    title: "Hero copy experiment outperformed baseline",
    description: "Value-led messaging increased engagement by 12.4% on mobile traffic.",
    createdAt: "2026-06-26T08:10:00.000Z",
    category: "Optimization"
  },
  {
    id: "a-003",
    title: "Core Web Vitals volatility",
    description: "LCP regressed for image-heavy pages in the last deployment window.",
    createdAt: "2026-06-26T06:55:00.000Z",
    category: "Alert"
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "n-001",
    title: "Weekly executive summary is ready",
    body: "The leadership snapshot now includes attribution shifts and new revenue influence trends.",
    createdAt: "2026-06-26T10:15:00.000Z",
    unread: true
  },
  {
    id: "n-002",
    title: "3 pages lost ranking positions",
    body: "Competitor movement and metadata gaps are the highest-likelihood drivers.",
    createdAt: "2026-06-26T09:05:00.000Z",
    unread: true
  },
  {
    id: "n-003",
    title: "AI crawl completed",
    body: "A fresh technical audit is available with schema, performance, and accessibility signals.",
    createdAt: "2026-06-25T18:30:00.000Z",
    unread: false
  }
];

export const aiSuggestions: AISuggestion[] = [
  {
    id: "s-001",
    title: "Rebuild the pricing comparison introduction",
    summary:
      "Lead with differentiated outcomes and shorten the first block to reduce cognitive load for high-intent visitors.",
    impact: "High",
    confidence: 0.94
  },
  {
    id: "s-002",
    title: "Consolidate overlapping blog clusters",
    summary:
      "Five articles compete for similar intent. Merge them into one authority page and strengthen internal linking.",
    impact: "Medium",
    confidence: 0.88
  },
  {
    id: "s-003",
    title: "Delay non-critical scripts on solution pages",
    summary:
      "Deferring secondary widgets is likely to recover lost LCP performance without affecting engagement depth.",
    impact: "High",
    confidence: 0.91
  }
];
