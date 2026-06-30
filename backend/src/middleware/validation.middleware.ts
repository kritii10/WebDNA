import type { RequestHandler } from "express";
import type { ZodTypeAny } from "zod";

export function validateBody(schema: ZodTypeAny): RequestHandler {
  return (request, response, next) => {
    const parsed = schema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        message: "Validation failed",
        issues: parsed.error.flatten()
      });
      return;
    }

    request.body = parsed.data;
    next();
  };
}
