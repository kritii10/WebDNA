import type { Metadata } from "next";

import { AuthShowcase } from "@/components/auth/auth-showcase";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to WebDNA to access premium website intelligence, AI recommendations, and monitoring workflows."
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <AuthShowcase
        description="Sign in to review live website intelligence, recent recommendations, and the next highest-impact improvements for your team."
        title="A sharper view of website performance starts here"
      />
      <section className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_26%)]" />
        <div className="relative z-10 w-full max-w-xl">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
