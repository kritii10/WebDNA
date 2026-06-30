import { Router } from "express";

import { getDashboardOverview } from "../controllers/dashboard.controller";
import { requireAuth } from "../middleware/auth.middleware";

const dashboardRouter = Router();

dashboardRouter.get("/", requireAuth, getDashboardOverview);

export { dashboardRouter };
