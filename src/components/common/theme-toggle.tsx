"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

const themeOptions = [
  { label: "Light", value: "light", icon: SunMedium },
  { label: "Dark", value: "dark", icon: MoonStar },
  { label: "System", value: "system", icon: Monitor }
] as const;

export function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const activeTheme = mounted ? theme : "system";
  const activeOption =
    themeOptions.find((option) => option.value === activeTheme) ?? themeOptions[2];
  const ActiveIcon = activeOption.icon;

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          aria-label="Toggle theme"
          className="rounded-full"
          size="sm"
          variant="secondary"
        >
          <ActiveIcon className="size-4" />
          <span className="hidden sm:inline">{activeOption.label}</span>
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownLabel>Theme</DropdownLabel>
        <DropdownSeparator />
        {themeOptions.map((option) => {
          const Icon = option.icon;

          return (
            <DropdownItem key={option.value} onClick={() => setTheme(option.value)}>
              <Icon className="size-4" />
              {option.label}
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
}
