import type { User } from "@prisma/client";

import { prisma } from "../config/prisma";
import { AppError } from "../utils/app-error";
import { signAuthToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import type { AuthResponse, AuthenticatedUser, LoginInput, RegisterInput } from "../types/auth";

function toAuthenticatedUser(user: User): AuthenticatedUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function createAuthResponse(user: User): AuthResponse {
  return {
    user: toAuthenticatedUser(user),
    token: signAuthToken({
      sub: user.id,
      email: user.email,
      name: user.name
    })
  };
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const email = input.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new AppError("Email is already in use", 409);
  }

  const user = await prisma.user.create({
    data: {
      name: input.name.trim(),
      email,
      password: await hashPassword(input.password)
    }
  });

  return createAuthResponse(user);
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  const email = input.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return createAuthResponse(user);
}

export async function getCurrentUser(userId: string): Promise<AuthenticatedUser> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return toAuthenticatedUser(user);
}
