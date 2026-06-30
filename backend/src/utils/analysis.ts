import { load } from "cheerio";

import type {
  AnalysisScores,
  HeadingsMap,
  ParsedImage,
  ParsedLink,
  ParsedWebsiteData,
  WebsiteMetrics
} from "../types/analysis";
import { getHostname, isInternalUrl } from "./url";

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function createEmptyHeadings(): HeadingsMap {
  return {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: []
  };
}

export function parseWebsiteHtml(websiteUrl: string, html: string): {
  parsed: ParsedWebsiteData;
  metrics: WebsiteMetrics;
} {
  const $ = load(html);
  const normalizedUrl = new URL(websiteUrl).toString();
  const hostname = getHostname(normalizedUrl);
  const headings = createEmptyHeadings();

  for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
    headings[level] = $(level)
      .map((_, element) => $(element).text().replace(/\s+/g, " ").trim())
      .get()
      .filter(Boolean);
  }

  const images: ParsedImage[] = $("img")
    .map((_, element) => {
      const source = $(element).attr("src")?.trim();
      const alt = $(element).attr("alt");

      if (!source) {
        return null;
      }

      try {
        return {
          src: new URL(source, normalizedUrl).toString(),
          alt: alt?.trim() || null
        };
      } catch {
        return null;
      }
    })
    .get()
    .filter((image): image is ParsedImage => Boolean(image));

  const internalLinks: ParsedLink[] = [];
  const externalLinks: ParsedLink[] = [];

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    try {
      const resolved = new URL(href, normalizedUrl).toString();
      const text = $(element).text().replace(/\s+/g, " ").trim();

      if (isInternalUrl(resolved, hostname)) {
        internalLinks.push({ href: resolved, text });
      } else {
        externalLinks.push({ href: resolved, text });
      }
    } catch {
      // Ignore malformed links.
    }
  });

  const htmlBytes = Buffer.byteLength(html, "utf8");
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  const usesHttps = normalizedUrl.startsWith("https://");
  const scripts = $("script[src]");
  const stylesheets = $('link[rel="stylesheet"]');
  const mixedContentCount = $("img[src], script[src], link[href]")
    .filter((_, element) => {
      const value = $(element).attr("src") ?? $(element).attr("href") ?? "";
      return /^http:\/\//i.test(value);
    })
    .length;

  const imageAltCoverage =
    images.length === 0 ? 1 : images.filter((image) => Boolean(image.alt)).length / images.length;
  const headingCount = Object.values(headings).reduce((count, items) => count + items.length, 0);
  const headingStructureScore =
    headings.h1.length === 1
      ? 100
      : headings.h1.length > 1
        ? 60
        : headingCount > 0
          ? 70
          : 40;

  return {
    parsed: {
      url: normalizedUrl,
      title: $("title").first().text().replace(/\s+/g, " ").trim() || null,
      description:
        $('meta[name="description"]').attr("content")?.replace(/\s+/g, " ").trim() || null,
      favicon: (() => {
        const rawHref =
          $('link[rel~="icon"]').first().attr("href")?.trim() ||
          $('link[rel="shortcut icon"]').first().attr("href")?.trim() ||
          null;

        if (!rawHref) {
          return null;
        }

        try {
          return new URL(rawHref, normalizedUrl).toString();
        } catch {
          return rawHref;
        }
      })(),
      headings,
      images,
      internalLinks,
      externalLinks
    },
    metrics: {
      htmlBytes,
      hasViewport,
      hasCanonical,
      usesHttps,
      mixedContentCount,
      imageAltCoverage,
      internalLinkCount: internalLinks.length,
      externalLinkCount: externalLinks.length,
      formCount: $("form").length,
      buttonCount: $("button").length,
      scriptCount: scripts.length,
      stylesheetCount: stylesheets.length,
      headingStructureScore
    }
  };
}

