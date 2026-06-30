import type { Metadata } from "next";

import { ReportDetailsView } from "@/components/dashboard/report-details-view";

type ReportPageProps = {
  params: Promise<{
    reportId: string;
  }>;
};

export async function generateMetadata({
  params
}: ReportPageProps): Promise<Metadata> {
  const { reportId } = await params;

  return {
    title: `Report ${reportId.toUpperCase()}`,
    description:
      "Detailed WebDNA website report with score breakdowns, AI recommendations, and prioritized improvements."
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { reportId } = await params;

  return <ReportDetailsView reportId={reportId} />;
}
