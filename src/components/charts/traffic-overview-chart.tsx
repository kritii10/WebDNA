"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrafficPoint } from "@/types/dashboard";

type TrafficOverviewChartProps = {
  data: TrafficPoint[];
};

export function TrafficOverviewChart({
  data
}: TrafficOverviewChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[22rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="organic" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="paid" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={{ fill: "rgba(148, 163, 184, 0.9)", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "rgba(148, 163, 184, 0.9)", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                borderRadius: "1rem"
              }}
            />
            <Area
              dataKey="organic"
              fill="url(#organic)"
              stroke="#38bdf8"
              strokeWidth={2}
              type="monotone"
            />
            <Area
              dataKey="paid"
              fill="url(#paid)"
              stroke="#22c55e"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
