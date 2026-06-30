import { prisma } from "../config/prisma";
import type { DashboardResponse } from "../types/report";

function buildRecentActivity(
  analyses: Array<{
    id: string;
    overallScore: number;
    createdAt: Date;
    website: {
      id: string;
      url: string;
      title: string | null;
    };
  }>,
  reports: Array<{
    id: string;
    summary: string;
    createdAt: Date;
    analysis: {
      website: {
        title: string | null;
        url: string;
      };
    };
  }>,
  websites: Array<{
    id: string;
    url: string;
    title: string | null;
    createdAt: Date;
  }>
): DashboardResponse["recentActivity"] {
  const analysisActivity = analyses.map((analysis) => ({
    id: analysis.id,
    type: "analysis" as const,
    title: `Analysis completed · ${analysis.overallScore}/100`,
    detail: analysis.website.title ?? analysis.website.url,
    createdAt: analysis.createdAt
  }));

  const reportActivity = reports.map((report) => ({
    id: report.id,
    type: "report" as const,
    title: "Report generated",
    detail: report.analysis.website.title ?? report.analysis.website.url,
    createdAt: report.createdAt
  }));

  const websiteActivity = websites.map((website) => ({
    id: website.id,
    type: "website" as const,
    title: "Website added",
    detail: website.title ?? website.url,
    createdAt: website.createdAt
  }));

  return [...analysisActivity, ...reportActivity, ...websiteActivity]
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime())
    .slice(0, 10);
}

export async function getDashboard(userId: string): Promise<DashboardResponse> {
  const [totalWebsites, totalReports, analysisAggregate, recentAnalyses, recentReports, recentWebsites] =
    await Promise.all([
      prisma.website.count({
        where: {
          userId
        }
      }),
      prisma.report.count({
        where: {
          analysis: {
            website: {
              userId
            }
          }
        }
      }),
      prisma.analysis.aggregate({
        where: {
          website: {
            userId
          }
        },
        _avg: {
          overallScore: true
        }
      }),
      prisma.analysis.findMany({
        where: {
          website: {
            userId
          }
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 5,
        include: {
          website: {
            select: {
              id: true,
              url: true,
              title: true
            }
          }
        }
      }),
      prisma.report.findMany({
        where: {
          analysis: {
            website: {
              userId
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 5,
        include: {
          analysis: {
            select: {
              website: {
                select: {
                  title: true,
                  url: true
                }
              }
            }
          }
        }
      }),
      prisma.website.findMany({
        where: {
          userId
        },
        orderBy: {
          updatedAt: "desc"
        },
        take: 5
      })
    ]);

  const averageScore = Math.round(analysisAggregate._avg.overallScore ?? 0);

  return {
    totalWebsites,
    totalReports,
    averageScore,
    recentAnalyses,
    recentActivity: buildRecentActivity(recentAnalyses, recentReports, recentWebsites)
  };
}
