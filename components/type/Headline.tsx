import { cn } from "@/lib/utils";

/**
 * The one typographic device in this design: nouns set in uppercase serif,
 * the words joining them in lowercase italic. Write it with braces —
 *
 *   "COLOUR {that} STILL LOOKS RIGHT {at} WEEK SIX"
 *
 * Braced runs render lowercase italic; everything else renders uppercase.
 * Keeping it to one device is the point, so resist adding a second.
 */
export function Headline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\{[^}]*\})/g).filter(Boolean);

  return (
    <span className={cn("font-display", className)}>
      {parts.map((part, index) =>
        part.startsWith("{") ? (
          <em key={index} className="font-normal lowercase italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={index} className="uppercase">
            {part}
          </span>
        ),
      )}
    </span>
  );
}

/** Strips the braces, for aria-labels and plain-text needs. */
export function headlinePlain(text: string) {
  return text.replace(/[{}]/g, "");
}
