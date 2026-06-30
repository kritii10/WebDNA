import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { analysisRouter } from "./routes/analysis.routes";
import { authRouter } from "./routes/auth.routes";
import { dashboardRouter } from "./routes/dashboard.routes";
import { historyRouter } from "./routes/history.routes";
import { reportRouter } from "./routes/report.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_ORIGIN
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/analysis", analysisRouter);
app.use("/reports", reportRouter);
app.use("/dashboard", dashboardRouter);
app.use("/history", historyRouter);

app.get("/", (_request, response) => {
  response.status(200).json({
    message: "Backend Running"
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
