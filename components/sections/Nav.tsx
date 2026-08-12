"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INDEX = [
  { href: "#services", label: "01 Services" },
  { href: "#portfolio", label: "02 Work" },
  { href: "#about", label: "03 About" },
];

const NAV_STRIP = 72;

/**
 * The nav sits over whatever section is beneath it, and the site alternates
 * between light grounds and near-black bands. It watches for sections marked
 * `data-tone="dark"` entering the top strip of the viewport and inverts.
 */
function useInvertedOverDarkSection() {
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll('[data-tone="dark"]'),
    );
    if (darkSections.length === 0) return;

    const overlapping = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      observer?.disconnect();
      overlapping.clear();

      // Shrink the observation root to just the strip the nav occupies.
      const bottomInset = Math.max(window.innerHeight - NAV_STRIP, 0);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) overlapping.add(entry.target);
            else overlapping.delete(entry.target);
          }
          setInverted(overlapping.size > 0);
        },
        { rootMargin: `0px 0px -${bottomInset}px 0px`, threshold: 0 },
      );

      darkSections.forEach((section) => observer?.observe(section));
    };

    observe();

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(observe, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return inverted;
}

export function Nav() {
  const inverted = useInvertedOverDarkSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-start gap-4 px-gutter py-4 md:py-6">
      <Link
        href="#top"
        className={cn(
          "text-label font-medium tracking-label uppercase transition-colors duration-500",
          inverted ? "text-paper" : "text-ink",
        )}
      >
        Styled&nbsp;by&nbsp;Takiya
      </Link>

      <nav
        aria-label="Sections"
        className="flex items-center gap-3 md:gap-6 lg:gap-8"
      >
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {INDEX.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-label font-medium tracking-label uppercase transition-colors duration-500",
                  inverted
                    ? "text-paper-muted hover:text-sage"
                    : "text-ink-muted hover:text-sage-deep",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#booking"
          className={cn(
            "flex min-h-11 items-center px-4 text-label font-medium tracking-label uppercase transition-colors duration-300",
            inverted
              ? "bg-paper text-ink hover:bg-sage"
              : "bg-sage-deep text-paper hover:bg-ink",
          )}
        >
          Book
        </Link>
      </nav>
    </header>
  );
}
