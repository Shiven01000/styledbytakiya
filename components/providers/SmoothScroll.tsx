"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Root-level smooth scroll. Every section inherits it, and later phases read
 * scroll progress from the same instance rather than adding their own listeners.
 *
 * Touch is left on native scrolling on purpose (Lenis `syncTouch` stays off):
 * synthesising momentum on a phone is where scroll jank comes from, and native
 * touch scrolling already feels correct.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  /* In-page anchors have to go through Lenis, otherwise the browser jumps and
     Lenis snaps back. When motion is reduced there is no instance, so the
     native jump is both correct and what the user asked for. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      const lenis = lenisRef.current;
      if (!lenis) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
