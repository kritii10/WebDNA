"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DistributionPoint } from "@/types/dashboard";

type SeoDistributionChartProps = {
  data: DistributionPoint[];
};

export function SeoDistributionChart({ data }: SeoDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              innerRadius={62}
              outerRadius={94}
              paddingAngle={4}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(148,163,184,0.18)",
                borderRadius: "1rem"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid gap-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
                {entry.name}
              </span>
              <span className="font-medium text-foreground">{entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
