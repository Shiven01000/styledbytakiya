import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { MaskLine } from "@/components/motion/MaskLine";
import { Headline } from "@/components/type/Headline";
import { cn } from "@/lib/utils";

/**
 * A quiet cream scene: one statement, optionally a short paragraph, optionally
 * one link. Centred and generously spaced — the restraint is what lets the
 * photographic scenes hit.
 */
export function SceneStatement({
  id,
  lines,
  body,
  action,
  tone = "cream",
}: {
  id?: string;
  lines: string[];
  body?: string;
  action?: { href: string; label: string };
  tone?: "cream" | "deep";
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-[72svh] flex-col items-center justify-center px-gutter py-scene text-center",
        tone === "deep" ? "bg-cream-deep" : "bg-cream",
      )}
    >
      <h2 className="max-w-[17ch] font-display text-statement leading-[1.04] tracking-display">
        {lines.map((line, index) => (
          <MaskLine key={line} delay={index * 0.11}>
            <Headline text={line} />
          </MaskLine>
        ))}
      </h2>

      {body ? (
        <FadeUp delay={lines.length * 0.11}>
          <p className="mt-10 max-w-[52ch] font-ui text-read leading-[1.75] text-ink-body text-pretty">
            {body}
          </p>
        </FadeUp>
      ) : null}

      {action ? (
        <FadeUp delay={lines.length * 0.11 + 0.12}>
          <Link
            href={action.href}
            className="mt-12 inline-block font-ui text-ui-sm tracking-ui uppercase underline decoration-1 underline-offset-[6px] transition-opacity duration-300 hover:opacity-55"
          >
            {action.label}
          </Link>
        </FadeUp>
      ) : null}
    </section>
  );
}
