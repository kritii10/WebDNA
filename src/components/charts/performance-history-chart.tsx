"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PerformanceHistoryPoint } from "@/types/dashboard";

type PerformanceHistoryChartProps = {
  data: PerformanceHistoryPoint[];
};

export function PerformanceHistoryChart({
  data
}: PerformanceHistoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance History</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(148,163,184,0.16)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="period"
              tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(148,163,184,0.18)",
                borderRadius: "1rem"
              }}
            />
            <Legend />
            <Bar dataKey="lcp" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            <Bar dataKey="cls" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="ttfb" fill="#a78bfa" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
