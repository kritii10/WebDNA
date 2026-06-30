import { prisma } from "../config/prisma";
import { AppError } from "../utils/app-error";

export async function listReportsForUser(userId: string) {
  return prisma.report.findMany({
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
    include: {
      analysis: {
        include: {
          website: true
        }
      }
    }
  });
}

export async function getReportForUser(reportId: string, userId: string) {
  const report = await prisma.report.findFirst({
    where: {
      id: reportId,
      analysis: {
        website: {
          userId
        }
      }
    },
    include: {
      analysis: {
        include: {
          website: true
        }
      }
    }
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  return report;
}

export async function deleteReportForUser(reportId: string, userId: string) {
  const report = await prisma.report.findFirst({
    where: {
      id: reportId,
      analysis: {
        website: {
          userId
        }
      }
    }
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  await prisma.report.delete({
    where: {
      id: reportId
    }
  });

  return {
    message: "Report deleted successfully"
  };
}
