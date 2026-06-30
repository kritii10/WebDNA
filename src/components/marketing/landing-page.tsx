"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";

import { AnimatedWrapper } from "@/components/common/animated-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/container";
import { GlassCard } from "@/components/common/glass-card";
import { PrimaryButton } from "@/components/common/primary-button";
import { SectionHeader } from "@/components/common/section-header";
import { SecondaryButton } from "@/components/common/secondary-button";
import { TrafficOverviewChart } from "@/components/charts/traffic-overview-chart";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import {
  aiSuggestions,
  companyLogos,
  comparisonRows,
  faqItems,
  marketingFeatures,
  pricingPlans,
  stats,
  testimonials,
  trustedMetrics
} from "@/data/public-site";
import { trafficOverview } from "@/data/dashboard";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const iconMap = {
  brain: BrainCircuit,
  search: Search,
  accessibility: Accessibility,
  gauge: Gauge,
  sparkles: Sparkles,
  shield: ShieldCheck
} as const;

function AnimatedCounter({
  value,
  suffix,
  label
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = value / (duration / stepTime);
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        window.clearInterval(timer);
        return;
      }
      setCount(Math.round(current));
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [isInView, value]);

  const displayValue = suffix === "/10" ? (count / 10).toFixed(1) : `${count}`;

  return (
    <div ref={ref} className="rounded-[1.75rem] border border-white/10 bg-card/60 p-6 text-center">
      <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {displayValue}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function LandingPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  function handlePointerMove(event: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - rect.left) / rect.width - 0.5);
    mouseY.set((clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className="relative">
      <SiteHeader />
      <main onMouseMove={handlePointerMove}>
        <section className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-14">
          <div className="surface-grid absolute inset-0 opacity-35" />
          <motion.div
            className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-400/18 blur-3xl"
            style={{ x: translateX, y: translateY }}
          />
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <AnimatedWrapper className="relative">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-sky-200 backdrop-blur-xl"
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="size-4" />
                  Trusted by modern growth, SEO, and web teams
                </motion.div>
                <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                  AI-Powered Website Intelligence Platform
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Analyze performance, accessibility, SEO, UX, and trust signals in one premium workspace designed for fast-moving teams.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton asChild className="h-12 px-6">
                    <Link href="/signup">
                      Get Started
                      <ArrowRight className="size-4" />
                    </Link>
                  </PrimaryButton>
                  <SecondaryButton asChild className="h-12 px-6">
                    <Link href="/login">Book a Demo</Link>
                  </SecondaryButton>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {["Live monitoring", "Actionable AI recommendations", "Enterprise-ready UX insights"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </AnimatedWrapper>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                className="relative"
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <GlassCard className="overflow-hidden border-white/10 bg-slate-950/55 p-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">webdna.ai / live intelligence</p>
                        <h2 className="mt-1 font-display text-2xl font-semibold">
                          Growth Command Center
                        </h2>
                      </div>
                      <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                        Monitoring active
                      </div>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {[
                        { label: "Visibility", value: "74.8%", change: "+8.2%" },
                        { label: "Conversions", value: "18.4%", change: "+2.6%" },
                        { label: "Performance", value: "91/100", change: "+5.1%" }
                      ].map((metric) => (
                        <Card key={metric.label} className="border-white/10 bg-white/5">
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <p className="mt-2 font-display text-2xl font-semibold">
                              {metric.value}
                            </p>
                            <p className="mt-2 text-xs text-emerald-300">{metric.change}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="mt-6">
                      <TrafficOverviewChart data={trafficOverview} />
                    </div>
                    <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                      <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-5">
                          <p className="text-sm font-medium">AI recommendations</p>
                          <div className="mt-4 space-y-3">
                            {aiSuggestions.slice(0, 3).map((item) => (
                              <div
                                key={item}
                                className="rounded-2xl border border-white/10 bg-background/50 p-3 text-sm text-muted-foreground"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-white/10 bg-white/5">
                        <CardContent className="p-5">
                          <p className="text-sm font-medium">Recent reports</p>
                          <div className="mt-4 space-y-4">
                            {[
                              ["Technical SEO Health", "Score 91", "Ready"],
                              ["Conversion Journey Analysis", "Score 83", "Needs review"],
                              ["Accessibility Snapshot", "Score 88", "Updated 14m ago"]
                            ].map(([title, detail, badge]) => (
                              <div key={title} className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium">{title}</p>
                                  <p className="text-xs text-muted-foreground">{detail}</p>
                                </div>
                                <span className="rounded-full bg-sky-400/12 px-2.5 py-1 text-xs text-sky-300">
                                  {badge}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="rounded-[2rem] border border-white/10 bg-card/50 px-6 py-8">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
                <div className="grid grid-cols-3 gap-4">
                  {trustedMetrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-display text-3xl font-semibold">{metric.value}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  {companyLogos.map((company) => (
                    <div
                      key={company}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="section-spacing" id="features">
          <Container>
            <SectionHeader
              description="WebDNA combines technical depth with product-level clarity so teams can move from insight to execution faster."
              eyebrow="Features"
              title="Everything your website team needs in one premium workspace"
            />
            <motion.div
              className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              variants={staggerContainer}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {marketingFeatures.map((feature) => {
                const Icon = iconMap[feature.icon];

                return (
                  <motion.div key={feature.title} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}>
                    <Card className="group h-full border-white/10 bg-card/60 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-card/70">
                      <CardContent className="p-6">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-400/12 text-sky-300">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section className="section-spacing" id="preview">
          <Container>
            <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
              <GlassCard className="border-white/10 bg-card/60 p-4 sm:p-6">
                <div className="grid gap-6 xl:grid-cols-[15rem_1fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-background/60 p-5">
                    <p className="font-display text-lg font-semibold">Workspace</p>
                    <div className="mt-5 space-y-2">
                      {["Overview", "Intelligence", "Reports", "Journeys", "Alerts"].map((item, index) => (
                        <div
                          key={item}
                          className={cn(
                            "rounded-2xl px-4 py-3 text-sm",
                            index === 0
                              ? "bg-sky-400/12 text-sky-200"
                              : "text-muted-foreground"
                          )}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-medium">Detected today</p>
                      <p className="mt-2 font-display text-3xl font-semibold">42</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        new opportunities across priority pages
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        ["Crawl health", "98.2%"],
                        ["CTA clarity", "86/100"],
                        ["Trust signals", "Strong"]
                      ].map(([title, value]) => (
                        <Card key={title} className="border-white/10 bg-white/5">
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{title}</p>
                            <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-background/60 p-4">
                      <TrafficOverviewChart data={trafficOverview} />
                    </div>
                  </div>
                </div>
              </GlassCard>
              <div className="space-y-5">
                <SectionHeader
                  description="A realistic preview of how WebDNA brings monitoring, prioritization, and communication into one workflow."
                  eyebrow="Live Product Preview"
                  title="A dashboard your team will actually want to open every morning"
                />
                <Card className="border-white/10 bg-card/60">
                  <CardContent className="space-y-4 p-6">
                    {[
                      ["Homepage hero too heavy", "Potential LCP recovery: 0.6s"],
                      ["Pricing CTA blend issue", "Contrast below WCAG AA on mobile"],
                      ["Comparison pages missing meta descriptions", "Estimated CTR lift: 8-11%"]
                    ].map(([title, detail]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-background/50 p-4"
                      >
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <SectionHeader
              description="From URL to prioritized action plan in three elegant steps."
              eyebrow="How It Works"
              title="Fast enough for rapid teams, deep enough for serious decisions"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                ["01", "Enter Website", "Add your domain and tell WebDNA which pages, journeys, or markets matter most."],
                ["02", "AI Analysis", "Our engine scans structure, speed, accessibility, search signals, and conversion friction."],
                ["03", "Receive Insights", "Get ranked recommendations, trend visibility, and shareable reports your team can act on."]
              ].map(([step, title, description], index) => (
                <div key={step} className="relative">
                  <GlassCard className="h-full border-white/10 bg-card/60 p-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-400/12 font-display text-lg font-semibold text-sky-300">
                      {step}
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="h-36 rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                    </div>
                  </GlassCard>
                  {index < 2 ? (
                    <div className="hidden lg:flex lg:absolute lg:right-[-14px] lg:top-1/2 lg:-translate-y-1/2 lg:text-sky-300">
                      <ArrowRight className="size-5" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <SectionHeader
              description="The difference between a static audit and a living intelligence system."
              eyebrow="Why WebDNA"
              title="Built for teams who need more than one-off website reviews"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <Card className="border-white/10 bg-card/40">
                <CardContent className="p-6">
                  <h3 className="font-display text-2xl font-semibold">Traditional Website Audits</h3>
                  <div className="mt-6 space-y-4">
                    {comparisonRows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                        <p className="text-sm font-medium">{row.label}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{row.traditional}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <GlassCard className="border-sky-400/20 bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(15,23,42,0.24))] p-6">
                <h3 className="font-display text-2xl font-semibold">WebDNA</h3>
                <div className="mt-6 space-y-4">
                  {comparisonRows.map((row) => (
                    <div key={row.label} className="rounded-2xl border border-sky-400/18 bg-background/40 p-4">
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="mt-2 text-sm text-sky-100/85">{row.webdna}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <SectionHeader
                description="Not generic tips. Real recommendations shaped by website behavior, technical health, and conversion context."
                eyebrow="AI Suggestions Preview"
                title="Specific, realistic guidance your team can put into motion immediately"
              />
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion}
                    className="rounded-[1.5rem] border border-white/10 bg-card/60 p-5"
                    initial={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-full bg-sky-400/12 p-2 text-sky-300">
                        <Sparkles className="size-4" />
                      </div>
                      <div>
                        <p className="font-medium">{suggestion}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Estimated impact: {index % 2 === 0 ? "High" : "Medium"} priority based on current page performance signals.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <SectionHeader
              description="Teams across markets rely on WebDNA to make website quality measurable and repeatable."
              eyebrow="Statistics"
              title="Proof points that turn confidence into adoption"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  label={stat.label}
                  suffix={stat.suffix}
                  value={stat.value}
                />
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing">
          <Container>
            <SectionHeader
              description="Real teams using WebDNA to improve site quality, speed, and growth clarity."
              eyebrow="Testimonials"
              title="Loved by teams that care about craft and outcomes"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="border-white/10 bg-card/60">
                  <CardContent className="p-6">
                    <div className="flex gap-1 text-amber-300">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      “{testimonial.quote}”
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar className="size-11">
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing" id="pricing">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeader
                description="Flexible pricing for focused teams, scaling organizations, and enterprise web operations."
                eyebrow="Pricing"
                title="Plans built for every stage of website maturity"
              />
              <div className="inline-flex rounded-full border border-white/10 bg-card/50 p-1 text-sm">
                <button className="rounded-full bg-sky-400/12 px-4 py-2 text-sky-200" type="button">
                  Monthly
                </button>
                <button className="rounded-full px-4 py-2 text-muted-foreground" type="button">
                  Annual
                </button>
              </div>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <GlassCard
                  key={plan.name}
                  className={cn(
                    "h-full border-white/10 bg-card/60 p-6",
                    plan.highlighted &&
                      "border-sky-400/25 bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(255,255,255,0.03))]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    {plan.highlighted ? (
                      <span className="rounded-full bg-sky-400/14 px-3 py-1 text-xs font-semibold text-sky-200">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-6">
                    <span className="font-display text-4xl font-semibold">{plan.price}</span>
                    {plan.price !== "Custom" ? (
                      <span className="ml-2 text-sm text-muted-foreground">/ month</span>
                    ) : null}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <PrimaryButton asChild className="mt-8 h-12 w-full">
                    <Link href="/signup">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Link>
                  </PrimaryButton>
                </GlassCard>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-spacing" id="faq">
          <Container>
            <SectionHeader
              description="Answers to the questions most teams ask before centralizing their website intelligence workflow."
              eyebrow="FAQ"
              title="Everything you need to know before getting started"
            />
            <div className="mt-10 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-[1.5rem] border border-white/10 bg-card/60 p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {item.question}
                    <ChevronDown className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-24 pt-10">
          <Container>
            <GlassCard className="overflow-hidden border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(34,197,94,0.14),rgba(15,23,42,0.55))] p-8 sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium uppercase tracking-[0.26em] text-sky-200">
                    Final CTA
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    Turn your website into a measurable growth advantage
                  </h2>
                  <p className="mt-4 text-base leading-8 text-sky-50/78">
                    Join teams using WebDNA to uncover issues faster, prioritize what matters, and improve the digital experience with confidence.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton asChild className="h-12 px-6">
                    <Link href="/signup">Start Free Trial</Link>
                  </PrimaryButton>
                  <SecondaryButton asChild className="h-12 px-6">
                    <Link href="/login">Talk to Sales</Link>
                  </SecondaryButton>
                </div>
              </div>
            </GlassCard>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
