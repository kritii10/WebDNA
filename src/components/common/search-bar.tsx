"use client";

import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export function SearchBar({
  className,
  containerClassName,
  ...props
}: SearchBarProps) {
  return (
    <label
      className={cn(
        "group focus-shell flex h-11 w-full items-center gap-3 rounded-full border border-border/70 bg-background/75 px-4 text-sm text-muted-foreground backdrop-blur-md transition focus-within:text-foreground",
        containerClassName
      )}
    >
      <Search className="size-4 shrink-0 transition group-focus-within:text-sky-300" />
      <input
        className={cn(
          "w-full border-none bg-transparent text-foreground outline-none placeholder:text-muted-foreground/80",
          className
        )}
        type="search"
        {...props}
      />
    </label>
  );
}
