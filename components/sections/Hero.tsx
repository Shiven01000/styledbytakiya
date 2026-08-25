"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PhotoPlate, type Ground } from "@/components/media/Backdrop";
import { PHOTOS, type Photo } from "@/lib/images";
import { cn } from "@/lib/utils";

const SLIDES: { ground: Ground; photo?: Photo; caption: string }[] = [
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
 * The photograph sits as a plate on a lit colour field rather than filling the
 * frame, the way a subject sits on a seamless in a studio. The field is what
 * carries the palette, and the plate's edges dissolve into it, so the work is
 * presented rather than merely displayed — and the cluttered edges of the
 * current set never appear at all.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
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
      {SLIDES.map((slide, slideIndex) => {
        const showing = slideIndex === index;

        return (
          <motion.div
            key={slide.ground}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: showing ? 1 : 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The lit field. This is where the palette lives. */}
            <div
              className={cn(
                "backdrop grain absolute inset-0",
                `backdrop-${slide.ground}`,
              )}
            />

            {/* The plate. Drifts on scroll, breathes while it holds. */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={reduce ? undefined : { y: plateY }}
            >
              <motion.div
                className="relative aspect-3/4 h-[62svh] max-w-[80vw] md:h-[72svh] md:max-w-[46vw]"
                animate={
                  reduce || !showing ? { scale: 1 } : { scale: [1, 1.045] }
                }
                transition={{ duration: HOLD_MS / 1000 + 2, ease: "linear" }}
              >
                <PhotoPlate
                  photo={slide.photo}
                  priority={slideIndex === 0}
                  sizes="(max-width: 768px) 80vw, 46vw"
                  className="h-full w-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-1 h-40 bg-linear-to-b from-black/35 to-transparent"
      />

      <motion.div
        className="relative z-2 flex h-full flex-col justify-end px-gutter pb-8"
        style={reduce ? undefined : { opacity: chromeFade }}
      >
        <div className="flex items-end justify-between gap-6">
          <p className="font-ui text-ui-sm tracking-ui text-white/75 uppercase">
            {SLIDES[index].caption}
          </p>
          <span className="font-ui text-ui-sm tracking-ui text-white/55 uppercase">
            Scroll
          </span>
        </div>
      </motion.div>

      <div className="absolute top-1/2 left-gutter z-3 flex -translate-y-1/2 flex-col gap-3">
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.ground}
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
