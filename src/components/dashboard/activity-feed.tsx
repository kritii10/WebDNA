import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { formatRelativeTime } from "@/lib/utils";
import type { ActivityItem } from "@/types/dashboard";

type ActivityFeedProps = {
  items: ActivityItem[];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Recent activity will appear here once your workspace starts receiving new analyses."
            title="No recent activity"
          />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border/60 bg-background/50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-foreground">{item.title}</p>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(item.createdAt)}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
