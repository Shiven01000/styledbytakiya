"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Backdrop } from "@/components/media/Backdrop";
import { FadeUp } from "@/components/motion/FadeUp";
import { MaskLine } from "@/components/motion/MaskLine";
import { Headline } from "@/components/type/Headline";
import { SERVICES } from "@/lib/content";
import { cn } from "@/lib/utils";

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return fine;
}

/**
 * The menu. On a desktop the hovered row keeps the ink and its siblings drop
 * back, and a preview trails the cursor with a spring so it lags slightly
 * behind the hand rather than sticking to it.
 *
 * Touch never sees any of that: every row carries its own thumbnail, so nothing
 * here depends on hover existing.
 */
export function Services() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);

  const spring = { stiffness: 140, damping: 22, mass: 0.55 };
  const previewX = useSpring(0, spring);
  const previewY = useSpring(0, spring);

  const showPreview = fine && !reduce && active !== null;

  /* Position from the event that opens the preview as well as from movement,
     otherwise entering a row without moving first shows it parked at 0,0. */
  const track = (event: React.PointerEvent) => {
    previewX.set(event.clientX + 28);
    previewY.set(event.clientY - 150);
  };

  return (
    <section
      id="services"
      className="bg-cream-deep px-gutter py-scene"
      onPointerLeave={() => setActive(null)}
      onPointerMove={fine ? track : undefined}
    >
      <h2 className="mx-auto max-w-[17ch] text-center font-display text-statement leading-[1.04] tracking-display">
        {["EVERY PRICE {here}", "{is a} STARTING POINT"].map((line, index) => (
          <MaskLine key={line} delay={index * 0.11}>
            <Headline text={line} />
          </MaskLine>
        ))}
      </h2>

      <FadeUp delay={0.15}>
        <p className="mx-auto mt-10 max-w-[52ch] text-center font-ui text-read leading-[1.75] text-ink-body text-pretty">
          Length, density and whatever happened to your hair before you got here
          all move the number. You get the real figure at consultation, before
          anything is mixed.
        </p>
      </FadeUp>

      <ul className="mx-auto mt-[clamp(56px,9vh,110px)] flex max-w-5xl flex-col">
        {SERVICES.map((service, index) => (
          <li key={service.slug}>
            <FadeUp delay={Math.min(index * 0.06, 0.3)}>
              <div
                onPointerEnter={(event) => {
                  if (!fine) return;
                  track(event);
                  setActive(index);
                }}
                className={cn(
                  "flex items-baseline gap-5 py-[clamp(14px,2.2vh,26px)] transition-opacity duration-500 md:gap-10",
                  active !== null && active !== index
                    ? "opacity-30"
                    : "opacity-100",
                )}
              >
                {/* Always-visible thumbnail on touch, where there is no hover
                    to depend on. */}
                <Backdrop
                  ground={service.ground}
                  photo={service.photo}
                  sizes="44px"
                  className="h-14 w-11 shrink-0 self-center md:hidden"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-display text-d-md leading-[1.1] tracking-display">
                    <Headline text={service.name} />
                  </p>
                  <p className="mt-2 font-ui text-ui-sm tracking-ui text-ink-muted uppercase">
                    {service.note}
                  </p>
                </div>

                <p className="shrink-0 font-ui text-ui-sm tracking-ui text-ink-muted uppercase">
                  <span className="hidden md:inline">From </span>
                  <span className="text-ink tabular-nums">
                    ${service.priceFrom}
                  </span>
                </p>
              </div>
            </FadeUp>
          </li>
        ))}
      </ul>

      {fine && !reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-70 w-[clamp(180px,15vw,232px)]"
          style={{ x: previewX, y: previewY }}
          animate={{ opacity: showPreview ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Backdrop
            ground={SERVICES[active ?? 0].ground}
            photo={SERVICES[active ?? 0].photo}
            sizes="232px"
            className="aspect-3/4 w-full"
          />
        </motion.div>
      ) : null}
    </section>
  );
}
