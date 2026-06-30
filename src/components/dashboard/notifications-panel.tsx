import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import { formatRelativeTime } from "@/lib/utils";
import type { NotificationItem } from "@/types/dashboard";

type NotificationsPanelProps = {
  items: NotificationItem[];
};

export function NotificationsPanel({
  items
}: NotificationsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Notifications will appear here as analyses and report shares come in."
            title="No notifications"
          />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border/60 bg-background/50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
                {item.unread ? (
                  <span className="mt-1 size-2.5 rounded-full bg-sky-400" />
                ) : null}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {formatRelativeTime(item.createdAt)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
