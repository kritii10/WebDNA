import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { env } from "../config/env";
import type { AuthTokenPayload } from "../types/auth";

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
}
