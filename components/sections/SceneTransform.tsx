"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Backdrop, PhotoPlate, type Ground } from "@/components/media/Backdrop";
import type { Photo } from "@/lib/images";
import { MaskLine } from "@/components/motion/MaskLine";
import { Headline } from "@/components/type/Headline";

/**
 * The transformation happens at the speed you scroll.
 *
 * The scene pins and the after-image is wiped across the before-image by scroll
 * progress, with the seam tracking the edge. For a colourist this is the whole
 * pitch, so it earns being the one pinned set piece on the page rather than
 * another reveal.
 */
export function SceneTransform({
  id,
  after,
  beforePhoto,
  afterPhoto,
  lines,
  caption,
}: {
  id?: string;
  /** The single lit field both states dissolve into. */
  after: Ground;
  beforePhoto?: Photo;
  afterPhoto?: Photo;
  lines: string[];
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  /* The after sits underneath and the before is peeled off it left to right,
     which is the direction people expect from a before/after handle. Holds at
     each end so both states get a beat on screen. */
  const peel = useTransform(scrollYProgress, [0.16, 0.84], [0, 100], {
    clamp: true,
  });
  const seam = useTransform(peel, (value) => 100 - value);
  const clipPath = useMotionTemplate`inset(0 ${peel}% 0 0)`;
  const seamLeft = useMotionTemplate`calc(${seam}% - 0.5px)`;

  return (
    <section
      ref={section}
      id={id}
      data-tone="media"
      className="relative h-[260svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* One lit field under both states, so the edges dissolve into colour
            and the wipe runs through the solid middle where the work is. */}
        <Backdrop ground={after} className="absolute inset-0" />
        <PhotoPlate
          photo={afterPhoto}
          spread="wide"
          sizes="100vw"
          className="absolute inset-0"
        />

        {/* Reduced motion settles on the finished result rather than the before. */}
        <motion.div
          className="absolute inset-0"
          style={reduce ? { clipPath: "inset(0 100% 0 0)" } : { clipPath }}
        >
          <PhotoPlate
            photo={beforePhoto}
            spread="wide"
            sizes="100vw"
            className="absolute inset-0"
          />
        </motion.div>

        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-y-0 z-2 w-px bg-white/70"
            style={{ left: seamLeft }}
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 z-1 bg-linear-to-t from-black/70 via-black/20 to-black/25"
        />

        <div className="relative z-3 flex h-full flex-col justify-between px-gutter pt-24 pb-8">
          <div className="flex justify-between font-ui text-ui-sm tracking-ui text-white/70 uppercase">
            <span>Before</span>
            <span>After</span>
          </div>

          <h2 className="max-w-[19ch] font-display text-d-lg leading-[1.06] tracking-display text-white">
            {lines.map((line, index) => (
              <MaskLine key={line} delay={index * 0.11}>
                <Headline text={line} />
              </MaskLine>
            ))}
          </h2>

          {caption ? (
            <p className="font-ui text-ui-sm tracking-ui text-white/70 uppercase">
              {caption}
            </p>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}
