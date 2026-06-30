import type {
  Achievement,
  AnalysisStep,
  DashboardMetric,
  DistributionPoint,
  HealthTrendPoint,
  HistoryRecord,
  PerformanceHistoryPoint,
  QuickAction,
  RecentSearch,
  RadarMetric,
  ReportIssue,
  ReportStrength,
  SavedReport,
  ScoreBreakdown,
  TimelineEvent,
  WorkspaceOption,
  WebsiteProject,
  WeeklyActivityPoint
} from "@/types/dashboard";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "websites",
    label: "Total Websites",
    value: "24",
    trend: "+3 this month",
    direction: "up",
    detail: "Active monitored properties across product, docs, and campaign surfaces."
  },
  {
    id: "reports",
    label: "Reports Generated",
    value: "1,284",
    trend: "+18.7%",
    direction: "up",
    detail: "Scheduled crawls, manual analyses, and shared snapshots combined."
  },
  {
    id: "score",
    label: "Average Website Score",
    value: "87.6",
    trend: "+4.2 pts",
    direction: "up",
    detail: "Weighted across performance, SEO, accessibility, trust, and UX signals."
  },
  {
    id: "issues",
    label: "Issues Fixed",
    value: "312",
    trend: "+28 this week",
    direction: "up",
    detail: "Resolved from AI-prioritized recommendations and engineering follow-through."
  },
  {
    id: "suggestions",
    label: "AI Suggestions",
    value: "64",
    trend: "12 high priority",
    direction: "up",
    detail: "New recommendations awaiting review across monitored workspaces."
  },
  {
    id: "projects",
    label: "Active Projects",
    value: "9",
    trend: "2 blocked",
    direction: "down",
    detail: "Cross-functional optimization initiatives currently in progress."
  }
];

export const websiteHealthTrend: HealthTrendPoint[] = [
  { period: "Jan", overall: 76, performance: 71, seo: 79, accessibility: 74 },
  { period: "Feb", overall: 79, performance: 75, seo: 81, accessibility: 77 },
  { period: "Mar", overall: 82, performance: 79, seo: 84, accessibility: 80 },
  { period: "Apr", overall: 84, performance: 82, seo: 86, accessibility: 83 },
  { period: "May", overall: 86, performance: 84, seo: 88, accessibility: 85 },
  { period: "Jun", overall: 88, performance: 87, seo: 90, accessibility: 86 }
];

export const performanceHistory: PerformanceHistoryPoint[] = [
  { period: "Week 1", lcp: 2.8, cls: 0.12, ttfb: 0.81 },
  { period: "Week 2", lcp: 2.5, cls: 0.1, ttfb: 0.73 },
  { period: "Week 3", lcp: 2.3, cls: 0.09, ttfb: 0.68 },
  { period: "Week 4", lcp: 2.1, cls: 0.08, ttfb: 0.61 },
  { period: "Week 5", lcp: 2.2, cls: 0.07, ttfb: 0.59 },
  { period: "Week 6", lcp: 2.0, cls: 0.06, ttfb: 0.54 }
];

export const seoDistribution: DistributionPoint[] = [
  { name: "Healthy", value: 58, fill: "#38bdf8" },
  { name: "Needs Attention", value: 27, fill: "#f59e0b" },
  { name: "Critical", value: 15, fill: "#fb7185" }
];

export const accessibilityTrend: HealthTrendPoint[] = [
  { period: "Jan", overall: 0, performance: 0, seo: 0, accessibility: 68 },
  { period: "Feb", overall: 0, performance: 0, seo: 0, accessibility: 71 },
  { period: "Mar", overall: 0, performance: 0, seo: 0, accessibility: 75 },
  { period: "Apr", overall: 0, performance: 0, seo: 0, accessibility: 79 },
  { period: "May", overall: 0, performance: 0, seo: 0, accessibility: 83 },
  { period: "Jun", overall: 0, performance: 0, seo: 0, accessibility: 86 }
];

export const websiteRadar: RadarMetric[] = [
  { subject: "Performance", current: 87, benchmark: 74 },
  { subject: "SEO", current: 91, benchmark: 79 },
  { subject: "Accessibility", current: 86, benchmark: 72 },
  { subject: "UX", current: 84, benchmark: 70 },
  { subject: "Security", current: 89, benchmark: 77 },
  { subject: "Design", current: 88, benchmark: 75 }
];

