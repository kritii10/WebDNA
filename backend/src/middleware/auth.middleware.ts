import type { RequestHandler } from "express";

import { prisma } from "../config/prisma";
import { AppError } from "../utils/app-error";
import { verifyAuthToken } from "../utils/jwt";

export const requireAuth: RequestHandler = async (request, _response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    });

    if (!user) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    request.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};
