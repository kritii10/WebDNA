import type { TrafficPoint } from "@/types/dashboard";

export function getTrafficPeak(points: TrafficPoint[]) {
  return points.reduce((peak, point) => {
    const candidate = Math.max(point.organic, point.paid, point.conversions);
    return candidate > peak ? candidate : peak;
  }, 0);
}
