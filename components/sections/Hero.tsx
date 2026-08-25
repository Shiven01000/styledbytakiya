"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Backdrop, type Ground } from "@/components/media/Backdrop";
import { PHOTOS, type Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

const SLIDES: { ground: Ground; photo: Photo; caption: string }[] = [
  {
    ground: "amber",
    photo: PHOTOS.auburnWaves,
    caption: "Copper gloss · lived-in waves",
  },
  {
    ground: "slate",
    photo: PHOTOS.icyBlondeWaves,
    caption: "Ash blonde · dimensional lift",
  },
  {
    ground: "rose",
    photo: PHOTOS.lavenderCarve,
    caption: "Lavender · carved detail",
  },
];

const HOLD_MS = 6200;

/**
 * The hero is a photograph, full bleed, and almost nothing else. It holds each
 * frame long enough to be looked at, drifts slowly so it never sits perfectly
 * still, and hands off to the next with a crossfade rather than a slide.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  /* The photograph lags the scroll slightly on the way out. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const chromeFade = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      HOLD_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <section
      ref={section}
      id="top"
      data-tone="media"
      className="relative h-svh overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
      >
        {SLIDES.map((slide, slideIndex) => (
          <motion.div
            key={slide.photo.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: slideIndex === index ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="h-full w-full"
              animate={
                reduce || slideIndex !== index
                  ? { scale: 1 }
                  : { scale: [1, 1.07] }
              }
              transition={{ duration: HOLD_MS / 1000 + 2, ease: "linear" }}
            >
              <Backdrop
                ground={slide.ground}
                photo={slide.photo}
                priority={slideIndex === 0}
                sizes="100vw"
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* The chrome is white over these scenes, so it needs its own ground
          when a photograph happens to be bright at the top. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-1 h-40 bg-linear-to-b from-black/45 to-transparent"
      />

      <motion.div
        className="relative z-2 flex h-full flex-col justify-end px-gutter pb-8"
        style={reduce ? undefined : { opacity: chromeFade }}
      >
        <div className="flex items-end justify-between gap-6">
          <p className="font-ui text-ui-sm tracking-ui text-white/70 uppercase">
            {SLIDES[index].caption}
          </p>
          <span className="font-ui text-ui-sm tracking-ui text-white/50 uppercase">
            Scroll
          </span>
        </div>
      </motion.div>

      {/* Frame markers */}
      <div className="absolute top-1/2 left-gutter z-3 flex -translate-y-1/2 flex-col gap-3">
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.photo.src}
            type="button"
            onClick={() => setIndex(slideIndex)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span className="sr-only">Frame {slideIndex + 1}</span>
            <span
              className={cn(
                "block h-1.5 w-1.5 rotate-45 transition-all duration-500",
                slideIndex === index
                  ? "bg-white"
                  : "bg-transparent ring-1 ring-white/55",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
