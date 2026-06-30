import { Sparkles } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AISuggestion } from "@/types/dashboard";

type AISuggestionsListProps = {
  items: AISuggestion[];
};

export function AISuggestionsList({
  items
}: AISuggestionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            className="min-h-40"
            description="AI suggestions will appear here once the recommendation engine is connected."
            title="No AI suggestions"
          />
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border/60 bg-background/50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-sky-400/12 p-2 text-sky-300">
                    <Sparkles className="size-4" />
                  </div>
                  <p className="font-medium text-foreground">{item.title}</p>
                </div>
                <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  {item.impact}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                Confidence {Math.round(item.confidence * 100)}%
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
