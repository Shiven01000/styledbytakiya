# Styled by Takiya

Motion-first portfolio and booking site for Takiya, a colourist in Edmonton.
Clients browse the work and request an appointment; payment happens in person
after the appointment, so there is no online checkout.

**Production:** styledbytakiya.ca (not yet deployed)

## Stack

| Concern      | Choice                                     |
| ------------ | ------------------------------------------ |
| Framework    | Next.js 16 (App Router) + TypeScript       |
| Styling      | Tailwind CSS v4, tokens in `app/globals.css` |
| Motion       | Framer Motion + Lenis (smooth scroll)      |
| Data         | Supabase (Postgres)                        |
| Email        | Resend                                     |
| Hosting      | Vercel                                     |

## Design direction

Register taken from [verostudio.com](https://www.verostudio.com/): a warm cream
ground, a high-contrast Didone for headlines, and a neo-grotesque for the small
amount of UI text. Type is **Bodoni Moda** over **Switzer**.

| Token        | Value     | Role              |
| ------------ | --------- | ----------------- |
| `cream`      | `#f3f0ed` | ground            |
| `cream-deep` | `#eae5e0` | alternating scenes |
| `ink`        | `#181615` | type              |

**There is no accent colour.** Colour comes from photography and nowhere else —
no tinted panels, no coloured buttons.

## Photography

Every image slot points at a key in `lib/images.ts` rather than a file path, so
swapping an image is a one-line edit and no component changes.

Photographs are set **into** a lit colour field rather than over it, the way a
subject sits on a seamless in a studio. `Backdrop` paints the field; `PhotoPlate`
paints a photograph with its edges dissolving into whatever is behind it. Three
things follow from that arrangement:

- the palette stays present, because the field is visible around every image;
- the subject keeps its true colour in the middle, which matters because this is
  a colourist's portfolio and tinting the hair would misrepresent the work;
- the cluttered edges of the current set never resolve into anything legible.

`PhotoPlate` takes `spread="plate"` for a portrait panel and `spread="wide"` for
a viewport-width scene. The two need different masks: an ellipse sized for a
plate leaves the side edges almost opaque once the element is viewport-wide.

The vignette and grain sit over photographs as well as fallbacks. That is
deliberate — the current set was shot on different days in different light, and
a shared vignette and grain is what makes a mixed bag read as one body of work.

**Current images are interim.** They are screenshots of Instagram posts, so they
carry app UI and burned-in "After" / "Result" overlays and are only ~1178px
wide, which is soft at full bleed. Interim photos are flagged `interim: true`
and get a small crop-in that pushes most of the corner UI outside the frame, at
some cost in sharpness. When camera-roll originals arrive, drop them into
`public/images/work/` under the same filenames and clear the flag.

The `photos/` folder at the repo root is a git-ignored drop folder for raw
source files.

**One typographic device carries the personality:** nouns in uppercase serif,
the words joining them in lowercase italic.

```tsx
<Headline text="COLOUR {that} STILL LOOKS RIGHT {at} WEEK SIX" />
```

Braced runs render lowercase italic, everything else uppercase. Resist adding a
second device.

**Scene vocabulary**, alternating so the page has a rhythm rather than a stack:

- `SceneStatement` — centred cream, one statement, optionally a short paragraph
  and one link. The restraint here is what lets the photographic scenes land.
- `SceneFullBleed` — edge-to-edge photograph with the statement anchored low
  over a bottom-weighted scrim, so white type keeps its contrast whatever the
  real photograph turns out to be.
- `Preloader` — waits on `document.fonts.ready` rather than a timer, so the
  serif never swaps mid-reveal.
- `SceneTransform` — the one pinned set piece. The before-image is peeled off
  the after-image by scroll progress with the seam tracking the edge, so the
  transformation happens at the speed you scroll.
- `MaskLine` / `FadeUp` — line-level reveals for statements, a quieter fade for
  body copy and links. Deliberately not per-character: at this size in a Didone,
  per-character staggering reads as a gimmick.
- `Services` — the menu. On a desktop the hovered row keeps the ink while its
  siblings drop back, and a preview trails the cursor on a spring. Touch never
  depends on hover: every row carries its own thumbnail.

Deliberately absent, because they are what made earlier passes read as
templated: hairline rules used as structure, tracked uppercase eyebrows,
decorative section indexes, standfirst panels, flat colour blocks, and uniform
section-after-section stacking. Words on screen are kept to a minimum.

## Getting started

```bash
npm install
npm run dev
```

## Layout

```
app/                 routes, layout, global tokens
components/
  providers/         SmoothScroll (Lenis root)
  sections/          Nav, Footer, page sections
  ui/                shadcn-compatible primitives
  dev/               review-only scaffolding, deleted as phases land
lib/                 utils, and later: supabase, availability, email
```

## Build phases

The site is built in reviewable phases. Current state: **Phase 3 complete**.
Photography is still stood in for by the `.backdrop-*` grounds.

1. **Foundation** — tokens, fonts, Lenis, chrome, section shells ✅
2. **Hero** — orchestrated load-in and scroll-linked exit ✅
3. **Services** — cursor-following preview on desktop, thumbnails on mobile ✅
4. Portfolio — circular scroll morph gallery
5. Clips and About — in-view video playback, sticky composition
6. Booking — Supabase schema, availability, instant confirmation, Resend email
7. Admin — password-gated appointment list and day blocking
8. Hardening — real assets, mobile profiling, reduced-motion audit, deploy
