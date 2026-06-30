"use client";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { GlassCard } from "@/components/common/glass-card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean()
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password
      });

      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : null;

      alert(message ?? "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <GlassCard className="w-full max-w-xl border-white/10 bg-card/70 p-7 shadow-[0_30px_100px_-48px_rgba(14,165,233,0.45)] sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-300">Welcome back</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Sign in to your workspace
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review website intelligence, prioritize fixes, and keep your team aligned.
        </p>
      </div>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            {...form.register("email")}
            className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 text-sm outline-none transition focus:border-sky-400/50"
            id="email"
            placeholder="you@company.com"
            type="email"
          />
          <p className="text-sm text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              {...form.register("password")}
              className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 pr-12 text-sm outline-none transition focus:border-sky-400/50"
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              onClick={() => setShowPassword((value) => !value)}
              type="button"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p className="text-sm text-rose-300">
            {form.formState.errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              {...form.register("remember")}
              className="size-4 rounded border-white/10 bg-background/70"
              type="checkbox"
            />
            Remember me
          </label>
          <Link className="text-sm text-sky-300 transition hover:text-sky-200" href="#">
            Forgot password?
          </Link>
        </div>
        <PrimaryButton className="h-12 w-full" disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : null}
          Sign In
        </PrimaryButton>
      </form>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SecondaryButton className="h-12">
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.805 10.023h-9.82v3.955h5.627c-.242 1.27-.967 2.345-2.06 3.067v2.55h3.333c1.95-1.795 3.08-4.438 3.08-7.572 0-.662-.06-1.299-.16-2Z"
              fill="currentColor"
            />
            <path
              d="M11.984 22c2.79 0 5.134-.924 6.845-2.507l-3.333-2.55c-.924.618-2.106.983-3.512.983-2.697 0-4.98-1.82-5.796-4.267H2.747v2.63A10.337 10.337 0 0 0 11.984 22Z"
              fill="currentColor"
              opacity=".8"
            />
            <path
              d="M6.188 13.66a6.183 6.183 0 0 1-.324-1.96c0-.68.118-1.34.324-1.96V7.11H2.747A10.337 10.337 0 0 0 1.647 11.7c0 1.65.395 3.213 1.1 4.59l3.441-2.63Z"
              fill="currentColor"
              opacity=".6"
            />
            <path
              d="M11.984 5.475c1.524 0 2.892.525 3.97 1.553l2.975-2.974C17.11 2.348 14.773 1.4 11.984 1.4a10.337 10.337 0 0 0-9.237 5.71l3.441 2.63c.817-2.447 3.1-4.265 5.796-4.265Z"
              fill="currentColor"
              opacity=".9"
            />
          </svg>
          Continue with Google
        </SecondaryButton>
        <SecondaryButton className="h-12">
          <Github className="size-4" />
          Continue with GitHub
        </SecondaryButton>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to WebDNA?{" "}
        <Link className="text-sky-300 transition hover:text-sky-200" href="/signup">
          Create an account
        </Link>
      </p>
      <div className="mt-4 flex justify-center lg:hidden">
        <Button asChild size="sm" variant="ghost">
          <Link href="/">Back to website</Link>
        </Button>
      </div>
    </GlassCard>
  );
}