export function calculateAnalysisScores(parsed: ParsedWebsiteData, metrics: WebsiteMetrics): AnalysisScores {
  const seoScore = clampScore(
    30 +
      (parsed.title ? 20 : 0) +
      (parsed.description ? 15 : 0) +
      (parsed.headings.h1.length === 1 ? 10 : parsed.headings.h1.length > 1 ? 5 : 0) +
      (parsed.favicon ? 5 : 0) +
      (metrics.hasCanonical ? 5 : 0) +
      (metrics.internalLinkCount >= 5 ? 10 : metrics.internalLinkCount >= 1 ? 5 : 0) +
      (metrics.imageAltCoverage >= 0.8 ? 5 : metrics.imageAltCoverage >= 0.5 ? 2 : 0)
  );

  const performanceScore = clampScore(
    45 +
      (metrics.htmlBytes < 150_000 ? 15 : metrics.htmlBytes < 300_000 ? 10 : 0) +
      (metrics.scriptCount < 8 ? 10 : metrics.scriptCount < 16 ? 5 : 0) +
      (metrics.stylesheetCount < 8 ? 5 : 0) +
      (metrics.imageAltCoverage >= 0.7 ? 5 : 0) +
      (metrics.mixedContentCount === 0 ? 5 : 0)
  );

  const accessibilityScore = clampScore(
    40 +
      (parsed.title ? 10 : 0) +
      (parsed.description ? 5 : 0) +
      (metrics.hasViewport ? 10 : 0) +
      (metrics.imageAltCoverage >= 0.9 ? 20 : metrics.imageAltCoverage >= 0.7 ? 15 : 5) +
      (metrics.headingStructureScore >= 80 ? 10 : 0) +
      (metrics.buttonCount >= 1 ? 5 : 0)
  );

  const designScore = clampScore(
    45 +
      (parsed.favicon ? 5 : 0) +
      (metrics.hasViewport ? 10 : 0) +
      (parsed.headings.h2.length >= 1 ? 10 : 5) +
      (metrics.buttonCount >= 1 ? 10 : 0) +
      (metrics.internalLinkCount >= 3 ? 10 : 5) +
      (metrics.stylesheetCount >= 1 ? 5 : 0)
  );

  const securityScore = clampScore(
    55 +
      (metrics.usesHttps ? 10 : -10) +
      (metrics.mixedContentCount === 0 ? 15 : -10) +
      (metrics.externalLinkCount >= 0 ? 5 : 0) +
      (metrics.formCount === 0 ? 5 : 0) +
      (metrics.scriptCount < 12 ? 5 : 0)
  );

  const uxScore = clampScore(
    45 +
      (parsed.title ? 10 : 0) +
      (parsed.description ? 10 : 0) +
      (metrics.internalLinkCount >= 5 ? 10 : metrics.internalLinkCount >= 2 ? 6 : 0) +
      (metrics.buttonCount >= 1 ? 5 : 0) +
      (metrics.headingStructureScore >= 80 ? 10 : 0) +
      (metrics.imageAltCoverage >= 0.75 ? 5 : 0)
  );

  const overallScore = clampScore(
    (seoScore + performanceScore + accessibilityScore + designScore + securityScore + uxScore) / 6
  );

  return {
    seoScore,
    performanceScore,
    accessibilityScore,
    designScore,
    securityScore,
    uxScore,
    overallScore
  };
}

export function buildReportContent(
  parsed: ParsedWebsiteData,
  scores: AnalysisScores,
  metrics: WebsiteMetrics
) {
  const strengths = [
    parsed.title ? `Clear page title: ${parsed.title}` : null,
    parsed.description ? "Useful meta description is present for search visibility." : null,
    metrics.imageAltCoverage >= 0.8 ? "Most images include descriptive alt text." : null,
    metrics.internalLinkCount >= 5 ? "Healthy internal linking supports crawlability." : null,
    metrics.usesHttps && metrics.mixedContentCount === 0 ? "Transport security is in good shape." : null
  ].filter((item): item is string => Boolean(item));

  const weaknesses = [
    scores.performanceScore < 80 ? "Performance needs optimization for heavier assets and scripts." : null,
    scores.accessibilityScore < 80 ? "Accessibility could improve with better labels and alt coverage." : null,
    scores.securityScore < 80 ? "Security should address protocol or mixed-content issues." : null,
    scores.seoScore < 80 ? "SEO signals are missing key structural fundamentals." : null
  ].filter((item): item is string => Boolean(item));

  const recommendations = [
    parsed.description ? null : "Add a concise meta description to strengthen search snippets.",
    parsed.headings.h1.length === 1 ? null : "Ensure each page has a single, descriptive H1.",
    metrics.imageAltCoverage < 0.8 ? "Review image alt text coverage for accessibility and SEO." : null,
    metrics.internalLinkCount < 5 ? "Add more contextual internal links to guide users and crawlers." : null,
    metrics.scriptCount >= 12 ? "Reduce or defer non-critical scripts to improve perceived performance." : null
  ].filter((item): item is string => Boolean(item));

  if (strengths.length === 0) {
    strengths.push("The page is structurally healthy and ready for deeper optimization.");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("No major blockers were detected in the current rule-based scan.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Keep monitoring content, speed, and accessibility as the page evolves.");
  }

  const summary = `${parsed.title ?? parsed.url} scored ${scores.overallScore}/100. ` +
    `The strongest signals are ${scores.seoScore >= scores.performanceScore ? "SEO" : "performance"} and ` +
    `${scores.accessibilityScore >= scores.designScore ? "accessibility" : "design"}, while the biggest opportunities are ` +
    `${scores.performanceScore < scores.accessibilityScore ? "performance" : "accessibility"} and UX clarity.`;

  return {
    summary,
    strengths,
    weaknesses,
    recommendations
  };
}
