"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/common/page-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AISuggestionsList } from "@/components/dashboard/ai-suggestions-list";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card";
import { ReportsList } from "@/components/dashboard/reports-list";
import { SavedReportsCard } from "@/components/dashboard/saved-reports-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { TimelineCard } from "@/components/dashboard/timeline-card";
import { WebsiteListCard } from "@/components/dashboard/website-list-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  accessibilityTrend,
  aiSuggestions,
  notifications,
  performanceHistory,
  quickActions,
  seoDistribution,
  websiteHealthTrend,
  websiteRadar,
  weeklyActivity
} from "@/data";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  buildDashboardMetrics,
  buildFavoriteReports,
  buildPinnedWebsites,
  buildRecentSearches,
  buildTimelineEvents,
  toReportSummary
} from "@/lib/api-mappers";
import { formatRelativeTime } from "@/lib/utils";
import { getCurrentProfile } from "@/services/profile";
import { getDashboardOverview } from "@/services/dashboard";
import { getHistoryOverview } from "@/services/history";
import { getReports } from "@/services/reports";
import type { ApiDashboardAnalysis, ApiDashboardActivity, ApiReport } from "@/types/api";
import type { ActivityItem, DashboardMetric, TimelineEvent } from "@/types/dashboard";

const chartSkeleton = () => <Skeleton className="h-[24rem] w-full rounded-[1.75rem]" />;

const HealthTrendChart = dynamic(
  () => import("@/components/charts/health-trend-chart").then((mod) => mod.HealthTrendChart),
  { loading: chartSkeleton }
);
const PerformanceHistoryChart = dynamic(
  () =>
    import("@/components/charts/performance-history-chart").then(
      (mod) => mod.PerformanceHistoryChart
    ),
  { loading: chartSkeleton }
);
const SeoDistributionChart = dynamic(
  () =>
    import("@/components/charts/seo-distribution-chart").then(
      (mod) => mod.SeoDistributionChart
    ),
  { loading: chartSkeleton }
);
const AccessibilityTrendChart = dynamic(
  () =>
    import("@/components/charts/accessibility-trend-chart").then(
      (mod) => mod.AccessibilityTrendChart
    ),
  { loading: chartSkeleton }
);
const RadarScoreChart = dynamic(
  () => import("@/components/charts/radar-score-chart").then((mod) => mod.RadarScoreChart),
  { loading: chartSkeleton }
);
const WeeklyActivityChart = dynamic(
  () =>
    import("@/components/charts/weekly-activity-chart").then(
      (mod) => mod.WeeklyActivityChart
    ),
  { loading: chartSkeleton }
);

function buildActivityFeedItems(recentAnalyses: ApiDashboardAnalysis[]): ActivityItem[] {
  return recentAnalyses.map((analysis) => ({
    id: analysis.id,
    title: analysis.website.title ?? analysis.website.url,
    description: `Latest analysis score ${analysis.overallScore}/100 · ${formatRelativeTime(
      analysis.createdAt
    )}`,
    createdAt: analysis.createdAt,
    category: "Insight"
  }));
}

function deriveActivityTimeline(
  recentActivity: ApiDashboardActivity[],
  actor: string
): TimelineEvent[] {
  return buildTimelineEvents(recentActivity, actor);
}

