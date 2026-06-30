import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuickAction } from "@/types/dashboard";

type QuickActionsCardProps = {
  items: QuickAction[];
};

export function QuickActionsCard({ items }: QuickActionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            className="rounded-2xl border border-border/60 bg-background/50 p-4 transition hover:-translate-y-0.5 hover:border-sky-400/30"
            href={item.href}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ArrowUpRight className="size-4 text-sky-300" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
