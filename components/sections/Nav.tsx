"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_STRIP = 68;

/**
 * The chrome sits over full-bleed photography half the time and over cream the
 * rest, so it watches for scenes marked `data-tone="media"` entering the strip
 * it occupies and goes white over them. Without this the wordmark disappears
 * into any darker photograph.
 */
function useOverMedia() {
  const [overMedia, setOverMedia] = useState(true);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll('[data-tone="media"]'));
    if (scenes.length === 0) return;

    const overlapping = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      observer?.disconnect();
      overlapping.clear();
      const bottomInset = Math.max(window.innerHeight - NAV_STRIP, 0);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) overlapping.add(entry.target);
            else overlapping.delete(entry.target);
          }
          setOverMedia(overlapping.size > 0);
        },
        { rootMargin: `0px 0px -${bottomInset}px 0px`, threshold: 0 },
      );

      scenes.forEach((scene) => observer?.observe(scene));
    };

    observe();

    let timer: number;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(observe, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return overMedia;
}

const MENU = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#motion", label: "In motion" },
  { href: "#about", label: "About" },
  { href: "#booking", label: "Book" },
];

/**
 * Chrome is a menu button, the wordmark, and one link. Everything else that
 * used to live up here is gone — the navigation is not the design.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const overMedia = useOverMedia();
  /* The menu panel is cream, so the chrome goes back to ink while it is open. */
  const light = overMedia && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-90 grid grid-cols-[1fr_auto_1fr] items-center px-gutter py-5 transition-colors duration-500",
          light ? "text-white" : "text-ink",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex h-11 w-11 -ml-2.5 items-center justify-center"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-2.5 w-5">
            <span
              className={cn(
                "absolute left-0 block h-px w-full bg-current transition-all duration-500",
                open ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-full bg-current transition-all duration-500",
                open ? "top-1/2 -rotate-45" : "top-full",
              )}
            />
          </span>
        </button>

        <Link
          href="#top"
          className="justify-self-center font-display text-d-sm leading-none tracking-[0.14em] uppercase"
        >
          Takiya
        </Link>

        <Link
          href="#booking"
          className="justify-self-end font-ui text-ui-sm tracking-ui uppercase underline decoration-1 underline-offset-4 transition-opacity duration-300 hover:opacity-60"
        >
          Book
        </Link>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-80 flex flex-col justify-center bg-cream-deep px-gutter"
          >
            <nav aria-label="Sections">
              <ul className="flex flex-col">
                {MENU.map((item, index) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.18 + index * 0.06,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 font-display text-d-lg leading-[1.08] tracking-display uppercase transition-opacity duration-300 hover:opacity-55"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
