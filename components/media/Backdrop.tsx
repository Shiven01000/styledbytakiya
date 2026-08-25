import Image from "next/image";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

export type Ground = "amber" | "rose" | "olive" | "slate" | "sand";

/**
 * Every image well on the site.
 *
 * Pass a `photo` and it renders the photograph; pass nothing and it falls back
 * to the lit `ground` it was built with, so slots can be filled in one at a
 * time rather than all at once.
 *
 * The vignette and grain sit over the photograph too, not just the fallback.
 * That is deliberate: the current set was shot on different days in different
 * light, and a shared vignette and grain is what makes a mixed bag read as one
 * body of work.
 */
export function Backdrop({
  ground = "amber",
  photo,
  sizes = "100vw",
  priority,
  className,
  children,
}: {
  ground?: Ground;
  photo?: Photo;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "backdrop grain",
        photo ? "bg-ink" : `backdrop-${ground}`,
        className,
      )}
      role={photo ? undefined : "img"}
      aria-label={photo ? undefined : "Photograph placeholder"}
    >
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            /* Interim screenshots carry Instagram UI in the corners. A small
               crop-in pushes most of it outside the frame; it costs a little
               sharpness, which the originals will give back. */
            photo.interim && "scale-[1.14]",
          )}
        />
      ) : null}
      {children}
    </div>
  );
}
