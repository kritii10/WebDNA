import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(135deg,hsl(var(--accent))_0%,hsl(var(--accent-strong))_100%)] text-accent-foreground shadow-[0_18px_48px_-24px_rgba(14,165,233,0.8)] hover:-translate-y-0.5 hover:brightness-[1.03] hover:shadow-[0_24px_60px_-24px_rgba(14,165,233,0.9)]",
        secondary:
          "border border-border/70 bg-background/60 text-foreground backdrop-blur-md hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-muted/70",
        ghost: "text-foreground hover:bg-muted/70",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_18px_48px_-24px_rgba(244,63,94,0.8)]"
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-sm"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
