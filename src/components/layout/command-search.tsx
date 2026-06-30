"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock3, FileSearch, History, LayoutDashboard, Search, Settings, UserCircle2, WandSparkles } from "lucide-react";

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { recentSearches } from "@/data";

const commands = [
  {
    title: "Open Dashboard",
    description: "View high-level website health, activity, and recommendations.",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Analyze Website",
    description: "Start a fresh AI scan on a live URL.",
    href: "/analyze",
    icon: WandSparkles
  },
  {
    title: "Open Report",
    description: "Jump into the latest detailed report snapshot.",
    href: "/reports/r-001",
    icon: FileSearch
  },
  {
    title: "History",
    description: "Search previous analyses and exported reports.",
    href: "/history",
    icon: History
  },
  {
    title: "Profile",
    description: "Review personal metrics and saved work.",
    href: "/profile",
    icon: UserCircle2
  },
  {
    title: "Settings",
    description: "Manage account, appearance, and notifications.",
    href: "/settings",
    icon: Settings
  }
] as const;

export function CommandSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button
          aria-label="Open command search"
          className="h-11 w-full justify-between rounded-2xl border border-border/70 bg-background/60 px-4 text-sm text-muted-foreground backdrop-blur-md hover:bg-muted/70"
          variant="secondary"
        >
          <span className="flex items-center gap-3">
            <Search className="size-4" />
            Search commands, reports, or websites
          </span>
          <span className="hidden rounded-lg border border-border/70 px-2 py-1 text-xs sm:inline-flex">
            Ctrl + K
          </span>
        </Button>
      </ModalTrigger>
      <ModalContent className="w-[min(92vw,44rem)]">
        <ModalHeader>
          <ModalTitle>Command Search</ModalTitle>
          <ModalDescription>
            Jump to reports, workspaces, and recent destinations with one shortcut.
          </ModalDescription>
        </ModalHeader>
        <div className="mb-4 rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Press <span className="text-foreground">Ctrl + K</span> anytime to reopen
        </div>
        <div className="space-y-2">
          {commands.map((command) => {
            const Icon = command.icon;

            return (
              <Button
                key={command.href}
                asChild
                className="h-auto w-full justify-start rounded-2xl px-4 py-4 text-left"
                variant="ghost"
              >
                <Link href={command.href}>
                  <span className="rounded-xl border border-border/70 bg-background/60 p-2">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium text-foreground">
                      {command.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {command.description}
                    </span>
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
        <div className="mt-5 border-t border-border/50 pt-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Clock3 className="size-3.5" />
            Recent Searches
          </div>
          <div className="space-y-2">
            {recentSearches.map((item) => (
              <Button
                key={item.id}
                asChild
                className="h-auto w-full justify-start rounded-2xl px-4 py-3 text-left"
                variant="ghost"
              >
                <Link href={item.href}>
                  <span className="flex flex-col items-start gap-1">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