export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: "Mon", analyses: 14, fixes: 8 },
  { day: "Tue", analyses: 18, fixes: 11 },
  { day: "Wed", analyses: 16, fixes: 9 },
  { day: "Thu", analyses: 22, fixes: 14 },
  { day: "Fri", analyses: 20, fixes: 13 },
  { day: "Sat", analyses: 8, fixes: 5 },
  { day: "Sun", analyses: 6, fixes: 3 }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "t-001",
    title: "Checkout funnel report shared with Engineering",
    description: "Highlighted mobile CTA contrast, render-blocking script debt, and missing form labels.",
    createdAt: "2026-06-26T11:20:00.000Z",
    actor: "Maya Chen",
    type: "collaboration"
  },
  {
    id: "t-002",
    title: "Landing page hero image optimization deployed",
    description: "Recovered 0.5s LCP on global campaign pages after compressing background assets.",
    createdAt: "2026-06-26T09:10:00.000Z",
    actor: "Arjun Patel",
    type: "fix"
  },
  {
    id: "t-003",
    title: "Accessibility regression detected in pricing table",
    description: "New contrast issue appeared after yesterday's release. Severity escalated to design systems team.",
    createdAt: "2026-06-26T07:50:00.000Z",
    actor: "Platform AI",
    type: "alert"
  },
  {
    id: "t-004",
    title: "Technical SEO report generated for docs workspace",
    description: "Orphaned articles and canonical mismatches surfaced across multi-language content.",
    createdAt: "2026-06-25T18:05:00.000Z",
    actor: "Platform AI",
    type: "report"
  }
];

export const pinnedWebsites: WebsiteProject[] = [
  {
    id: "w-001",
    name: "Marketing Site",
    domain: "webdna.ai",
    score: 91,
    status: "Healthy",
    lastAnalysis: "12 minutes ago"
  },
  {
    id: "w-002",
    name: "Developer Docs",
    domain: "docs.webdna.ai",
    score: 84,
    status: "Watchlist",
    lastAnalysis: "1 hour ago"
  },
  {
    id: "w-003",
    name: "Enterprise Demo",
    domain: "demo.webdna.ai",
    score: 79,
    status: "Critical",
    lastAnalysis: "3 hours ago"
  }
];

export const favoriteReports: SavedReport[] = [
  {
    id: "rep-1001",
    title: "Homepage Conversion Health",
    website: "webdna.ai",
    score: 92,
    updatedAt: "Today, 10:12 AM"
  },
  {
    id: "rep-1002",
    title: "Docs Search Discovery Audit",
    website: "docs.webdna.ai",
    score: 86,
    updatedAt: "Today, 8:45 AM"
  },
  {
    id: "rep-1003",
    title: "Pricing Funnel Friction Review",
    website: "demo.webdna.ai",
    score: 78,
    updatedAt: "Yesterday, 6:18 PM"
  }
];

export const quickActions: QuickAction[] = [
  {
    id: "qa-1",
    title: "Analyze Website",
    description: "Run a fresh AI crawl on a live domain.",
    href: "/analyze"
  },
  {
    id: "qa-2",
    title: "Compare Reports",
    description: "Review score movement between two releases.",
    href: "/history"
  },
  {
    id: "qa-3",
    title: "Export Report",
    description: "Prepare a shareable report snapshot.",
    href: "/reports/r-001"
  },
  {
    id: "qa-4",
    title: "Create Workspace",
    description: "Add a new monitored product or site.",
    href: "/settings"
  },
  {
    id: "qa-5",
    title: "Invite Team",
    description: "Bring product, SEO, and engineering into the loop.",
    href: "/settings"
  }
];

export const workspaceOptions: WorkspaceOption[] = [
  { id: "ws-1", name: "WebDNA Core", plan: "Enterprise" },
  { id: "ws-2", name: "Docs Platform", plan: "Pro" },
  { id: "ws-3", name: "Growth Experiments", plan: "Starter" }
] as const;

export const recentSearches: RecentSearch[] = [
  {
    id: "rs-1",
    label: "Pricing funnel accessibility",
    description: "Latest report and issues on demo.webdna.ai/pricing",
    href: "/reports/r-001"
  },
  {
    id: "rs-2",
    label: "docs.webdna.ai canonical audit",
    description: "Recent crawl history for developer documentation",
    href: "/history"
  },
  {
    id: "rs-3",
    label: "Analyze status.webdna.ai",
    description: "Quick start a new scan from the analysis workspace",
    href: "/analyze"
  }
] as const;

export const suggestedUrls = [
  "https://webdna.ai",
  "https://docs.webdna.ai",
  "https://demo.webdna.ai/pricing"
] as const;

export const recentUrls = [
  "https://webdna.ai/platform",
  "https://docs.webdna.ai/get-started",
  "https://demo.webdna.ai/compare"
] as const;

