import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/webdna_backend?schema=public"),
  JWT_SECRET: z.string().min(16).default("webdna-dev-jwt-secret-key-please-change"),
  JWT_EXPIRES_IN: z.string().default("7d")
});

const env = envSchema.parse(process.env);

export { env };
