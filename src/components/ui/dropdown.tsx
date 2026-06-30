"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export const Dropdown = DropdownMenu.Root;
export const DropdownTrigger = DropdownMenu.Trigger;
export const DropdownGroup = DropdownMenu.Group;
export const DropdownPortal = DropdownMenu.Portal;
export const DropdownSub = DropdownMenu.Sub;
export const DropdownRadioGroup = DropdownMenu.RadioGroup;

export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ className, sideOffset = 10, ...props }, ref) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-52 overflow-hidden rounded-2xl border border-border/60 bg-popover/95 p-1.5 text-popover-foreground shadow-[0_20px_60px_-32px_rgba(15,23,42,0.75)] backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenu.Portal>
));

DropdownContent.displayName = DropdownMenu.Content.displayName;

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none transition hover:bg-muted focus:bg-muted",
      className
    )}
    {...props}
  />
));

DropdownItem.displayName = DropdownMenu.Item.displayName;

export const DropdownCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenu.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-xl py-2 pl-8 pr-3 text-sm outline-none transition hover:bg-muted focus:bg-muted",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 inline-flex size-4 items-center justify-center">
      <DropdownMenu.ItemIndicator>
        <Check className="size-4" />
      </DropdownMenu.ItemIndicator>
    </span>
    {children}
  </DropdownMenu.CheckboxItem>
));

DropdownCheckboxItem.displayName = DropdownMenu.CheckboxItem.displayName;

export const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Label
    ref={ref}
    className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground", className)}
    {...props}
  />
));

DropdownLabel.displayName = DropdownMenu.Label.displayName;

export const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border/70", className)}
    {...props}
  />
));

DropdownSeparator.displayName = DropdownMenu.Separator.displayName;

export const DropdownSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenu.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-xl px-3 py-2 text-sm outline-none transition hover:bg-muted focus:bg-muted",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </DropdownMenu.SubTrigger>
));

DropdownSubTrigger.displayName = DropdownMenu.SubTrigger.displayName;

export const DropdownSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenu.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-44 overflow-hidden rounded-2xl border border-border/60 bg-popover/95 p-1.5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.75)] backdrop-blur-xl",
      className
    )}
    {...props}
  />
));

DropdownSubContent.displayName = DropdownMenu.SubContent.displayName;
