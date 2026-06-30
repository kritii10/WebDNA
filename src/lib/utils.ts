import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatRelativeTime(date: string) {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();
  const minutes = Math.round(diff / (1000 * 60));
  const hours = Math.round(diff / (1000 * 60 * 60));
  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(minutes) < 60) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      minutes,
      "minute"
    );
  }

  if (Math.abs(hours) < 24) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      hours,
      "hour"
    );
  }

  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    days,
    "day"
  );
}
