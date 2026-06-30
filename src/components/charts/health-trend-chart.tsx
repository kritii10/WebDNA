"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HealthTrendPoint } from "@/types/dashboard";

type HealthTrendChartProps = {
  data: HealthTrendPoint[];
  title?: string;
};

export function HealthTrendChart({
  data,
  title = "Website Health Trend"
}: HealthTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(148,163,184,0.16)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="period"
              tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              domain={[60, 100]}
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
            <Line dataKey="overall" dot={false} stroke="#38bdf8" strokeWidth={2.5} type="monotone" />
            <Line dataKey="performance" dot={false} stroke="#22c55e" strokeWidth={2} type="monotone" />
            <Line dataKey="seo" dot={false} stroke="#a78bfa" strokeWidth={2} type="monotone" />
            <Line dataKey="accessibility" dot={false} stroke="#f59e0b" strokeWidth={2} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
