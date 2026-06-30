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
import type { HealthTrendPoint } from "@/types/dashboard";

type AccessibilityTrendChartProps = {
  data: HealthTrendPoint[];
};

export function AccessibilityTrendChart({
  data
}: AccessibilityTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="accessibilityFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              dataKey="accessibility"
              fill="url(#accessibilityFill)"
              stroke="#f59e0b"
              strokeWidth={2.5}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
