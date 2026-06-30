"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { APP_NAME, APP_TAGLINE } from "@/constants/app";
import { primaryNavigation } from "@/constants/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close, isCollapsed } = useSidebar();

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm transition lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[18rem] flex-col border-r border-border/60 bg-card/92 px-4 py-4 backdrop-blur-2xl transition-all lg:translate-x-0",
          isCollapsed && "lg:w-[6rem]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-start justify-between gap-3 px-2">
          <div>
            <Link className="font-display text-2xl font-semibold tracking-tight" href="/dashboard">
              {APP_NAME}
            </Link>
            {!isCollapsed ? (
              <p className="mt-1 text-sm text-muted-foreground">{APP_TAGLINE}</p>
            ) : null}
          </div>
          <Button
            className="lg:hidden"
            onClick={close}
            size="sm"
            type="button"
            variant="ghost"
          >
            <X className="size-4" />
          </Button>
        </div>
        <nav className="space-y-1">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.title}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-sky-400/12 text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  isCollapsed && "justify-center px-0"
                )}
                href={item.href}
                onClick={close}
              >
                <Icon className="size-4 transition group-hover:text-sky-400" />
                {!isCollapsed ? <span>{item.title}</span> : null}
                {!isCollapsed && item.badge ? (
                  <span className="ml-auto rounded-full bg-sky-400/12 px-2 py-0.5 text-xs font-semibold text-sky-300">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        {!isCollapsed ? (
          <div className="mt-6 rounded-[1.35rem] border border-border/60 bg-background/40 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Command palette</span>
              <span className="rounded-md border border-border/70 px-2 py-1">Ctrl + K</span>
            </div>
          </div>
        ) : null}
        {!isCollapsed ? (
          <div className="mt-auto rounded-[1.5rem] border border-white/8 bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(34,197,94,0.12))] p-4">
            <p className="text-sm font-semibold text-foreground">AI Signal Stream</p>
            <p className="mt-1 text-sm text-muted-foreground">
              12 fresh opportunities detected across search, UX, and conversion.
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
