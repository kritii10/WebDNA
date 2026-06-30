"use client";

import { create } from "zustand";

type DashboardFiltersState = {
  query: string;
  setQuery: (query: string) => void;
};

export const useDashboardFilters = create<DashboardFiltersState>((set) => ({
  query: "",
  setQuery: (query) => set({ query })
}));
