import { cn } from "@/lib/utils";

type Tone = "foil" | "shift" | "eclipse";

const TONE: Record<Tone, string> = {
  foil: "bg-foil text-ink",
  shift: "bg-foil-shift text-ink",
  eclipse: "bg-eclipse text-paper",
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
  const inverted = tone === "eclipse";

  return (
    <section
      id={id}
      data-tone={inverted ? "dark" : undefined}
      className={cn(
        "flex min-h-[80svh] flex-col justify-center px-gutter py-section",
        TONE[tone],
      )}
    >
      <div className="flex flex-col gap-6">
        <span
          className={cn(
            "text-micro font-medium tracking-micro uppercase",
            inverted ? "text-brass" : "text-violet",
          )}
        >
          {index} / {label}
        </span>

        <h2 className="max-w-[22ch] font-display text-d-lg leading-[0.94] font-medium tracking-display">
          {title}{" "}
          <em
            className={cn(
              "italic font-light",
              inverted ? "text-brass" : "text-violet",
            )}
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
            "mt-4 flex max-w-md items-end p-3",
            inverted ? "well-violet" : "well",
          )}
          style={{ aspectRatio: "16 / 9" }}
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
              : "border-rule text-brass-ink",
          )}
        >
          {arriving}
        </p>
      </div>
    </section>
  );
}
