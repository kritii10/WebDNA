import type { Metadata } from "next";

import { AuthShowcase } from "@/components/auth/auth-showcase";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = {
  title: "Signup",
  description:
    "Create your WebDNA account to start analyzing website performance, accessibility, UX, and SEO with AI-driven clarity."
};

export default function SignupPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <AuthShowcase
        description="Create your account and launch a premium workflow for monitoring, prioritizing, and improving the customer journey across every page."
        title="Build a website intelligence workflow your whole team can trust"
      />
      <section className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_26%)]" />
        <div className="relative z-10 w-full max-w-xl">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
