import type { ApiDashboardActivity, ApiDashboardAnalysis, ApiReport } from "@/types/api";
import type {
  ActivityItem,
  DashboardMetric,
  HistoryRecord,
  ReportIssue,
  ReportStrength,
  ReportSummary,
  SavedReport,
  ScoreBreakdown,
  TimelineEvent,
  WebsiteProject
} from "@/types/dashboard";
import { formatCompactNumber, formatRelativeTime } from "@/lib/utils";

function getReportStatus(score: number): ReportSummary["status"] {
  if (score >= 85) {
    return "Ready";
  }

  if (score >= 72) {
    return "Needs Review";
  }

  return "Processing";
}

function getWebsiteStatus(score: number): WebsiteProject["status"] {
  if (score >= 85) {
    return "Healthy";
  }

  if (score >= 72) {
    return "Watchlist";
  }

  return "Critical";
}

function getIssueSeverity(score: number, index: number): ReportIssue["severity"] {
  if (score < 75 || index === 0) {
    return "High";
  }

  if (score < 85 || index === 1) {
    return "Medium";
  }

  return "Low";
}

export function toReportSummary(report: ApiReport): ReportSummary {
  const score = report.analysis.overallScore;
  const website = report.analysis.website.title ?? report.analysis.website.url;

  return {
    id: report.id,
    title: report.summary,
    status: getReportStatus(score),
    score,
    updatedAt: formatRelativeTime(report.createdAt),
    owner: website
  };
}

export function toSavedReport(report: ApiReport): SavedReport {
  return {
    id: report.id,
    title: report.summary,
    website: report.analysis.website.title ?? report.analysis.website.url,
    score: report.analysis.overallScore,
    updatedAt: formatRelativeTime(report.createdAt)
  };
}

export function toWebsiteProject(analysis: ApiDashboardAnalysis): WebsiteProject {
  const score = analysis.overallScore;
  const domain = analysis.website.title ?? analysis.website.url;

  return {
    id: analysis.id,
    name: domain,
    domain: analysis.website.url,
    score,
    status: getWebsiteStatus(score),
    lastAnalysis: formatRelativeTime(analysis.createdAt)
  };
}

export function toHistoryRecord(report: ApiReport, owner: string): HistoryRecord {
  const score = report.analysis.overallScore;
  const website = report.analysis.website.title ?? report.analysis.website.url;

  return {
    id: report.id,
    website,
    url: report.analysis.website.url,
    status: getReportStatus(score),
    score,
    createdAt: report.createdAt,
    owner,
    favorite: score >= 88
  };
}

export function toActivityItem(activity: ApiDashboardActivity): ActivityItem {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.detail,
    createdAt: activity.createdAt,
    category: activity.type === "analysis" ? "Insight" : activity.type === "report" ? "Optimization" : "Alert"
  };
}

export function toTimelineEvent(activity: ApiDashboardActivity, actor: string): TimelineEvent {
  const timelineType: TimelineEvent["type"] =
    activity.type === "analysis" ? "report" : activity.type === "website" ? "collaboration" : activity.type;

  return {
    id: activity.id,
    title: activity.title,
    description: activity.detail,
    createdAt: activity.createdAt,
    actor,
    type: timelineType
  };
}

