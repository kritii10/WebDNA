import { Router } from "express";

import { getHistoryOverview } from "../controllers/history.controller";
import { requireAuth } from "../middleware/auth.middleware";

const historyRouter = Router();

historyRouter.get("/", requireAuth, getHistoryOverview);

export { historyRouter };
