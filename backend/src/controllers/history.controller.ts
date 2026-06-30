import type { Request, Response } from "express";

import { getHistory } from "../services/history.service";

export async function getHistoryOverview(request: Request, response: Response) {
  const history = await getHistory(request.user!.id);

  response.status(200).json(history);
}
