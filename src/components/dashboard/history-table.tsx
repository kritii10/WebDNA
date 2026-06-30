"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, Filter, Search, Star, Trash2 } from "lucide-react";

import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatRelativeTime } from "@/lib/utils";
import { getApiErrorMessage } from "@/lib/api-error";
import { getHistoryOverview } from "@/services/history";
import { getCurrentProfile } from "@/services/profile";
import { deleteReportById } from "@/services/reports";
import type { ApiReport } from "@/types/api";
import { toHistoryRecord } from "@/lib/api-mappers";

const STATUS_OPTIONS = ["All", "Ready", "Processing", "Needs Review"] as const;

export function HistoryTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>("All");
  const [reports, setReports] = useState<ApiReport[]>([]);
  const [ownerName, setOwnerName] = useState("Platform AI");
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHistory() {
      setHistoryLoading(true);
      setHistoryError(null);

      try {
        const historyResponse = await getHistoryOverview(controller.signal);
        setReports(historyResponse.reports);
      } catch (loadError) {
        setHistoryError(getApiErrorMessage(loadError, "Unable to load report history."));
      } finally {
        setHistoryLoading(false);
      }
    }

    loadHistory();

    return () => controller.abort();
  }, [reloadToken]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      setProfileError(null);

      try {
        const profileResponse = await getCurrentProfile(controller.signal);
        setOwnerName(profileResponse.name);
      } catch (loadError) {
        setProfileError(getApiErrorMessage(loadError, "Unable to load profile details."));
      }
    }

    loadProfile();

    return () => controller.abort();
  }, [reloadToken]);

  const historyRecords = useMemo(
    () => reports.map((report) => toHistoryRecord(report, ownerName)),
    [reports, ownerName]
  );

  const filtered = useMemo(() => {
    return historyRecords.filter((item) => {
      const matchesQuery =
        item.website.toLowerCase().includes(query.toLowerCase()) ||
        item.url.toLowerCase().includes(query.toLowerCase()) ||
        item.owner.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [historyRecords, query, statusFilter]);

  async function handleDelete(reportId: string) {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Delete this report? This action cannot be undone.")
    ) {
      return;
    }

    try {
      await deleteReportById(reportId);
      setReloadToken((value) => value + 1);
    } catch (deleteError) {
      setHistoryError(getApiErrorMessage(deleteError, "Unable to delete the selected report."));
    }
  }

  const isLoading = historyLoading;
  const error = historyError ?? profileError;

  return (
    <div className="space-y-6">
      <PageHeader
        description="Browse prior analyses, favorite important snapshots, and reopen reports without leaving your workspace."
        title="History"
      />

      {error ? (
        <ErrorState
          description={error}
          onAction={() => setReloadToken((value) => value + 1)}
          title={historyError ? "History unavailable" : "Profile details unavailable"}
        />
      ) : null}

      <Card className="border-white/10 bg-card/60">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="focus-shell flex h-11 w-full items-center gap-3 rounded-2xl border border-border/60 bg-background/50 px-4 text-sm text-muted-foreground lg:max-w-md">
              <Search className="size-4" />
              <input
                className="w-full bg-transparent outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search websites, URLs, or owners"
                value={query}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Modal>
                <ModalTrigger asChild>
                  <Button size="sm" variant="secondary">
                    <Filter className="size-4" />
                    Filters
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Filter Reports</ModalTitle>
                    <ModalDescription>
                      Narrow history by workflow state and ownership.
                    </ModalDescription>
                  </ModalHeader>
                  <div className="space-y-3">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        className={cn(
                          "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition",
                          statusFilter === status
                            ? "border-sky-400/30 bg-sky-400/10 text-foreground"
                            : "border-border/60 bg-background/50 text-muted-foreground"
                        )}
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        type="button"
                      >
                        {status}
                        {statusFilter === status ? <span className="text-sky-300">Active</span> : null}
                      </button>
                    ))}
                  </div>
                </ModalContent>
              </Modal>
              {STATUS_OPTIONS.map((status) => (
                <Button
                  key={status}
                  className={cn(statusFilter === status && "border-sky-400/30 text-foreground")}
                  onClick={() => setStatusFilter(status)}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[52rem] text-left">
              <thead className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <tr>
                  <th className="pb-4 font-medium">Website</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">
                    <span className="inline-flex items-center gap-2">
                      Score
                      <ArrowUpDown className="size-3.5" />
                    </span>
                  </th>
                  <th className="pb-4 font-medium">Owner</th>
                  <th className="pb-4 font-medium">
                    <span className="inline-flex items-center gap-2">
                      Created
                      <ArrowUpDown className="size-3.5" />
                    </span>
                  </th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-t border-border/50">
                      <td className="py-4 pr-4">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="mt-2 h-4 w-56" />
                      </td>
                      <td className="py-4 pr-4">
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </td>
                      <td className="py-4 pr-4">
                        <Skeleton className="h-5 w-12" />
                      </td>
                      <td className="py-4 pr-4">
                        <Skeleton className="h-5 w-28" />
                      </td>
                      <td className="py-4 pr-4">
                        <Skeleton className="h-5 w-24" />
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-9 w-9 rounded-full" />
                          <Skeleton className="h-9 w-9 rounded-full" />
                          <Skeleton className="h-9 w-24 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? null : (
                  filtered.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-border/50 transition hover:bg-background/35"
                    >
                      <td className="py-4 pr-4">
                        <div>
                          <p className="font-medium">{item.website}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{item.url}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            item.status === "Ready" && "bg-emerald-500/12 text-emerald-300",
                            item.status === "Processing" && "bg-sky-400/12 text-sky-300",
                            item.status === "Needs Review" && "bg-amber-500/12 text-amber-300"
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-foreground">{item.score}</td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground">{item.owner}</td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground">
                        {formatRelativeTime(item.createdAt)}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            aria-label={`Favorite ${item.website}`}
                            size="sm"
                            variant="ghost"
                            type="button"
                          >
                            <Star
                              className={cn("size-4", item.favorite && "fill-current text-amber-300")}
                            />
                          </Button>
                          <Button
                            aria-label={`Delete ${item.website}`}
                            onClick={() => handleDelete(item.id)}
                            size="sm"
                            variant="ghost"
                            type="button"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                          <Button asChild size="sm" variant="secondary">
                            <Link href={`/reports/${item.id}`}>Open Report</Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoading && filtered.length === 0 ? (
            <div className="mt-5">
              <EmptyState
                description="No reports match your current search and filter combination."
                title="Nothing matches"
              />
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 border-t border-border/50 pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filtered.length} of {historyRecords.length} reports
              </p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary">
                Previous
              </Button>
              <Button size="sm" variant="secondary">
                1
              </Button>
              <Button size="sm" variant="secondary">
                2
              </Button>
              <Button size="sm" variant="secondary">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
