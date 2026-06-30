"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Download, FileJson, Share2 } from "lucide-react";

import { HealthTrendChart } from "@/components/charts/health-trend-chart";
import { RadarScoreChart } from "@/components/charts/radar-score-chart";
import { CircularScore } from "@/components/dashboard/circular-score";
import { PageHeader } from "@/components/common/page-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger
} from "@/components/ui/dropdown";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildReportIssues,
  buildReportScoreBreakdown,
  buildReportStrengths
} from "@/lib/api-mappers";
import { getApiErrorMessage } from "@/lib/api-error";
import { formatRelativeTime, cn } from "@/lib/utils";
import { getReportById } from "@/services/reports";
import {
  reportScoreBreakdown as mockReportScoreBreakdown,
  reportStrengths as mockReportStrengths,
  websiteHealthTrend,
  websiteRadar
} from "@/data";
import type { ApiReport } from "@/types/api";

type ReportDetailsViewProps = {
  reportId: string;
};

function isCanceledRequest(error: unknown) {
  if (axios.isCancel(error)) {
    return true;
  }

  if (axios.isAxiosError(error) && error.code === "ERR_CANCELED") {
    return true;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return true;
  }

  return error instanceof Error && error.name === "CanceledError";
}

export function ReportDetailsView({ reportId }: ReportDetailsViewProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [report, setReport] = useState<ApiReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    async function loadReport() {
      if (isActive) {
        setIsLoading(true);
        setError(null);
        setReport(null);
      }

      try {
        const response = await getReportById(reportId, controller.signal);

        if (!isActive) {
          return;
        }

        setReport(response);
      } catch (loadError: unknown) {
        if (!isActive || isCanceledRequest(loadError)) {
          return;
        }

        setError(getApiErrorMessage(loadError, "Unable to load this report."));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadReport();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [reportId, reloadToken]);

  const scoreBreakdown = useMemo(
    () => (report ? buildReportScoreBreakdown(report) : mockReportScoreBreakdown),
    [report]
  );
  const reportStrengthItems = useMemo(
    () => (report ? buildReportStrengths(report) : mockReportStrengths),
    [report]
  );
  const reportIssueItems = useMemo(
    () => (report ? buildReportIssues(report) : []),
    [report]
  );

  const websiteName = report?.analysis.website.title ?? report?.analysis.website.url ?? "Website";
  const websiteUrl = report?.analysis.website.url ?? "https://example.com";
  const reportStatus = report ? "Report ready" : "Loading";
  const priorityLane =
    report?.recommendations[0] ?? report?.weaknesses[0] ?? "No priority items available yet.";

  const remediationTimeline = useMemo(() => {
    if (!report) {
      return [];
    }

    return [
      ["Detected", report.weaknesses[0] ?? report.summary],
      [
        "Validated",
        `Overall score landed at ${report.analysis.overallScore}/100 with performance ${report.analysis.performanceScore}/100.`
      ],
      ["Planned", report.recommendations[0] ?? "No follow-up items were generated for this run."]
    ] as const;
  }, [report]);

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <>
            <Modal onOpenChange={setShareOpen} open={shareOpen}>
              <ModalTrigger asChild>
                <SecondaryButton>
                  <Share2 className="size-4" />
                  Share Report
                </SecondaryButton>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Share Report</ModalTitle>
                  <ModalDescription>
                    Send this report to engineering, design, or growth stakeholders.
                  </ModalDescription>
                </ModalHeader>
                <div className="space-y-4">
                  <input
                    className="h-12 w-full rounded-2xl border border-border/60 bg-background/50 px-4 text-sm outline-none"
                    defaultValue={`https://app.webdna.ai/reports/${reportId}`}
                    readOnly
                  />
                  <PrimaryButton className="w-full">Copy Share Link</PrimaryButton>
                </div>
              </ModalContent>
            </Modal>
            <Dropdown>
              <DropdownTrigger asChild>
                <PrimaryButton>
                  <Download className="size-4" />
                  Export
                </PrimaryButton>
              </DropdownTrigger>
              <DropdownContent align="end">
                <DropdownItem>
                  <Download className="size-4" />
                  Export PDF
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem>
                  <FileJson className="size-4" />
                  Download JSON
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </>
        }
        description="A detailed review of website quality, performance, discoverability, accessibility, and conversion readiness."
        title={`Report Details · ${reportId.toUpperCase()}`}
      />

      {error && !report ? (
        <ErrorState
          description={error}
          onAction={() => setReloadToken((value) => value + 1)}
          title="Report unavailable"
        />
      ) : null}
      {isLoading ? (
        <div className="space-y-6">
          <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <Skeleton className="h-[14rem] rounded-[1.75rem]" />
            <Skeleton className="h-[14rem] rounded-[1.75rem]" />
          </section>
          <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <Skeleton className="h-[26rem] rounded-[1.75rem]" />
            <Skeleton className="h-[26rem] rounded-[1.75rem]" />
          </section>
          <section className="grid gap-5 xl:grid-cols-2">
            <Skeleton className="h-[24rem] rounded-[1.75rem]" />
            <Skeleton className="h-[24rem] rounded-[1.75rem]" />
          </section>
          <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <Skeleton className="h-[28rem] rounded-[1.75rem]" />
            <Skeleton className="h-[28rem] rounded-[1.75rem]" />
          </section>
        </div>
      ) : report ? (
        <>
          <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="border-white/10 bg-card/60">
              <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="mt-2 font-medium text-foreground">{websiteName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{websiteUrl}</p>
                </div>
                <div className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Run status</p>
                  <p className="mt-2 inline-flex rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    {reportStatus}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Generated {formatRelativeTime(report.createdAt)}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Priority lane</p>
                  <p className="mt-2 font-medium text-foreground">{priorityLane}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Highest business impact this cycle
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/60">
              <CardHeader>
                <CardTitle>Remediation Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {remediationTimeline.map(([title, detail], index) => (
                  <div key={title} className="flex gap-3">
                    <div
                      className={cn(
                        "mt-1 size-3 rounded-full",
                        index === 2 ? "bg-sky-400" : "bg-emerald-400"
                      )}
                    />
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-white/10 bg-card/60">
              <CardHeader>
                <CardTitle>Website Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {scoreBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4"
                  >
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-2 font-display text-3xl font-semibold">{item.score}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/60">
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {scoreBreakdown.map((item) => (
                  <CircularScore key={item.label} label={item.label} score={item.score} />
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-5 xl:grid-cols-2">
            <RadarScoreChart data={websiteRadar} title="Radar Chart" />
            <HealthTrendChart data={websiteHealthTrend} title="Score Movement" />
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-white/10 bg-card/60">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportIssueItems.length === 0 ? (
                  <EmptyState
                    className="min-h-40"
                    description="AI recommendations will appear here once weaknesses are detected."
                    title="No recommendations"
                  />
                ) : (
                  reportIssueItems.map((issue) => (
                    <div
                      key={issue.id}
                      className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{issue.title}</p>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            issue.severity === "High" && "bg-rose-500/12 text-rose-300",
                            issue.severity === "Medium" && "bg-amber-500/12 text-amber-300",
                            issue.severity === "Low" && "bg-sky-400/12 text-sky-300"
                          )}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{issue.detail}</p>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            issue.severity === "High" && "w-[88%] bg-rose-400",
                            issue.severity === "Medium" && "w-[64%] bg-amber-400",
                            issue.severity === "Low" && "w-[38%] bg-sky-400"
                          )}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            <div className="space-y-5">
              <Card className="border-white/10 bg-card/60">
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reportStrengthItems.map((strength) => (
                    <div
                      key={strength.id}
                      className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4"
                    >
                      <p className="font-medium">{strength.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{strength.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-card/60">
                <CardHeader>
                  <CardTitle>Priority Improvements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scoreBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="text-muted-foreground">{item.score}/100</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#22c55e)]"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      ) : (
        <EmptyState
          description="This report is not available or has not been generated yet."
          title="No report found"
        />
      )}
    </div>
  );
}
