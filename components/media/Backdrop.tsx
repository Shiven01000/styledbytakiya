import { cn } from "@/lib/utils";

export type Ground = "amber" | "rose" | "olive" | "slate" | "sand";

/**
 * Stand-in for an art-directed photograph: a lit seamless ground with grain.
 *
 * Real photographs replace the inner element and everything else — aspect,
 * vignette, grain, the way type sits over it — stays put, so swapping in
 * Takiya's shots is a source change rather than a layout change.
 */
export function Backdrop({
  ground = "amber",
  className,
  children,
}: {
  ground?: Ground;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("backdrop grain", `backdrop-${ground}`, className)}
      role="img"
      aria-label="Photograph placeholder"
    >
      {children}
    </div>
  );
}