export function DashboardWorkspace() {
  const [dashboard, setDashboard] = useState<{
    totalWebsites: number;
    totalReports: number;
    averageScore: number;
    recentAnalyses: ApiDashboardAnalysis[];
    recentActivity: ApiDashboardActivity[];
  } | null>(null);
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [historyReports, setHistoryReports] = useState<ApiReport[]>([]);
  const [historyAnalyses, setHistoryAnalyses] = useState<ApiDashboardAnalysis[]>([]);
  const [profileName, setProfileName] = useState("Platform AI");

  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboard() {
      setDashboardLoading(true);
      setDashboardError(null);

      try {
        const response = await getDashboardOverview(controller.signal);
        setDashboard(response);
      } catch (error) {
        setDashboardError(getApiErrorMessage(error, "Unable to load dashboard metrics."));
      } finally {
        setDashboardLoading(false);
      }
    }

    loadDashboard();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReports() {
      setReportsLoading(true);
      setReportsError(null);

      try {
        const response = await getReports(controller.signal);
        setReports(response);
      } catch (error) {
        setReportsError(getApiErrorMessage(error, "Unable to load reports."));
      } finally {
        setReportsLoading(false);
      }
    }

    loadReports();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHistory() {
      setHistoryLoading(true);
      setHistoryError(null);

      try {
        const response = await getHistoryOverview(controller.signal);
        setHistoryReports(response.reports);
        setHistoryAnalyses(response.recentAnalyses);
      } catch (error) {
        setHistoryError(getApiErrorMessage(error, "Unable to load history."));
      } finally {
        setHistoryLoading(false);
      }
    }

    loadHistory();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      setProfileError(null);

      try {
        const user = await getCurrentProfile(controller.signal);
        setProfileName(user.name);
      } catch (error) {
        setProfileError(getApiErrorMessage(error, "Unable to load profile details."));
      }
    }

    loadProfile();

    return () => controller.abort();
  }, []);

  const dashboardMetrics = useMemo<DashboardMetric[]>(() => {
    if (!dashboard) {
      return [];
    }

    return buildDashboardMetrics({
      averageScore: dashboard.averageScore,
      recentAnalyses: dashboard.recentAnalyses,
      recentReports: reports,
      totalReports: dashboard.totalReports,
      totalWebsites: dashboard.totalWebsites
    });
  }, [dashboard, reports]);

  const reportsList = useMemo(() => reports.map(toReportSummary), [reports]);
  const favoriteReports = useMemo(() => buildFavoriteReports(reports), [reports]);
  const pinnedWebsites = useMemo(
    () => buildPinnedWebsites(historyAnalyses.length > 0 ? historyAnalyses : dashboard?.recentAnalyses ?? []),
    [dashboard?.recentAnalyses, historyAnalyses]
  );
  const timelineItems = useMemo(
    () => deriveActivityTimeline(dashboard?.recentActivity ?? [], profileName),
    [dashboard?.recentActivity, profileName]
  );
  const recentAnalysesItems = useMemo(
    () => buildActivityFeedItems(historyAnalyses.length > 0 ? historyAnalyses : dashboard?.recentAnalyses ?? []),
    [dashboard?.recentAnalyses, historyAnalyses]
  );
  const recentSearches = useMemo(
    () => buildRecentSearches(historyReports.length > 0 ? historyReports : reports),
    [historyReports, reports]
  );

  const hasSectionError = Boolean(dashboardError || reportsError || historyError || profileError);

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <>
            <SecondaryButton>Export Snapshot</SecondaryButton>
            <PrimaryButton asChild>
              <Link href="/analyze">Analyze Website</Link>
            </PrimaryButton>
          </>
        }
        description="A high-signal operating view for engineering, SEO, design systems, and growth teams working from the same website intelligence source."
        title="Website Intelligence Dashboard"
      />

      {hasSectionError ? (
        <ErrorState
          className="min-h-0"
          description={
            dashboardError ?? reportsError ?? historyError ?? profileError ?? "Unable to load data."
          }
          title="Some dashboard data could not be loaded"
        />
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardLoading || reportsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-44 w-full rounded-[1.75rem]" />
          ))
        ) : dashboardError || reportsError ? (
          <div className="sm:col-span-2 xl:col-span-3">
            <ErrorState
              className="min-h-44"
              description="The dashboard overview could not be loaded right now."
              title="Dashboard overview unavailable"
            />
          </div>
        ) : (
          dashboardMetrics.map((metric) => <StatCard key={metric.id} item={metric} />)
        )}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-card/60 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-sky-300">Recent searches</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Continue where you left off</h2>
            </div>
            <span className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
              {historyLoading ? "Loading" : `${recentSearches.length} saved`}
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {historyLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl" />
              ))
            ) : recentSearches.length === 0 ? (
              <EmptyState
                className="min-h-44"
                description="Recent searches will appear here after your first report is generated."
                title="No recent searches"
              />
            ) : (
              recentSearches.map((item) => (
                <Link
                  key={item.id}
                  className="rounded-2xl border border-border/60 bg-background/50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-sky-400/30"
                  href={item.href}
                >
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))
            )}
          </div>
        </div>
        <QuickActionsCard items={quickActions} />
      </section>

      <section className="grid gap-5 xl:grid-cols-2" id="analytics">
        <HealthTrendChart data={websiteHealthTrend} />
        <PerformanceHistoryChart data={performanceHistory} />
        <SeoDistributionChart data={seoDistribution} />
        <AccessibilityTrendChart data={accessibilityTrend} />
        <RadarScoreChart data={websiteRadar} title="Radar Chart" />
        <WeeklyActivityChart data={weeklyActivity} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {dashboardLoading ? (
            <Skeleton className="h-[24rem] rounded-[1.75rem]" />
          ) : dashboardError ? (
            <ErrorState
              description="Recent activity could not be loaded right now."
              onAction={() => window.location.reload()}
              title="Recent activity unavailable"
            />
          ) : (
            <TimelineCard items={timelineItems} />
          )}
          {reportsLoading ? (
            <Skeleton className="h-[22rem] rounded-[1.75rem]" />
          ) : reportsError ? (
            <ErrorState description="Reports could not be loaded right now." title="Reports unavailable" />
          ) : reportsList.length === 0 ? (
            <EmptyState
              description="Run your first website analysis to generate reports that will appear here."
              title="No reports yet"
            />
          ) : (
            <ReportsList items={reportsList} />
          )}
          {historyLoading ? (
            <Skeleton className="h-[20rem] rounded-[1.75rem]" />
          ) : historyError && recentAnalysesItems.length === 0 ? (
            <ErrorState description="Activity feed could not be loaded right now." title="Activity unavailable" />
          ) : (
            <ActivityFeed items={recentAnalysesItems} />
          )}
        </div>
        <div className="space-y-5">
          {dashboardLoading ? (
            <Skeleton className="h-[18rem] rounded-[1.75rem]" />
          ) : dashboardError && pinnedWebsites.length === 0 ? (
            <ErrorState
              description="Pinned websites could not be loaded right now."
              title="Pinned websites unavailable"
            />
          ) : pinnedWebsites.length === 0 ? (
            <EmptyState
              description="Pinned websites will show up after a few more analyses."
              title="No pinned websites"
            />
          ) : (
            <WebsiteListCard items={pinnedWebsites} title="Pinned Websites" />
          )}
          {reportsLoading ? (
            <Skeleton className="h-[18rem] rounded-[1.75rem]" />
          ) : reportsError ? (
            <ErrorState
              description="Saved reports could not be loaded right now."
              title="Favorite reports unavailable"
            />
          ) : favoriteReports.length === 0 ? (
            <EmptyState
              description="Favorite reports will appear here once you start reviewing results."
              title="No favorite reports"
            />
          ) : (
            <SavedReportsCard items={favoriteReports} title="Favorite Reports" />
          )}
          <AISuggestionsList items={aiSuggestions} />
          <NotificationsPanel items={notifications} />
        </div>
      </section>
    </div>
  );
}
