"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One orchestrated load-in, then a scroll-linked exit.
 *
 * The load-in is a sequence with a cause: rules are scribed across the sheet,
 * the portrait wipes open along them, the name rises through the opening, and
 * only then does the supporting copy arrive. Nothing shares a delay, so it
 * reads as one movement rather than six elements fading up together.
 *
 * On the way out the name lags behind the scroll while the portrait runs ahead
 * of it, so leaving the hero pulls the composition apart instead of sliding it
 * off as a block.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const exitFade = useTransform(scrollYProgress, [0.45, 1], [1, 0]);

  const parallax = reduce ? {} : { style: { y: nameY } };
  const portraitMotion = reduce
    ? {}
    : { style: { y: portraitY, scale: portraitScale } };
  const copyMotion = reduce ? {} : { style: { y: copyY, opacity: exitFade } };

  /* Rise through a clipping wrapper — a transform, so it composites. */
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "112%" },
          animate: { y: 0 },
          transition: { duration: 1.05, ease: EASE, delay },
        };

  const drift = (delay: number, x = -20) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, x },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  const scribe = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { duration: 1.1, ease: EASE, delay },
        };

  const wipe = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { clipPath: "inset(0 0 100% 0)" },
          animate: { clipPath: "inset(0 0 0% 0)" },
          transition: { duration: 1.2, ease: EASE, delay },
        };

  return (
    <section
      ref={section}
      className="metal relative flex min-h-svh flex-col justify-between overflow-hidden px-gutter pt-28 pb-8 md:pt-36"
    >
      <motion.p
        {...drift(0.35, 0)}
        className="text-micro font-medium tracking-micro text-sage-deep uppercase"
      >
        Colourist &nbsp;/&nbsp; Colour correction &nbsp;/&nbsp; Edmonton
        &nbsp;/&nbsp; By appointment only
      </motion.p>

      {/* Scribed rules, kept in normal flow so they frame the composition
          instead of striking through it. The first is the opening beat. */}
      <motion.span
        aria-hidden
        {...scribe(0.15)}
        style={{ transformOrigin: "left" }}
        className="mt-5 h-px w-[clamp(120px,24vw,360px)] bg-sage-deep"
      />

      <div className="grid flex-1 grid-cols-1 items-center gap-y-8 py-10 md:grid-cols-12 md:gap-x-col md:gap-y-0">
        {/* Name — sits above the portrait and overlaps its left edge. */}
        <motion.div
          {...parallax}
          className="relative z-10 md:col-span-8 md:col-start-1 md:row-start-1 md:self-center"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              {...rise(0.55)}
              className="lettering block font-display text-d-xxl leading-[0.82] font-normal tracking-display-tight"
            >
              Takiya
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em] pl-[8vw] md:pl-[12vw]">
            <motion.span
              {...rise(0.78)}
              className="block font-display text-d-xl leading-[0.9] font-light tracking-display text-sage-deep italic"
            >
              Bauce
            </motion.span>
          </span>
        </motion.div>

        {/* Portrait well */}
        <div className="md:col-span-6 md:col-start-7 md:row-start-1 md:self-start md:mt-[5vh]">
          <motion.div
            {...wipe(0.25)}
            className="overflow-hidden outline-1 outline-offset-[-1px] outline-rule"
          >
            <motion.div
              {...portraitMotion}
              className="well flex aspect-3/4 max-h-[44svh] w-[78%] items-end p-3.5 md:ml-auto md:max-h-[64svh] md:w-[92%]"
            >
              <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
                portrait 3:4 — hard-lit, shoulders up
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Standfirst, on a polished panel that laps over the name */}
        <motion.div
          {...copyMotion}
          className="relative z-20 md:col-span-5 md:col-start-1 md:row-start-1 md:-mb-[4vh] md:self-end"
        >
          <motion.div
            {...drift(1)}
            className="bg-paper/85 py-4 pr-6 md:py-5 md:pr-7"
          >
            <p className="max-w-[34ch] text-body-lg leading-relaxed font-light text-ink-body text-pretty">
              Lived-in blondes and colour correction, cut for how you actually
              wear it. One client in the chair at a time — no double-booking, no
              rushing.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.span
        aria-hidden
        {...scribe(0.5)}
        style={{ transformOrigin: "right" }}
        className="mb-6 ml-auto h-px w-[clamp(90px,16vw,260px)] bg-rule"
      />

      <motion.div
        {...drift(1.25, 0)}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <span className="flex items-center gap-3 text-micro font-medium tracking-micro text-ink-faint uppercase">
          <motion.span
            aria-hidden
            className="h-px w-8 bg-ink-faint"
            animate={reduce ? undefined : { scaleX: [1, 0.55, 1] }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          Scroll
        </span>

        <Link
          href="#booking"
          className="group relative inline-block overflow-hidden border-b-2 border-sage-deep pb-1 font-display text-d-sm font-medium tracking-display text-ink transition-colors duration-300 hover:text-sage-deep"
        >
          <span className="relative z-10">Request a booking →</span>
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-sheen/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        </Link>
      </motion.div>
    </section>
  );
}
