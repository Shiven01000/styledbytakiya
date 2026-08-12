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

Palette direction is **Foil** — an aluminum-grey ground with a violet accent
and a brass secondary. Violet is not arbitrary: violet cancels brass and
yellow, which is the colourist's actual tool, so the two accents are a
colour-theory pair. Type is **Boska** (display) over **Switzer** (body), both
from Fontshare.

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

The site is built in reviewable phases. Current state: **Phase 1 complete** —
tokens, typefaces, smooth scroll, nav and footer, and placeholder section
shells that name what arrives in each later phase.

1. **Foundation** — tokens, fonts, Lenis, chrome, section shells ✅
2. Hero — orchestrated load-in and scroll-linked exit
3. Services — cursor-following preview on desktop, thumbnails on mobile
4. Portfolio — circular scroll morph gallery
5. Clips and About — in-view video playback, sticky composition
6. Booking — Supabase schema, availability, instant confirmation, Resend email
7. Admin — password-gated appointment list and day blocking
8. Hardening — real assets, mobile profiling, reduced-motion audit, deploy
