import { Router } from "express";

import { createAnalysis } from "../controllers/analysis.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validation.middleware";
import { analyzeWebsiteSchema } from "../utils/validation-schemas";

const analysisRouter = Router();

analysisRouter.post("/", requireAuth, validateBody(analyzeWebsiteSchema), createAnalysis);

export { analysisRouter };
