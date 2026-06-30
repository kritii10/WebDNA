import api from "@/services/api";
import type { HistoryResponse } from "@/types/api";

export async function getHistoryOverview(signal?: AbortSignal) {
  const { data } = await api.get<HistoryResponse>("/history", {
    signal
  });

  return data;
}
