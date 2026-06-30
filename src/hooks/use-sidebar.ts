"use client";

import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  toggleCollapsed: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggleCollapsed: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed
    }))
}));
