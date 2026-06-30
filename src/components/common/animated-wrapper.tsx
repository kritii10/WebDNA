"use client";

import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

type AnimatedWrapperProps = HTMLMotionProps<"div"> & {
  variant?: Variants;
};

export function AnimatedWrapper({
  className,
  variant = fadeUp,
  initial = "hidden",
  animate = "visible",
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div
      animate={animate}
      className={cn(className)}
      initial={initial}
      variants={variant}
      {...props}
    />
  );
}
