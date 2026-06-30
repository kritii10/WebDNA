export type ReportSummaryItem = {
  id: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  createdAt: Date;
  analysisId: string;
};

export type DashboardRecentActivity = {
  id: string;
  type: "analysis" | "report" | "website";
  title: string;
  detail: string;
  createdAt: Date;
};

export type DashboardResponse = {
  totalWebsites: number;
  totalReports: number;
  averageScore: number;
  recentAnalyses: Array<{
    id: string;
    overallScore: number;
    createdAt: Date;
    website: {
      id: string;
      url: string;
      title: string | null;
    };
  }>;
  recentActivity: DashboardRecentActivity[];
};
