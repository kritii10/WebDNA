import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/empty-state";
import type { ReportSummary } from "@/types/dashboard";

type ReportsListProps = {
  items: ReportSummary[];
};

export function ReportsList({ items }: ReportsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Reports will appear here after the first analysis completes."
            title="No reports available"
          />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.owner} • Score {item.score}
                </p>
              </div>
              <span className="rounded-full bg-sky-400/12 px-3 py-1 text-xs font-semibold text-sky-300">
                {item.status}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
