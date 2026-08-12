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
no tinted panels, no coloured buttons. Until real photographs exist the
`.backdrop-*` classes stand in as art-directed studio grounds (a lit seamless
ground with vignette and grain); they are placeholders and come out when the
real imagery lands.

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
- `MaskLine` — line-level reveals. Deliberately not per-character: at this size
  in a Didone, per-character staggering reads as a gimmick.

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

The site is built in reviewable phases. Current state: **Phase 2 complete** —
the hero is real; the remaining sections are placeholder shells that name what
arrives in each later phase.

1. **Foundation** — tokens, fonts, Lenis, chrome, section shells ✅
2. **Hero** — orchestrated load-in and scroll-linked exit ✅
3. Services — cursor-following preview on desktop, thumbnails on mobile
4. Portfolio — circular scroll morph gallery
5. Clips and About — in-view video playback, sticky composition
6. Booking — Supabase schema, availability, instant confirmation, Resend email
7. Admin — password-gated appointment list and day blocking
8. Hardening — real assets, mobile profiling, reduced-motion audit, deploy
