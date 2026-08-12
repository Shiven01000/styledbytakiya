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

Palette direction is **Foil** — a brushed aluminum ground with a sage accent
and a copper secondary. The accents are a colour-theory pair taken from the
craft: green cancels red, and copper is the warmth it cancels. Type is
**Boska** (display) over **Switzer** (body), both from Fontshare.

The metal is built rather than painted, and these four pieces are the visual
vocabulary to extend rather than replace with flat fills:

- `.metal` / `.metal-reverse` / `.metal-dark` — fine directional striations
  under a specular sheen, with the sheen angle flipped on alternating panels so
  the page reads as a stack of brushed sheets rather than one flat field
- `.engrave` — a dark scribe with a lit edge beneath it, in place of flat 1px
  hairlines
- `.lettering` / `.lettering-invert` — a narrow dark-on-dark gradient on
  display type so it reads as a material

Every palette and type value lives in one `:root` block at the top of
`app/globals.css`. Swapping the whole site to the alternative cream direction
means editing that block and the font `<link>` in `app/layout.tsx` — no
component changes.

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
