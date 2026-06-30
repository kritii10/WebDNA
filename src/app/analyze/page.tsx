import type { Metadata } from "next";

import { AnalyzeWorkspace } from "@/components/dashboard/analyze-workspace";

export const metadata: Metadata = {
  title: "Analyze Website",
  description:
    "Run a new WebDNA analysis and generate a fresh AI-powered report for any website URL."
};

export default function AnalyzePage() {
  return <AnalyzeWorkspace />;
}
