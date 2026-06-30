import axios from "axios";

import { prisma } from "../config/prisma";
import { AppError } from "../utils/app-error";
import { buildReportContent, calculateAnalysisScores, parseWebsiteHtml } from "../utils/analysis";
import { normalizeUrl } from "../utils/url";
import type { AnalyzeWebsiteInput } from "../types/analysis";

type AnalysisResponse = {
  website: {
    id: string;
    url: string;
    title: string | null;
    description: string | null;
    favicon: string | null;
  };
  analysis: {
    id: string;
    seoScore: number;
    performanceScore: number;
    accessibilityScore: number;
    designScore: number;
    securityScore: number;
    uxScore: number;
    overallScore: number;
    createdAt: Date;
  };
  report: {
    id: string;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    createdAt: Date;
  };
  parsed: ReturnType<typeof parseWebsiteHtml>["parsed"];
};

export async function analyzeWebsite(
  userId: string,
  input: AnalyzeWebsiteInput
): Promise<AnalysisResponse> {
  const normalizedUrl = normalizeUrl(input.url);

  let html: string;

  try {
    const response = await axios.get<string>(normalizedUrl, {
      responseType: "text",
      timeout: 20_000,
      headers: {
        "User-Agent": "WebDNA/1.0 (+https://webdna.ai)"
      },
      maxContentLength: 2_000_000,
      maxBodyLength: 2_000_000,
      validateStatus: (status) => status >= 200 && status < 400
    });

    html = response.data;
  } catch {
    throw new AppError("Unable to fetch the provided website", 400);
  }

  const { parsed, metrics } = parseWebsiteHtml(normalizedUrl, html);
  const scores = calculateAnalysisScores(parsed, metrics);
  const reportContent = buildReportContent(parsed, scores, metrics);

  const website = await prisma.website.upsert({
    where: {
      userId_url: {
        userId,
        url: normalizedUrl
      }
    },
    update: {
      title: parsed.title,
      description: parsed.description,
      favicon: parsed.favicon
    },
    create: {
      userId,
      url: normalizedUrl,
      title: parsed.title,
      description: parsed.description,
      favicon: parsed.favicon
    }
  });

  const createdAnalysis = await prisma.analysis.create({
    data: {
      websiteId: website.id,
      seoScore: scores.seoScore,
      performanceScore: scores.performanceScore,
      accessibilityScore: scores.accessibilityScore,
      designScore: scores.designScore,
      securityScore: scores.securityScore,
      uxScore: scores.uxScore,
      overallScore: scores.overallScore,
      report: {
        create: {
          summary: reportContent.summary,
          strengths: reportContent.strengths,
          weaknesses: reportContent.weaknesses,
          recommendations: reportContent.recommendations
        }
      }
    },
    include: {
      report: true
    }
  });

  const result: AnalysisResponse = {
    website: {
      id: website.id,
      url: website.url,
      title: website.title,
      description: website.description,
      favicon: website.favicon
    },
    analysis: {
      id: createdAnalysis.id,
      seoScore: createdAnalysis.seoScore,
      performanceScore: createdAnalysis.performanceScore,
      accessibilityScore: createdAnalysis.accessibilityScore,
      designScore: createdAnalysis.designScore,
      securityScore: createdAnalysis.securityScore,
      uxScore: createdAnalysis.uxScore,
      overallScore: createdAnalysis.overallScore,
      createdAt: createdAnalysis.createdAt
    },
    report: {
      id: createdAnalysis.report?.id ?? "",
      summary: createdAnalysis.report?.summary ?? reportContent.summary,
      strengths: createdAnalysis.report?.strengths ?? reportContent.strengths,
      weaknesses: createdAnalysis.report?.weaknesses ?? reportContent.weaknesses,
      recommendations: createdAnalysis.report?.recommendations ?? reportContent.recommendations,
      createdAt: createdAnalysis.report?.createdAt ?? new Date()
    },
    parsed
  };

  return result;
}
