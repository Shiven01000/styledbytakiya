"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "foil" | "shift" | "eclipse";

const TONE: Record<Tone, string> = {
  foil: "metal text-ink",
  shift: "metal-reverse text-ink",
  eclipse: "metal-dark text-paper",
};

export function SectionShell({
  id,
  index,
  label,
  title,
  accent,
  blurb,
  arriving,
  tone = "foil",
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  accent: string;
  blurb: string;
  arriving: string;
  tone?: Tone;
}) {
  const reduce = useReducedMotion();
  const inverted = tone === "eclipse";

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -12% 0px" },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id={id}
      data-tone={inverted ? "dark" : undefined}
      className={cn(
        "flex min-h-[80svh] flex-col justify-center px-gutter py-section",
        TONE[tone],
      )}
    >
      <motion.div {...reveal} className="flex flex-col gap-6">
        <span
          className={cn(
            "text-micro font-medium tracking-micro uppercase",
            inverted ? "text-copper" : "text-sage-deep",
          )}
        >
          {index} / {label}
        </span>

        <h2
          className={cn(
            "max-w-[22ch] font-display text-d-lg leading-[0.94] font-medium tracking-display",
            inverted ? "lettering-invert" : "lettering",
          )}
        >
          {title}{" "}
          <em
            className={cn(
              "italic font-light",
              inverted ? "text-sage" : "text-sage-deep",
            )}
            style={{
              WebkitTextFillColor: "currentcolor",
              backgroundImage: "none",
            }}
          >
            {accent}
          </em>
        </h2>

        <p
          className={cn(
            "max-w-[46ch] text-body-lg leading-relaxed font-light text-pretty",
            inverted ? "text-paper-body" : "text-ink-body",
          )}
        >
          {blurb}
        </p>

        <div
          className={cn(
            "mt-4 flex aspect-video max-w-md items-end p-3 outline-1 outline-offset-[-1px]",
            inverted ? "well-sage outline-rule-invert" : "well outline-rule",
          )}
          aria-hidden
        >
          <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
            placeholder media
          </span>
        </div>

        <p
          className={cn(
            "mt-2 border-l pl-3 text-micro font-medium tracking-label uppercase",
            inverted
              ? "border-rule-invert text-paper-muted"
              : "border-rule text-copper-ink",
          )}
        >
          {arriving}
        </p>
      </motion.div>
    </section>
  );
}
