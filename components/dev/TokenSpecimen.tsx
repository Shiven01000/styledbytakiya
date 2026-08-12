/**
 * Phase 1 review artifact only — delete when Phase 2 lands the real hero.
 * Exists so the palette and type scale can be verified against the tokens
 * rather than eyeballed through finished sections.
 */

const SWATCHES = [
  { name: "foil", hex: "#d9d6cf", role: "ground", cls: "bg-foil" },
  { name: "foil-shift", hex: "#cfcbc1", role: "section shift", cls: "bg-foil-shift" },
  { name: "paper", hex: "#f5f4f1", role: "raised panel", cls: "bg-paper" },
  { name: "panel", hex: "#c6c1b6", role: "media well", cls: "bg-panel" },
  { name: "ink", hex: "#171514", role: "text · 12.6:1", cls: "bg-ink" },
  { name: "violet", hex: "#5b3ac9", role: "accent · 5.0:1", cls: "bg-violet" },
  { name: "violet-deep", hex: "#3f2593", role: "hover · 7.7:1", cls: "bg-violet-deep" },
  { name: "brass", hex: "#a8792e", role: "display only · 2.7:1", cls: "bg-brass" },
  { name: "brass-ink", hex: "#74501a", role: "brass text · 5.0:1", cls: "bg-brass-ink" },
  { name: "eclipse", hex: "#14110f", role: "inverted band", cls: "bg-eclipse" },
];

const LADDER = [
  { token: "d-xxl", cls: "text-d-xxl", sample: "Takiya" },
  { token: "d-xl", cls: "text-d-xl", sample: "Selected work" },
  { token: "d-lg", cls: "text-d-lg", sample: "Colour correction" },
  { token: "d-md", cls: "text-d-md", sample: "Lived-in balayage" },
  { token: "d-sm", cls: "text-d-sm", sample: "Silk press & treatment" },
];

export function TokenSpecimen() {
  return (
    <section className="border-t border-rule bg-paper px-gutter py-section">
      <span className="text-micro font-medium tracking-micro text-brass-ink uppercase">
        Phase 1 · token specimen · removed in Phase 2
      </span>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-d-sm font-medium tracking-display">
            Palette <em className="text-violet italic font-light">Foil</em>
          </h3>
          <ul className="mt-5 flex flex-col">
            {SWATCHES.map((s) => (
              <li
                key={s.name}
                className="flex items-center gap-4 border-t border-rule-soft py-2.5"
              >
                <span
                  className={`${s.cls} size-9 shrink-0 outline outline-offset-[-1px] outline-rule`}
                  aria-hidden
                />
                <span className="w-28 text-caption font-medium tracking-label text-ink uppercase">
                  {s.name}
                </span>
                <span className="w-20 text-caption text-ink-muted tabular-nums">
                  {s.hex}
                </span>
                <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
                  {s.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-d-sm font-medium tracking-display">
            Type <em className="text-violet italic font-light">Boska / Switzer</em>
          </h3>
          <ul className="mt-5 flex flex-col">
            {LADDER.map((t) => (
              <li key={t.token} className="border-t border-rule-soft py-3">
                <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
                  text-{t.token}
                </span>
                <p
                  className={`${t.cls} font-display leading-[0.95] font-medium tracking-display`}
                >
                  {t.sample}
                </p>
              </li>
            ))}
            <li className="border-t border-rule-soft py-3">
              <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
                body-lg · Switzer 300
              </span>
              <p className="max-w-[46ch] text-body-lg leading-relaxed font-light text-ink-body">
                Lived-in blondes and colour correction, cut for how you actually
                wear it. One client in the chair at a time.
              </p>
            </li>
            <li className="border-t border-rule-soft py-3">
              <span className="text-micro font-medium tracking-label text-ink-faint uppercase">
                micro · tracked label
              </span>
              <p className="text-micro font-medium tracking-micro text-ink uppercase">
                Every day · 6–11pm · By appointment
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
