import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SavedReport } from "@/types/dashboard";

type SavedReportsCardProps = {
  items: SavedReport[];
  title: string;
};

export function SavedReportsCard({ items, title }: SavedReportsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="Saved reports will appear here after you mark reports as favorites."
            title="No saved reports"
          />
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              className="block rounded-2xl border border-border/60 bg-background/50 p-4 transition hover:-translate-y-0.5 hover:border-sky-400/30"
              href={`/reports/${item.id}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.website}</p>
                </div>
                <div className="flex items-center gap-2 text-sky-300">
                  <Star className="size-4 fill-current" />
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Score {item.score}</span>
                <span>{item.updatedAt}</span>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
