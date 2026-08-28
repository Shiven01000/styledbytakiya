# Styled by Takiya

A motion-first portfolio and booking site for Takiya, a hair colourist in
Edmonton. Clients browse the work and book an appointment directly; there is no
online checkout, because payment happens in the chair afterwards.

> **Status:** in development, Phase 3 of 8. Not yet deployed.
> Target domain: `styledbytakiya.ca`

---

## Contents

- [Stack](#stack)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Photography](#photography)
- [Motion](#motion)
- [Accessibility and performance](#accessibility-and-performance)
- [Roadmap](#roadmap)
- [Rights](#rights)

---

## Stack

| Concern   | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | Next.js 16 (App Router) + TypeScript           |
| Styling   | Tailwind CSS v4, tokens in `app/globals.css`   |
| Motion    | Framer Motion + Lenis (smooth scroll)          |
| Data      | Supabase (Postgres) — Phase 6                  |
| Email     | Resend — Phase 6                               |
| Hosting   | Vercel                                         |

Fonts are **Bodoni Moda** (display, via `next/font`) and **Switzer** (UI, via
Fontshare). Self-hosting both is a Phase 8 task.

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # typecheck
```

No environment variables are needed yet. Supabase and Resend keys arrive in
Phase 6 and will be documented in `.env.example` at that point.

## Project structure

```
app/
  globals.css        design tokens, ground treatments, Lenis + reduced-motion
  layout.tsx         fonts, metadata, Preloader, SmoothScroll, chrome
  page.tsx           the one page — composes the scenes in order
components/
  media/             Backdrop (lit colour field) and PhotoPlate (photograph)
  motion/            MaskLine (line reveals), FadeUp (quieter reveals)
  providers/         SmoothScroll — Lenis at the root
  sections/          Nav, Footer, Preloader, Hero, Services, Scene*
  type/              Headline — the uppercase/italic device
lib/
  content.ts         the services menu (placeholder until Phase 6)
  images.ts          photo manifest and the PHOTOS_ENABLED switch
  utils.ts           cn()
public/images/work/  photographs
photos/              git-ignored drop folder for raw source files
```

## Design system

The register is taken from [verostudio.com](https://www.verostudio.com/): a warm
cream ground, a high-contrast Didone for headlines, and a neo-grotesque for the
small amount of UI text. The reasoning behind that choice — and the two
directions rejected before it — is in **[docs/DESIGN.md](docs/DESIGN.md)**.

| Token        | Value     | Role                |
| ------------ | --------- | ------------------- |
| `cream`      | `#f3f0ed` | ground              |
| `cream-deep` | `#eae5e0` | alternating scenes  |
| `ink`        | `#181615` | type                |

**There is no accent colour.** Colour comes from photography and nowhere else —
no tinted panels, no coloured buttons. This is enforced by there being no such
value anywhere in `globals.css`.

### The one typographic device

Nouns in uppercase serif, the words joining them in lowercase italic:

```tsx
<Headline text="COLOUR {that} STILL LOOKS RIGHT {at} WEEK SIX" />
```

Braced runs render lowercase italic; everything else renders uppercase. This
single device carries the personality of the site — resist adding a second.

### Scene vocabulary

Scenes alternate so the page has a rhythm rather than a stack:

| Component        | Role                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| `SceneStatement` | Quiet centred cream: one statement, optional paragraph and one link   |
| `SceneFullBleed` | Edge-to-edge photograph, statement anchored low over a scrim          |
| `SceneTransform` | The one pinned set piece — a scroll-scrubbed before/after wipe        |
| `Services`       | The menu, with a cursor-trailing preview on desktop                   |
| `Preloader`      | Opening curtain, released on `document.fonts.ready`                   |

Deliberately absent, because they are what made two earlier passes read as
templated: hairline rules used as structure, tracked uppercase eyebrows,
decorative `01 / 02 / 03` section indexes, standfirst panels, flat colour
blocks, and uniform section-after-section stacking. Words on screen are kept to
a minimum.

## Photography

**Photography is currently off.** `PHOTOS_ENABLED` in `lib/images.ts` is the
single switch: off, every slot falls back to its lit colour ground and the site
runs on the palette alone; on, the same slots carry the photographs. Files and
slot assignments stay intact either way, so it is one line in both directions.

Every slot points at a key in `lib/images.ts` rather than a file path, so
replacing an image is a one-line edit that touches no component.

Photographs are set **into** a lit colour field rather than over it, the way a
subject sits on a seamless in a studio. `Backdrop` paints the field;
`PhotoPlate` paints a photograph whose edges dissolve into whatever is behind
it. Three things follow:

- the palette stays present, because the field is visible around every image;
- the subject keeps its true colour in the middle, which matters because this is
  a colourist's portfolio and tinting the hair would misrepresent the work;
- cluttered edges never resolve into anything legible.

`PhotoPlate` takes `spread="plate"` for a portrait panel and `spread="wide"` for
a viewport-width scene. The two need different masks: an ellipse sized for a
plate leaves the side edges almost opaque once the element is viewport-wide.

Vignette and grain sit over photographs as well as fallbacks. That is
deliberate — the current set was shot on different days in different light, and
a shared vignette and grain is what makes a mixed bag read as one body of work.

> **The current images are interim.** They are screenshots of Instagram posts,
> so they carry app UI and burned-in "After" / "Result" overlays, and at
> ~1178px they are soft at full bleed. They are flagged `interim: true`, which
> applies a crop-in that pushes most of the overlay out of frame at some cost in
> sharpness. Replacing them with camera-roll originals under the same filenames
> and clearing the flag is the whole migration.

## Motion

Lenis drives scrolling at the root. Touch is deliberately left on native
scrolling — synthesising momentum on a phone is where scroll jank comes from.
In-page anchors are routed through the Lenis instance so the browser's jump
does not fight it.

Reveals are **line-level, not per-character**: at this size in a Didone,
per-character staggering reads as a gimmick where a whole line lifting reads as
poise.

Scroll-linked work uses Framer Motion `MotionValue`s and `useTransform` so
per-frame updates go to the compositor without re-rendering React. Everything
animated is `transform` or `opacity`.

## Accessibility and performance

- `prefers-reduced-motion` is respected globally in `globals.css` and each
  animated component additionally branches on `useReducedMotion()` to render the
  finished composition instead of the choreography. The preloader is skipped
  entirely.
- Type over photography sits on a scrim rather than relying on the image, so
  contrast holds whatever the photograph turns out to be.
- The chrome inverts to white over scenes marked `data-tone="media"`, or the
  wordmark disappears into a darker photograph.
- Touch targets are at least 44px; the menu is keyboard reachable and
  `aria-expanded` reflects its state.
- Ground treatments are tiled CSS gradients, so a scene costs one paint and
  nothing per frame.

## Roadmap

The site is built in reviewable phases, each independently runnable.

| # | Phase                                                            | State |
| - | ---------------------------------------------------------------- | ----- |
| 1 | Foundation — tokens, fonts, Lenis, chrome                        | done  |
| 2 | Hero — orchestrated load-in and scroll-linked exit               | done  |
| 3 | Services — cursor preview on desktop, thumbnails on touch        | done  |
| 4 | Portfolio — circular scroll-morph gallery                        | next  |
| 5 | Clips and About — in-view video playback, pinned composition     |       |
| 6 | Booking — Supabase, live availability, instant confirmation, email |     |
| 7 | Admin — password-gated appointment list and day blocking         |       |
| 8 | Hardening — real assets, mobile profiling, a11y audit, deploy    |       |

**Booking model:** a slot that is open is confirmed on the spot — no approval
step. Double-booking is prevented by a Postgres exclusion constraint over a
`tstzrange`, not by UI filtering, so concurrent requests for the same slot
cannot both succeed. Hours are daily 18:00–23:00, `America/Edmonton`.

## Rights

The code in this repository is published for reference. The brand, copy and
photography belong to Takiya and to the clients pictured, and are **not**
licensed for reuse. No open-source licence is granted over the contents of
`public/images/`.
