import { Router } from "express";

import { deleteReport, getReport, getReports } from "../controllers/report.controller";
import { requireAuth } from "../middleware/auth.middleware";

const reportRouter = Router();

reportRouter.get("/", requireAuth, getReports);
reportRouter.get("/:id", requireAuth, getReport);
reportRouter.delete("/:id", requireAuth, deleteReport);

export { reportRouter };
