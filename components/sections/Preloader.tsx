"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Headline } from "@/components/type/Headline";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINES = ["COLOUR {that} STILL", "LOOKS RIGHT {at}", "WEEK SIX"];

/**
 * Opening curtain: the thesis is set once, large, then the panel lifts away.
 *
 * It waits on `document.fonts.ready` rather than a fixed timer, because the
 * ugly version of this is the serif swapping in mid-reveal. A ceiling stops a
 * slow font from holding the site hostage, and a floor stops the curtain from
 * flashing past on a warm cache.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  /* Reduced motion skips the curtain entirely — derived, not set in an effect,
     so there is no render with the curtain up. */
  const showing = !done && !reduce;

  useEffect(() => {
    if (reduce) return;

    const MIN_MS = 1400;
    const MAX_MS = 4000;
    const start = performance.now();
    let value = 0;
    let fontsReady = false;
    let raf = 0;

    document.fonts.ready.then(() => {
      fontsReady = true;
    });

    /* Hard failsafe. requestAnimationFrame is throttled in background tabs and
       on loaded devices, which can leave the counter crawling and the curtain
       never lifting — the worst failure this component has, since it blocks the
       whole site. A timer is not throttled the same way, so it always ends. */
    const failsafe = window.setTimeout(() => setDone(true), MAX_MS + 800);

    const tick = () => {
      const elapsed = performance.now() - start;
      const release = (fontsReady && elapsed > MIN_MS) || elapsed > MAX_MS;
      const target = release ? 100 : Math.min(92, (elapsed / MIN_MS) * 92);

      /* Close the last stretch quickly once released, so the run-out to 100
         is not at the mercy of the frame rate. */
      value += (target - value) * (release ? 0.3 : 0.1);
      if (release && value > 99.3) value = 100;
      setProgress(value);

      if (value >= 100) {
        window.setTimeout(() => setDone(true), 360);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, [reduce]);

  /* Hold the page still behind the curtain. */
  useEffect(() => {
    document.documentElement.style.overflow = showing ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showing]);

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-100 flex flex-col justify-between bg-cream px-gutter py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <span />

          <p className="mx-auto max-w-[16ch] text-center font-display text-d-lg leading-[1.06] tracking-display">
            {LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "106%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: 0.15 + index * 0.13,
                  }}
                >
                  <Headline text={line} />
                </motion.span>
              </span>
            ))}
          </p>

          <div className="flex items-end justify-between">
            <span className="font-ui text-ui-sm tracking-ui text-ink-muted uppercase">
              Styled by Takiya
            </span>
            <span className="font-ui text-ui text-ink-muted tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
