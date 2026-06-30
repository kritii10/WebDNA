import type { Request, Response } from "express";

import {
  deleteReportForUser,
  getReportForUser,
  listReportsForUser
} from "../services/report.service";

function getRouteParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export async function getReports(request: Request, response: Response) {
  const reports = await listReportsForUser(request.user!.id);

  response.status(200).json({
    reports
  });
}

export async function getReport(request: Request, response: Response) {
  const report = await getReportForUser(getRouteParam(request.params.id), request.user!.id);

  response.status(200).json({
    report
  });
}

export async function deleteReport(request: Request, response: Response) {
  const result = await deleteReportForUser(getRouteParam(request.params.id), request.user!.id);

  response.status(200).json(result);
}