export const analysisTimeline: AnalysisStep[] = [
  {
    id: "step-1",
    label: "Crawl Initialization",
    description: "Gathering page routes, sitemaps, and canonical references.",
    status: "complete"
  },
  {
    id: "step-2",
    label: "Performance Profiling",
    description: "Evaluating render path, image weight, and Core Web Vitals signals.",
    status: "complete"
  },
  {
    id: "step-3",
    label: "UX and Accessibility Review",
    description: "Inspecting layout hierarchy, contrast, labels, focus flow, and CTA clarity.",
    status: "active"
  },
  {
    id: "step-4",
    label: "Recommendation Synthesis",
    description: "Prioritizing issues by impact, confidence, and implementation effort.",
    status: "pending"
  }
];

export const historyRecords: HistoryRecord[] = [
  {
    id: "r-001",
    website: "webdna.ai",
    url: "https://webdna.ai",
    status: "Ready",
    score: 91,
    createdAt: "2026-06-26T10:00:00.000Z",
    owner: "Platform AI",
    favorite: true
  },
  {
    id: "r-002",
    website: "docs.webdna.ai",
    url: "https://docs.webdna.ai",
    status: "Needs Review",
    score: 84,
    createdAt: "2026-06-26T08:28:00.000Z",
    owner: "Maya Chen",
    favorite: false
  },
  {
    id: "r-003",
    website: "demo.webdna.ai",
    url: "https://demo.webdna.ai/pricing",
    status: "Processing",
    score: 77,
    createdAt: "2026-06-25T18:05:00.000Z",
    owner: "Platform AI",
    favorite: true
  },
  {
    id: "r-004",
    website: "status.webdna.ai",
    url: "https://status.webdna.ai",
    status: "Ready",
    score: 89,
    createdAt: "2026-06-24T15:12:00.000Z",
    owner: "Daniel Ortiz",
    favorite: false
  },
  {
    id: "r-005",
    website: "careers.webdna.ai",
    url: "https://careers.webdna.ai",
    status: "Ready",
    score: 85,
    createdAt: "2026-06-23T11:46:00.000Z",
    owner: "Priya Raman",
    favorite: false
  }
];

export const profileStats = [
  { label: "Reports reviewed", value: "184" },
  { label: "Websites monitored", value: "12" },
  { label: "Suggestions resolved", value: "67" }
] as const;

export const savedReports: SavedReport[] = favoriteReports;

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "First 100 Fixes",
    detail: "Resolved 100 tracked issues across monitored properties."
  },
  {
    id: "ach-2",
    title: "Accessibility Champion",
    detail: "Improved accessibility scores above 85 on every core workspace."
  },
  {
    id: "ach-3",
    title: "Fast Feedback Loop",
    detail: "Reduced average recommendation turnaround to under 3 days."
  }
];

export const reportScoreBreakdown: ScoreBreakdown[] = [
  {
    label: "Performance",
    score: 87,
    detail: "Render path is clean, but oversized hero media still affects mobile LCP."
  },
  {
    label: "SEO",
    score: 91,
    detail: "Metadata quality and internal linking are strong, with minor schema gaps."
  },
  {
    label: "Accessibility",
    score: 86,
    detail: "Good label coverage and semantic structure, with a few contrast regressions."
  },
  {
    label: "UX",
    score: 84,
    detail: "Clear information hierarchy, but conversion routes need stronger CTA separation."
  },
  {
    label: "Security",
    score: 89,
    detail: "Headers and transport settings are solid, with two outdated dependencies noted."
  },
  {
    label: "Design",
    score: 88,
    detail: "Consistent visual hierarchy and spacing with a few weak component states."
  }
];

export const reportTopIssues: ReportIssue[] = [
  {
    id: "issue-1",
    title: "Hero image is heavier than necessary on mobile",
    severity: "High",
    detail: "Compress and serve next-gen formats to recover LCP on slower connections."
  },
  {
    id: "issue-2",
    title: "Pricing CTA contrast drops below WCAG AA in dark sections",
    severity: "Medium",
    detail: "Strengthen contrast and shadow separation to improve clarity and accessibility."
  },
  {
    id: "issue-3",
    title: "Two product detail pages missing tailored meta descriptions",
    severity: "Low",
    detail: "Add intent-specific descriptions to improve click-through from branded search."
  }
];

export const reportStrengths: ReportStrength[] = [
  {
    id: "strength-1",
    title: "Strong internal linking on high-intent pages",
    detail: "Navigation flow supports both users and crawl depth with clear contextual pathways."
  },
  {
    id: "strength-2",
    title: "Stable visual language across key journeys",
    detail: "Layout, spacing, and component hierarchy reinforce trust across marketing surfaces."
  },
  {
    id: "strength-3",
    title: "Healthy semantic structure and landmark usage",
    detail: "Core headings, landmarks, and labels support assistive technologies well."
  }
];
