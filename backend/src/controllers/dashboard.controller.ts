import type { Request, Response } from "express";

import { getDashboard } from "../services/dashboard.service";

export async function getDashboardOverview(request: Request, response: Response) {
  const dashboard = await getDashboard(request.user!.id);

  response.status(200).json({
    dashboard
  });
}
