import api from "@/services/api";
import type { ApiReport, ReportResponse, ReportsResponse } from "@/types/api";

export async function getReports(signal?: AbortSignal) {
  const { data } = await api.get<ReportsResponse>("/reports", {
    signal
  });

  return data.reports;
}

export async function getReportById(reportId: string, signal?: AbortSignal) {
  const { data } = await api.get<ReportResponse>(`/reports/${reportId}`, {
    signal
  });

  return data.report;
}

export async function deleteReportById(reportId: string, signal?: AbortSignal) {
  const { data } = await api.delete<{ message: string }>(`/reports/${reportId}`, {
    signal
  });

  return data;
}

export type { ApiReport };
