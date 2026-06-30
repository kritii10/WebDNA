import {
  BellRing,
  ChartColumnIncreasing,
  LayoutDashboard,
  SearchCode,
  Sparkles
} from "lucide-react";

export const appIcons = {
  dashboard: LayoutDashboard,
  intelligence: SearchCode,
  reports: ChartColumnIncreasing,
  notifications: BellRing,
  suggestions: Sparkles
} as const;
