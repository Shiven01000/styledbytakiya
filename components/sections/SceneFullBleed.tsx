"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Backdrop, PhotoPlate, type Ground } from "@/components/media/Backdrop";
import type { Photo } from "@/lib/images";
import { MaskLine } from "@/components/motion/MaskLine";
import { Headline } from "@/components/type/Headline";

/**
 * Total immersion: an edge-to-edge photograph with the statement over it. The
 * image runs taller than the frame and drifts through it, so the scene is
 * never a still.
 */
export function SceneFullBleed({
  id,
  ground,
  photo,
  lines,
  caption,
}: {
  id?: string;
  ground: Ground;
  photo?: Photo;
  lines: string[];
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={section}
      id={id}
      data-tone="media"
      className="relative h-[104svh] overflow-hidden"
    >
      {/* The lit field stays put; only the photograph drifts through it. */}
      <Backdrop ground={ground} className="absolute inset-0" />

      <motion.div
        className="absolute inset-x-0 -inset-y-[12%]"
        style={reduce ? undefined : { y }}
      >
        <PhotoPlate
          photo={photo}
          spread="wide"
          sizes="100vw"
          className="absolute inset-0"
        />
      </motion.div>

      {/* Type over photography needs a guaranteed ground. A bottom-weighted
          scrim gives it one without washing the image, and it keeps working
          whatever the real photograph turns out to be. */}
      <div
        aria-hidden
        className="absolute inset-0 z-1 bg-linear-to-t from-black/75 via-black/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-1 h-40 bg-linear-to-b from-black/45 to-transparent"
      />

      <div className="relative z-2 flex h-full flex-col items-center justify-end px-gutter pb-[13vh] text-center">
        <h2 className="max-w-[19ch] font-display text-d-lg leading-[1.06] tracking-display text-white">
          {lines.map((line, index) => (
            <MaskLine key={line} delay={index * 0.11}>
              <Headline text={line} />
            </MaskLine>
          ))}
        </h2>
      </div>

      {caption ? (
        <p className="absolute bottom-8 left-gutter z-2 font-ui text-ui-sm tracking-ui text-white/70 uppercase">
          {caption}
        </p>
      ) : null}
    </section>
  );
}
