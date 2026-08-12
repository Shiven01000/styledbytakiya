"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The quiet one. Used for body copy and links, where a mask reveal would be
 * too theatrical — the statement above it is already doing that job.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
