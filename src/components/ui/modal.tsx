"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;

export function ModalPortal({
  children
}: {
  children: React.ReactNode;
}) {
  return <Dialog.Portal>{children}</Dialog.Portal>;
}

export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
    <Dialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      )}
      {...props}
  />
));

ModalOverlay.displayName = Dialog.Overlay.displayName;

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-border/60 bg-card/95 p-6 shadow-[0_24px_90px_-36px_rgba(2,6,23,0.8)] backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
      <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    </Dialog.Content>
  </ModalPortal>
));

ModalContent.displayName = Dialog.Content.displayName;

export const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex flex-col gap-2", className)} {...props} />
);

export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("font-display text-xl font-semibold", className)}
    {...props}
  />
));

ModalTitle.displayName = Dialog.Title.displayName;

export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

ModalDescription.displayName = Dialog.Description.displayName;
