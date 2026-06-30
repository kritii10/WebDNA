"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, CheckCircle2, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { SavedReportsCard } from "@/components/dashboard/saved-reports-card";
import { TimelineCard } from "@/components/dashboard/timeline-card";
import { WebsiteListCard } from "@/components/dashboard/website-list-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  buildFavoriteReports,
  buildPinnedWebsites,
  buildTimelineEvents,
} from "@/lib/api-mappers";
import { formatCompactNumber } from "@/lib/utils";
import { getCurrentProfile } from "@/services/profile";
import { getDashboardOverview } from "@/services/dashboard";
import { getHistoryOverview } from "@/services/history";
import { getReports } from "@/services/reports";
import type { ApiDashboardActivity, ApiDashboardAnalysis, ApiReport, ApiUser } from "@/types/api";
import type { SavedReport, WebsiteProject, TimelineEvent } from "@/types/dashboard";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileWorkspace() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [dashboard, setDashboard] = useState<{
    totalWebsites: number;
    totalReports: number;
    averageScore: number;
    recentAnalyses: ApiDashboardAnalysis[];
    recentActivity: ApiDashboardActivity[];
  } | null>(null);
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [historyAnalyses, setHistoryAnalyses] = useState<ApiDashboardAnalysis[]>([]);

  const [userLoading, setUserLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [userError, setUserError] = useState<string | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      setUserLoading(true);
      setUserError(null);

      try {
        const response = await getCurrentProfile(controller.signal);
        setUser(response);
      } catch (error) {
        setUserError(getApiErrorMessage(error, "Unable to load profile details."));
      } finally {
        setUserLoading(false);
      }
    }

    loadUser();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboard() {
      setDashboardLoading(true);
      setDashboardError(null);

      try {
        const response = await getDashboardOverview(controller.signal);
        setDashboard(response);
      } catch (error) {
        setDashboardError(getApiErrorMessage(error, "Unable to load dashboard summary."));
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
        setHistoryAnalyses(response.recentAnalyses);
      } catch (error) {
        setHistoryError(getApiErrorMessage(error, "Unable to load activity history."));
      } finally {
        setHistoryLoading(false);
      }
    }

    loadHistory();

    return () => controller.abort();
  }, []);

  const profileStats = useMemo(
    () => [
      {
        label: "Reports reviewed",
        value: dashboard ? formatCompactNumber(dashboard.totalReports) : "0"
      },
      {
        label: "Websites monitored",
        value: dashboard ? formatCompactNumber(dashboard.totalWebsites) : "0"
      },
      {
        label: "Average score",
        value: dashboard ? String(dashboard.averageScore) : "0"
      }
    ],
    [dashboard]
  );

  const achievements = useMemo(() => {
    const totalReports = dashboard?.totalReports ?? 0;
    const averageScore = dashboard?.averageScore ?? 0;
    const websitesMonitored = dashboard?.totalWebsites ?? 0;

    return [
      {
        id: "ach-1",
        title: averageScore >= 85 ? "High Scoring Workspace" : "Improving Workspace",
        detail:
          averageScore >= 85
            ? "Average score is above the enterprise benchmark."
            : "The workspace is trending upward with room to tighten key metrics."
      },
      {
        id: "ach-2",
        title: totalReports >= 10 ? "Consistent Review Cadence" : "Building Review Cadence",
        detail:
          totalReports >= 10
            ? "A healthy stream of reports is being reviewed across the workspace."
            : "The workspace is starting to build a steady analysis rhythm."
      },
      {
        id: "ach-3",
        title: websitesMonitored >= 5 ? "Broad Coverage" : "Focused Coverage",
        detail:
          websitesMonitored >= 5
            ? "Multiple properties are monitored with regular follow-up."
            : "A focused set of properties is being tracked closely."
      }
    ];
  }, [dashboard]);

  const favoriteReports: SavedReport[] = useMemo(
    () => buildFavoriteReports(reports),
    [reports]
  );
  const pinnedWebsites: WebsiteProject[] = useMemo(
    () =>
      buildPinnedWebsites(historyAnalyses.length > 0 ? historyAnalyses : dashboard?.recentAnalyses ?? []),
    [dashboard?.recentAnalyses, historyAnalyses]
  );
  const timelineEvents: TimelineEvent[] = useMemo(
    () =>
      buildTimelineEvents(
        dashboard?.recentActivity ?? [],
        user?.name ?? "Platform AI"
      ),
    [dashboard?.recentActivity, user?.name]
  );

  const hasError = Boolean(userError || dashboardError || reportsError || historyError);
  const displayName = user?.name ?? "Profile";
  const displayEmail = user?.email ?? "user@webdna.ai";

  return (
    <div className="space-y-6">
      <PageHeader
        description="A personal operating view of your recent contributions, saved work, and optimization momentum."
        title="Profile"
      />

      {hasError ? (
        <ErrorState
          className="min-h-0"
          description={
            userError ?? dashboardError ?? reportsError ?? historyError ?? "Unable to load profile data."
          }
          title="Some profile data could not be loaded"
        />
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-white/10 bg-card/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              {userLoading ? (
                <Skeleton className="size-24 rounded-full" />
              ) : (
                <Avatar className="size-24">
                  <AvatarFallback className="text-xl">{getInitials(displayName)}</AvatarFallback>
                </Avatar>
              )}
              <div className="mt-4 sm:ml-5 sm:mt-0">
                {userLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-16 w-full max-w-md" />
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-3xl font-semibold">{displayName}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{displayEmail}</p>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      Leads cross-functional website optimization across product marketing,
                      engineering, SEO, and accessibility.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {dashboardLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 rounded-[1.5rem]" />
                ))
              ) : dashboardError ? (
                <div className="sm:col-span-3">
                  <ErrorState
                    className="min-h-28"
                    description="Workspace summary could not be loaded right now."
                    title="Workspace summary unavailable"
                  />
                </div>
              ) : (
                profileStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4 text-center"
                  >
                    <p className="font-display text-3xl font-semibold">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {dashboardLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-11 w-44 rounded-full" />
                  ))
                : achievements.map(({ id, title }) => {
                    const icon = id === "ach-1" ? Award : id === "ach-2" ? Sparkles : CheckCircle2;
                    const Icon = icon;

                    return (
                      <div
                        key={id}
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-2 text-sm text-muted-foreground"
                      >
                        <Icon className="size-4 text-sky-300" />
                        <span className="font-medium text-foreground">{title}</span>
                      </div>
                    );
                  })}
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {dashboardLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-28 rounded-[1.5rem]" />
                ))
              : dashboardError ? (
                  <div className="sm:col-span-3">
                    <ErrorState
                      className="min-h-28"
                      description="Achievements are unavailable until the workspace summary loads."
                      title="Achievements unavailable"
                    />
                  </div>
                ) : (
                  achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="rounded-[1.5rem] border border-border/60 bg-background/50 p-4"
                    >
                      <p className="font-medium">{achievement.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{achievement.detail}</p>
                    </div>
                  ))
                )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        {historyLoading ? (
          <Skeleton className="h-[28rem] rounded-[1.75rem]" />
        ) : dashboardError ? (
          <ErrorState
            description="Recent activity could not be loaded right now."
            title="Recent activity unavailable"
          />
        ) : (
          <TimelineCard items={timelineEvents} />
        )}
        <div className="space-y-5">
          {reportsLoading ? (
            <Skeleton className="h-[18rem] rounded-[1.75rem]" />
          ) : reportsError ? (
            <ErrorState
              description="Saved reports could not be loaded right now."
              title="Saved reports unavailable"
            />
          ) : favoriteReports.length === 0 ? (
            <EmptyState
              description="Saved reports will appear here once you review report snapshots."
              title="No saved reports"
            />
          ) : (
            <SavedReportsCard items={favoriteReports} title="Saved Reports" />
          )}
          {historyLoading ? (
            <Skeleton className="h-[18rem] rounded-[1.75rem]" />
          ) : dashboardError && pinnedWebsites.length === 0 ? (
            <ErrorState
              description="Favorite websites could not be loaded right now."
              title="Favorite websites unavailable"
            />
          ) : pinnedWebsites.length === 0 ? (
            <EmptyState
              description="Favorite websites will appear here once more analyses are completed."
              title="No favorite websites"
            />
          ) : (
            <WebsiteListCard items={pinnedWebsites} title="Favorite Websites" />
          )}
        </div>
      </section>
    </div>
  );
}
