"use client";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { CheckCircle2, Clock3, Sparkles, WandSparkles } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { GlassCard } from "@/components/common/glass-card";
import { PageHeader } from "@/components/common/page-header";
import { PrimaryButton } from "@/components/common/primary-button";
import { SecondaryButton } from "@/components/common/secondary-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { suggestedUrls, recentUrls, analysisTimeline } from "@/data";
import { cn } from "@/lib/utils";

const loadingSteps = [
  "Initializing crawl agents",
  "Scanning performance budgets",
  "Evaluating content structure",
  "Ranking recommendations"
] as const;

export function AnalyzeWorkspace() {
  const router = useRouter();
  const [url, setUrl] = useState("https://webdna.ai");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const stepLabel = useMemo(() => loadingSteps[stepIndex] ?? loadingSteps[0], [stepIndex]);

  async function handleAnalyze() {
  try {
    setIsAnalyzing(true);
    setIsSuccess(false);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    const response = await api.post(
      "/analysis",
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  console.log(response.data);
  setIsAnalyzing(false);
  setIsSuccess(true);

  router.push(`/reports/${response.data.report.id}`);
    console.log("Analysis Response:", response.data);

    setStepIndex(loadingSteps.length - 1);
    setIsAnalyzing(false);
    setIsSuccess(true);

    // We'll connect this later
    // router.push(`/reports/${response.data.analysis.id}`);
  } catch (error) {
    console.error(error);

    const message = axios.isAxiosError<{ message?: string }>(error)
      ? error.response?.data?.message
      : null;

    alert(message ?? "Analysis failed.");

    setIsAnalyzing(false);
    setIsSuccess(false);
  }
}
  return (
    <div className="space-y-6">
      <PageHeader
        actions={<SecondaryButton>View Latest Reports</SecondaryButton>}
        description="Launch a fresh AI analysis with one URL and get a full technical, UX, and growth-oriented review."
        title="Analyze Website"
      />

      <GlassCard className="overflow-hidden border-white/10 bg-card/60 p-6 sm:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-sky-300">Start a new scan</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Paste a production URL and let WebDNA do the heavy lifting
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Website URL"
                className="h-14 flex-1 rounded-[1.25rem] border border-white/10 bg-background/70 px-5 text-sm outline-none transition focus:border-sky-400/50"
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://yourcompany.com"
                value={url}
              />
              <PrimaryButton
                className="h-14 px-6"
                disabled={!url || isAnalyzing}
                onClick={handleAnalyze}
                type="button"
              >
                <WandSparkles className="size-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Website"}
              </PrimaryButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-white/10 bg-background/50">
                <CardHeader>
                  <CardTitle>Suggested URLs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestedUrls.map((item) => (
                    <button
                      key={item}
                      className="w-full rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-left text-sm text-muted-foreground transition hover:border-sky-400/30 hover:text-foreground"
                      onClick={() => setUrl(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-background/50">
                <CardHeader>
                  <CardTitle>Recent URLs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUrls.map((item) => (
                    <button
                      key={item}
                      className="w-full rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-left text-sm text-muted-foreground transition hover:border-sky-400/30 hover:text-foreground"
                      onClick={() => setUrl(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="border-white/10 bg-background/50">
            <CardHeader>
              <CardTitle>Analysis Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisTimeline.map((step) => (
                <div key={step.id} className="flex gap-3">
                  <div
                    className={cn(
                      "mt-1 size-3 rounded-full",
                      step.status === "complete" && "bg-emerald-400",
                      step.status === "active" && "bg-sky-400",
                      step.status === "pending" && "bg-border"
                    )}
                  />
                  <div>
                    <p className="font-medium">{step.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </GlassCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle>Analysis Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="space-y-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-background/40 p-5">
                  <div className="flex items-center gap-3 text-sky-300">
                    <Clock3 className="size-4" />
                    <p className="text-sm font-medium">{stepLabel}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      animate={{ width: `${((stepIndex + 1) / loadingSteps.length) * 100}%` }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#22c55e)]"
                      initial={{ width: 0 }}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {loadingSteps.map((item, index) => (
                    <div
                      key={item}
                      className={cn(
                        "rounded-2xl border border-white/10 p-4 text-sm transition",
                        index <= stepIndex
                          ? "bg-sky-400/10 text-foreground"
                          : "bg-background/40 text-muted-foreground"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : isSuccess ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-6"
                initial={{ opacity: 0, scale: 0.98 }}
              >
                <div className="flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="size-5" />
                  <p className="font-medium">Analysis complete</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  WebDNA finished reviewing {url}. A new report is ready with prioritized performance, SEO, accessibility, UX, and security recommendations.
                </p>
                <div className="mt-5">
                  <PrimaryButton>Open Report</PrimaryButton>
                </div>
              </motion.div>
            ) : (
              <EmptyState
                description="Run a fresh scan to see the analysis timeline, recommendation synthesis, and export-ready result state."
                title="No active analysis yet"
              />
            )}
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-card/60">
          <CardHeader>
            <CardTitle>What the analysis includes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Technical crawl and indexability review",
              "Performance and Core Web Vitals profiling",
              "Accessibility and semantics coverage",
              "UX friction mapping across key journeys",
              "AI-prioritized opportunities tied to business impact"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-4">
                <Sparkles className="mt-0.5 size-4 text-sky-300" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
