export type AnalyzeWebsiteInput = {
  url: string;
};

export type HeadingsMap = Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", string[]>;

export type ParsedLink = {
  href: string;
  text: string;
};

export type ParsedImage = {
  src: string;
  alt: string | null;
};

export type ParsedWebsiteData = {
  url: string;
  title: string | null;
  description: string | null;
  favicon: string | null;
  headings: HeadingsMap;
  images: ParsedImage[];
  internalLinks: ParsedLink[];
  externalLinks: ParsedLink[];
};

export type WebsiteMetrics = {
  htmlBytes: number;
  hasViewport: boolean;
  hasCanonical: boolean;
  usesHttps: boolean;
  mixedContentCount: number;
  imageAltCoverage: number;
  internalLinkCount: number;
  externalLinkCount: number;
  formCount: number;
  buttonCount: number;
  scriptCount: number;
  stylesheetCount: number;
  headingStructureScore: number;
};

export type AnalysisScores = {
  seoScore: number;
  performanceScore: number;
  accessibilityScore: number;
  designScore: number;
  securityScore: number;
  uxScore: number;
  overallScore: number;
};

export type AnalysisResult = {
  websiteId: string;
  analysisId: string;
  reportId: string;
};
