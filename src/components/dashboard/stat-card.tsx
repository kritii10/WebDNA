import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { DashboardMetric, KPI } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type StatCardProps = {
  item: KPI | DashboardMetric;
};

export function StatCard({ item }: StatCardProps) {
  const isPositive = item.direction === "up";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="overflow-hidden">
      <CardContent className="relative space-y-4 p-6">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="space-y-1">
          <CardDescription>{item.label}</CardDescription>
          <CardTitle className="text-3xl">{item.value}</CardTitle>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/12 text-emerald-300"
                : "bg-rose-500/12 text-rose-300"
            )}
          >
            <TrendIcon className="size-3.5" />
            {"change" in item ? item.change : item.trend}
          </span>
          <p className="max-w-[18rem] text-right text-xs text-muted-foreground">
            {item.detail}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
