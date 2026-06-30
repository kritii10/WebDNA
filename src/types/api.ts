export type ApiUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiWebsite = {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  favicon: string | null;
};

export type ApiAnalysis = {
  id: string;
  seoScore: number;
  performanceScore: number;
  accessibilityScore: number;
  designScore: number;
  securityScore: number;
  uxScore: number;
  overallScore: number;
  websiteId: string;
  createdAt: string;
  website: ApiWebsite;
};

export type ApiReport = {
  id: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  analysisId: string;
  createdAt: string;
  analysis: ApiAnalysis;
};

export type ApiDashboardActivity = {
  id: string;
  type: "analysis" | "report" | "website";
  title: string;
  detail: string;
  createdAt: string;
};

export type ApiDashboardAnalysis = {
  id: string;
  overallScore: number;
  createdAt: string;
  website: {
    id: string;
    url: string;
    title: string | null;
  };
};

export type DashboardResponse = {
  totalWebsites: number;
  totalReports: number;
  averageScore: number;
  recentAnalyses: ApiDashboardAnalysis[];
  recentActivity: ApiDashboardActivity[];
};

export type ReportsResponse = {
  reports: ApiReport[];
};

export type ReportResponse = {
  report: ApiReport;
};

export type HistoryResponse = {
  reports: ApiReport[];
  recentAnalyses: ApiDashboardAnalysis[];
};

export type AuthMeResponse = {
  user: ApiUser;
};
