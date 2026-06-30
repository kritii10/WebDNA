"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { GlassCard } from "@/components/common/glass-card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const signupSchema = z
  .object({
    name: z.string().min(2, "Enter your full name."),
    email: z.email("Enter a valid email address."),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[0-9]/, "Include at least one number."),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((value) => value, {
      error: "You must accept the terms to continue."
    })
  })
  .refine((values) => values.password === values.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"]
  });

type SignupValues = z.infer<typeof signupSchema>;

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: true
    }
  });

  const password = form.watch("password");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const onSubmit: SubmitHandler<SignupValues> = async () => {
    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsLoading(false);
  };

  return (
    <GlassCard className="w-full max-w-xl border-white/10 bg-card/70 p-7 shadow-[0_30px_100px_-48px_rgba(14,165,233,0.45)] sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-sky-300">Start your workspace</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Create your WebDNA account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Launch a premium website intelligence workflow for your team in minutes.
        </p>
      </div>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            {...form.register("name")}
            className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 text-sm outline-none transition focus:border-sky-400/50"
            id="name"
            placeholder="Maya Chen"
            type="text"
          />
          <p className="text-sm text-rose-300">{form.formState.errors.name?.message}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="signup-email">
            Email
          </label>
          <input
            {...form.register("email")}
            className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 text-sm outline-none transition focus:border-sky-400/50"
            id="signup-email"
            placeholder="you@company.com"
            type="email"
          />
          <p className="text-sm text-rose-300">{form.formState.errors.email?.message}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="signup-password">
            Password
          </label>
          <div className="relative">
            <input
              {...form.register("password")}
              className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 pr-12 text-sm outline-none transition focus:border-sky-400/50"
              id="signup-password"
              placeholder="Create a strong password"
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
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full bg-white/8 transition",
                    strength > index && "bg-[linear-gradient(90deg,#38bdf8,#22c55e)]"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {strength <= 1 && "Add length, uppercase letters, and numbers."}
              {strength === 2 && "Good start. Add a symbol for a stronger password."}
              {strength >= 3 && "Strong password."}
            </p>
          </div>
          <p className="text-sm text-rose-300">
            {form.formState.errors.password?.message}
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...form.register("confirmPassword")}
              className="h-12 w-full rounded-2xl border border-white/10 bg-background/70 px-4 pr-12 text-sm outline-none transition focus:border-sky-400/50"
              id="confirm-password"
              placeholder="Repeat your password"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              onClick={() => setShowConfirmPassword((value) => !value)}
              type="button"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <p className="text-sm text-rose-300">
            {form.formState.errors.confirmPassword?.message}
          </p>
        </div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            {...form.register("acceptTerms")}
            className="mt-0.5 size-4 rounded border-white/10 bg-background/70"
            type="checkbox"
          />
          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>
        <p className="text-sm text-rose-300">
          {form.formState.errors.acceptTerms?.message}
        </p>
        <PrimaryButton className="h-12 w-full" disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : null}
          Create Account
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
          <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
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
        Already have an account?{" "}
        <Link className="text-sky-300 transition hover:text-sky-200" href="/login">
          Sign in
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
