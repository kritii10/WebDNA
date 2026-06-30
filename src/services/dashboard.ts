import api from "@/services/api";
import type { DashboardResponse } from "@/types/api";

export async function getDashboardOverview(signal?: AbortSignal) {
  const { data } = await api.get<{ dashboard: DashboardResponse }>("/dashboard", {
    signal
  });

  return data.dashboard;
}
