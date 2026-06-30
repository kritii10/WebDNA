import type { Request, Response } from "express";

import { analyzeWebsite } from "../services/analysis.service";

export async function createAnalysis(request: Request, response: Response) {
  const result = await analyzeWebsite(request.user!.id, request.body);

  response.status(201).json(result);
}
