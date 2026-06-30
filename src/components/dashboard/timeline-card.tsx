import { Activity, AlertTriangle, CheckCircle2, Users2 } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import type { TimelineEvent } from "@/types/dashboard";

const iconMap = {
  report: Activity,
  fix: CheckCircle2,
  alert: AlertTriangle,
  collaboration: Users2
} as const;

type TimelineCardProps = {
  items: TimelineEvent[];
};

export function TimelineCard({ items }: TimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Recent timeline entries will appear here as your team analyzes more websites."
            title="No activity timeline"
          />
        ) : (
          items.map((item) => {
            const Icon = iconMap[item.type];

            return (
              <div key={item.id} className="flex gap-4">
                <div className="mt-0.5 rounded-full border border-border/70 bg-background/60 p-2 text-sky-300">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 border-b border-border/40 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(item.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-sky-300">
                    {item.actor}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
