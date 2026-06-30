import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FileSearch,
  History,
  LayoutDashboard,
  Settings,
  UserCircle2,
  WandSparkles
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export const primaryNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Analyze Website",
    href: "/analyze",
    icon: WandSparkles
  },
  {
    title: "Report Details",
    href: "/reports/r-001",
    icon: FileSearch
  },
  {
    title: "History",
    href: "/history",
    icon: History
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle2
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    title: "Analytics",
    href: "/dashboard#analytics",
    icon: BarChart3,
    badge: "Live"
  }
];
