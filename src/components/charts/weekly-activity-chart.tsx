"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeeklyActivityPoint } from "@/types/dashboard";

type WeeklyActivityChartProps = {
  data: WeeklyActivityPoint[];
};

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke="rgba(148,163,184,0.16)" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="day"
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
            <Bar dataKey="analyses" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            <Line dataKey="fixes" dot={false} stroke="#22c55e" strokeWidth={2.5} type="monotone" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
