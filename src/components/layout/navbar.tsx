"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { CommandSearch } from "@/components/layout/command-search";
import { SearchBar } from "@/components/common/search-bar";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger
} from "@/components/ui/dropdown";
import { DEFAULT_AVATAR_FALLBACK } from "@/constants/app";
import { useSidebar } from "@/hooks/use-sidebar";
import { getCurrentProfile } from "@/services/profile";
import { notifications, workspaceOptions } from "@/data";
import type { ApiUser } from "@/types/api";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Navbar() {
  const toggle = useSidebar((state) => state.toggle);
  const isCollapsed = useSidebar((state) => state.isCollapsed);
  const toggleCollapsed = useSidebar((state) => state.toggleCollapsed);
  const [profile, setProfile] = useState<ApiUser | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const user = await getCurrentProfile(controller.signal);
        setProfile(user);
      } catch {
        setProfile(null);
      }
    }

    loadProfile();

    return () => controller.abort();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/72 backdrop-blur-xl">
      <div className="flex min-h-18 items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Button
          className="lg:hidden"
          onClick={toggle}
          size="sm"
          type="button"
          variant="secondary"
        >
          <Menu className="size-4" />
          <span className="sr-only">Open navigation</span>
        </Button>
        <Button
          className="hidden lg:inline-flex"
          onClick={toggleCollapsed}
          size="sm"
          type="button"
          variant="secondary"
        >
          {isCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          <span className="sr-only">Toggle sidebar width</span>
        </Button>
        <div className="hidden max-w-xl flex-1 xl:block">
          <CommandSearch />
        </div>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button className="hidden h-11 rounded-full px-3 lg:inline-flex" variant="secondary">
              <span className="text-left">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Workspace
                </span>
                <span className="block text-sm font-medium text-foreground">
                  {workspaceOptions[0].name}
                </span>
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownTrigger>
          <DropdownContent align="start" className="w-72">
            <DropdownLabel>Switch Workspace</DropdownLabel>
            <DropdownSeparator />
            {workspaceOptions.map((workspace, index) => (
              <DropdownCheckboxItem
                checked={index === 0}
                key={workspace.id}
                onSelect={(event) => event.preventDefault()}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{workspace.name}</span>
                  <span className="text-xs text-muted-foreground">{workspace.plan}</span>
                </div>
              </DropdownCheckboxItem>
            ))}
          </DropdownContent>
        </Dropdown>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-72 lg:block xl:hidden">
            <SearchBar placeholder="Search reports and websites..." />
          </div>
          <span className="hidden rounded-full border border-border/60 px-3 py-2 text-xs text-muted-foreground md:inline-flex">
            Ctrl + K
          </span>
          <ThemeToggle />
          <Dropdown>
            <DropdownTrigger asChild>
              <Button aria-label="Notifications" className="relative" size="sm" variant="secondary">
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-sky-400 animate-pulse" />
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-96">
              <DropdownLabel>Notification Center</DropdownLabel>
              <DropdownSeparator />
              <div className="max-h-[26rem] overflow-y-auto p-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl px-3 py-3 transition hover:bg-muted/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                      {item.unread ? (
                        <span className="mt-1 size-2.5 rounded-full bg-sky-400" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </DropdownContent>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button className="h-11 rounded-full px-2" variant="secondary">
                <Avatar className="size-8">
                  <AvatarFallback>
                    {profile ? getInitials(profile.name) : DEFAULT_AVATAR_FALLBACK}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-medium text-foreground">
                    {profile?.name ?? "Maya Chen"}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {profile?.email ?? "Growth Engineering"}
                  </span>
                </span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end">
              <DropdownLabel>Workspace</DropdownLabel>
              <DropdownSeparator />
              <DropdownItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownItem>
              <DropdownItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownItem>
              <DropdownItem asChild>
                <Link href="/history">Recent Reports</Link>
              </DropdownItem>
              <DropdownItem asChild>
                <Link href="/">Public Website</Link>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
