import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { AppError } from "../utils/app-error";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation failed",
      issues: error.flatten()
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      message: error.message
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      response.status(409).json({
        message: "Resource already exists"
      });
      return;
    }
  }

  response.status(500).json({
    message: "Internal Server Error"
  });
};