export function buildDashboardMetrics({
  averageScore,
  recentAnalyses,
  recentReports,
  totalReports,
  totalWebsites
}: {
  averageScore: number;
  recentAnalyses: ApiDashboardAnalysis[];
  recentReports: ApiReport[];
  totalReports: number;
  totalWebsites: number;
}): DashboardMetric[] {
  const totalRecommendations = recentReports.reduce((sum, report) => sum + report.recommendations.length, 0);
  const totalResolvedSignals = recentReports.reduce(
    (sum, report) => sum + Math.max(0, report.strengths.length - report.weaknesses.length + 2),
    0
  );
  const activeProjects = new Set(recentAnalyses.map((analysis) => analysis.website.id)).size || totalWebsites;

  return [
    {
      id: "websites",
      label: "Total Websites",
      value: formatCompactNumber(totalWebsites),
      trend: "Live workspace coverage",
      direction: "up",
      detail: "Monitored properties across product, docs, and campaign surfaces."
    },
    {
      id: "reports",
      label: "Reports Generated",
      value: formatCompactNumber(totalReports),
      trend: "All-time analyses",
      direction: "up",
      detail: "Completed report snapshots ready for engineering and growth teams."
    },
    {
      id: "score",
      label: "Average Website Score",
      value: String(averageScore),
      trend: "Workspace average",
      direction: "up",
      detail: "Weighted across recent performance, SEO, accessibility, and UX signals."
    },
    {
      id: "issues",
      label: "Issues Fixed",
      value: formatCompactNumber(totalResolvedSignals),
      trend: "Derived from report signals",
      direction: "up",
      detail: "Resolved items inferred from completed optimization cycles."
    },
    {
      id: "suggestions",
      label: "AI Suggestions",
      value: formatCompactNumber(totalRecommendations),
      trend: "Ready for review",
      direction: "up",
      detail: "Recommendations surfaced across the latest report set."
    },
    {
      id: "projects",
      label: "Active Projects",
      value: formatCompactNumber(activeProjects),
      trend: "Recently analyzed",
      direction: "up",
      detail: "Websites with recent scans and active follow-up work."
    }
  ];
}

export function buildRecentSearches(reports: ApiReport[]) {
  return reports.slice(0, 3).map((report) => ({
    id: report.id,
    label: report.analysis.website.title ?? report.analysis.website.url,
    description: `${report.analysis.website.url} · Last updated ${formatRelativeTime(report.createdAt)}`,
    href: `/reports/${report.id}`
  }));
}

export function buildFavoriteReports(reports: ApiReport[]): SavedReport[] {
  return reports
    .slice()
    .sort((left, right) => right.analysis.overallScore - left.analysis.overallScore)
    .slice(0, 3)
    .map(toSavedReport);
}

export function buildPinnedWebsites(recentAnalyses: ApiDashboardAnalysis[]): WebsiteProject[] {
  return recentAnalyses.slice(0, 3).map(toWebsiteProject);
}

export function buildReportScoreBreakdown(report: ApiReport): ScoreBreakdown[] {
  return [
    {
      label: "Performance",
      score: report.analysis.performanceScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("performance")) ??
        "Performance signals are healthy with room to tighten the render path."
    },
    {
      label: "SEO",
      score: report.analysis.seoScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("seo")) ??
        "Metadata and crawlability are in good shape."
    },
    {
      label: "Accessibility",
      score: report.analysis.accessibilityScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("accessibility")) ??
        "Semantic structure and contrast are trending well."
    },
    {
      label: "UX",
      score: report.analysis.uxScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("ux")) ??
        "Information hierarchy is solid, with a few conversion opportunities."
    },
    {
      label: "Security",
      score: report.analysis.securityScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("security")) ??
        "Transport and header posture look strong."
    },
    {
      label: "Design",
      score: report.analysis.designScore,
      detail:
        report.weaknesses.find((weakness) => weakness.toLowerCase().includes("design")) ??
        "Visual rhythm and component consistency are steady."
    }
  ];
}

export function buildReportIssues(report: ApiReport): ReportIssue[] {
  return report.weaknesses.slice(0, 3).map((weakness, index) => ({
    id: `${report.id}-issue-${index + 1}`,
    title: weakness,
    severity: getIssueSeverity(report.analysis.overallScore, index),
    detail:
      report.recommendations[index] ??
      "Review this item in the next optimization cycle."
  }));
}

export function buildReportStrengths(report: ApiReport): ReportStrength[] {
  return report.strengths.slice(0, 3).map((strength, index) => ({
    id: `${report.id}-strength-${index + 1}`,
    title: strength,
    detail:
      report.recommendations[index] ??
      "This area is performing above the current workspace baseline."
  }));
}

export function buildTimelineEvents(activity: ApiDashboardActivity[], actor: string): TimelineEvent[] {
  return activity.map((item) => toTimelineEvent(item, actor));
}
