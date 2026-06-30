"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RadarMetric } from "@/types/dashboard";

type RadarScoreChartProps = {
  data: RadarMetric[];
  title?: string;
};

export function RadarScoreChart({
  data,
  title = "Radar Overview"
}: RadarScoreChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(148,163,184,0.18)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
            />
            <Radar
              dataKey="benchmark"
              fill="#64748b"
              fillOpacity={0.1}
              stroke="#94a3b8"
              strokeWidth={1.5}
            />
            <Radar
              dataKey="current"
              fill="#38bdf8"
              fillOpacity={0.3}
              stroke="#38bdf8"
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
