import api from "@/services/api";
import type { ApiUser, AuthMeResponse } from "@/types/api";

export async function getCurrentProfile(signal?: AbortSignal) {
  const { data } = await api.get<AuthMeResponse>("/auth/me", {
    signal
  });

  return data.user;
}

export type { ApiUser };
