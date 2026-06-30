import { Globe2 } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WebsiteProject } from "@/types/dashboard";

type WebsiteListCardProps = {
  items: WebsiteProject[];
  title: string;
};

export function WebsiteListCard({ items, title }: WebsiteListCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Pinned websites will appear here after you analyze a few more properties."
            title="No pinned websites"
          />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border/60 bg-background/50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-border/70 bg-background/60 p-2">
                    <Globe2 className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.domain}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    item.status === "Healthy" && "bg-emerald-500/12 text-emerald-300",
                    item.status === "Watchlist" && "bg-amber-500/12 text-amber-300",
                    item.status === "Critical" && "bg-rose-500/12 text-rose-300"
                  )}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Score {item.score}</span>
                <span className="text-muted-foreground">{item.lastAnalysis}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
