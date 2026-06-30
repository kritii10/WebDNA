export type KPITrendDirection = "up" | "down";

export type KPI = {
  id: string;
  label: string;
  value: string;
  change: string;
  direction: KPITrendDirection;
  detail: string;
};

export type TrafficPoint = {
  name: string;
  organic: number;
  paid: number;
  conversions: number;
};

export type ReportSummary = {
  id: string;
  title: string;
  status: "Ready" | "Processing" | "Needs Review";
  score: number;
  updatedAt: string;
  owner: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  category: "Insight" | "Optimization" | "Alert";
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  unread: boolean;
};

export type AISuggestion = {
  id: string;
  title: string;
  summary: string;
  impact: "High" | "Medium" | "Low";
  confidence: number;
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
  direction: KPITrendDirection;
  detail: string;
};

export type HealthTrendPoint = {
  period: string;
  overall: number;
  performance: number;
  seo: number;
  accessibility: number;
};

export type PerformanceHistoryPoint = {
  period: string;
  lcp: number;
  cls: number;
  ttfb: number;
};

export type DistributionPoint = {
  name: string;
  value: number;
  fill: string;
};

export type RadarMetric = {
  subject: string;
  current: number;
  benchmark: number;
};

export type WeeklyActivityPoint = {
  day: string;
  analyses: number;
  fixes: number;
};

export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  actor: string;
  type: "report" | "fix" | "alert" | "collaboration";
};

export type WebsiteProject = {
  id: string;
  name: string;
  domain: string;
  score: number;
  status: "Healthy" | "Watchlist" | "Critical";
  lastAnalysis: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type AnalysisStep = {
  id: string;
  label: string;
  description: string;
  status: "complete" | "active" | "pending";
};

export type HistoryRecord = {
  id: string;
  website: string;
  url: string;
  status: "Ready" | "Processing" | "Needs Review";
  score: number;
  createdAt: string;
  owner: string;
  favorite: boolean;
};

export type SavedReport = {
  id: string;
  title: string;
  website: string;
  score: number;
  updatedAt: string;
};

export type Achievement = {
  id: string;
  title: string;
  detail: string;
};

export type SettingGroup = {
  id: string;
  title: string;
  description: string;
};

export type ScoreBreakdown = {
  label: "Performance" | "SEO" | "Accessibility" | "UX" | "Security" | "Design";
  score: number;
  detail: string;
};

export type ReportIssue = {
  id: string;
  title: string;
  severity: "High" | "Medium" | "Low";
  detail: string;
};

export type ReportStrength = {
  id: string;
  title: string;
  detail: string;
};

export type WorkspaceOption = {
  id: string;
  name: string;
  plan: string;
};

export type RecentSearch = {
  id: string;
  label: string;
  description: string;
  href: string;
};
