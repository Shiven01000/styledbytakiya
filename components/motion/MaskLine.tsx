"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A line that rises out of a clip, one line at a time. Line-level rather than
 * character-level: at this size and in a high-contrast serif, per-character
 * staggering reads as a gimmick, where a whole line lifting reads as poise.
 */
export function MaskLine({
  children,
  className,
  delay = 0,
  trigger = "inView",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  trigger?: "mount" | "inView";
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  const activate =
    trigger === "inView"
      ? {
          whileInView: { y: "0%" },
          viewport: { once, margin: "0px 0px -12% 0px" },
        }
      : { animate: { y: "0%" } };

  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={{ y: "106%" }}
        {...activate}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
