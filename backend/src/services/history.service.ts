import { prisma } from "../config/prisma";
import { listReportsForUser } from "./report.service";

export async function getHistory(userId: string) {
  const [reports, recentAnalyses] = await Promise.all([
    listReportsForUser(userId),
    prisma.analysis.findMany({
      where: {
        website: {
          userId
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 10,
      include: {
        website: {
          select: {
            id: true,
            url: true,
            title: true
          }
        }
      }
    })
  ]);

  return {
    reports,
    recentAnalyses
  };
}
