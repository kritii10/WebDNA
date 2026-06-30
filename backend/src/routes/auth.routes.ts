import { Router } from "express";

import { login, me, register } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../utils/validation-schemas";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/me", requireAuth, me);

export { authRouter };
