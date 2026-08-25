import Image from "next/image";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

export type Ground = "amber" | "rose" | "olive" | "slate" | "sand";

/** Interim screenshots carry Instagram UI and burned-in "After" text near the
 *  edges. Cropping in and biasing downward pushes most of it out of frame; it
 *  costs sharpness, which the camera-roll originals will give back. */
const INTERIM_CROP = "scale-[1.22] object-[50%_58%]";

/**
 * A lit ground, optionally carrying a photograph edge to edge.
 *
 * Used where the image IS the surface — full-bleed scenes, the wipe, thumbs.
 * For a photograph presented on a colour field, use `PhotoPlate`.
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
      className={cn("backdrop grain", `backdrop-${ground}`, className)}
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
          className={cn("object-cover", photo.interim && INTERIM_CROP)}
        />
      ) : null}
      {children}
    </div>
  );
}

/**
 * A photograph presented on a colour field, the way a subject sits on a
 * seamless in a studio.
 *
 * It paints no background of its own — that is the whole point. The field
 * behind shows through as the photograph's edges dissolve, so the plate has no
 * boundary, the palette stays present, and the cluttered edges of the current
 * set never resolve into anything legible.
 */
export function PhotoPlate({
  photo,
  spread = "plate",
  sizes = "100vw",
  priority,
  className,
}: {
  photo?: Photo;
  /** "plate" for a portrait panel, "wide" for a viewport-width scene. */
  spread?: "plate" | "wide";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!photo) return null;

  return (
    /* The mask sits on the container, not the image: the container is what
       clips the crop-in, and fading the image itself would fade a box larger
       than the plate and leave a hard edge behind. */
    <div
      className={cn(
        spread === "wide" ? "photo-inset-wide" : "photo-inset",
        "relative overflow-hidden",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", photo.interim && INTERIM_CROP)}
      />
    </div>
  );
}
