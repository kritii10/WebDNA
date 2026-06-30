import type { Request, Response } from "express";

import { getCurrentUser, loginUser, registerUser } from "../services/auth.service";

export async function register(request: Request, response: Response) {
  const result = await registerUser(request.body);

  response.status(201).json(result);
}

export async function login(request: Request, response: Response) {
  const result = await loginUser(request.body);

  response.status(200).json(result);
}

export async function me(request: Request, response: Response) {
  const user = await getCurrentUser(request.user?.id ?? "");

  response.status(200).json({
    user
  });
}
