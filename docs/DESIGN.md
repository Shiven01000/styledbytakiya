# Design rationale

Why this site looks the way it does, and — more usefully — what it deliberately
avoids. Written down because two earlier directions were built and rejected, and
the reasons are not recoverable from the code alone.

## The brief

A colourist's portfolio whose job is to convince someone to book. Motion-first,
mobile-first, imagery-led. The audience is prospective clients deciding whether
to trust their hair to a stranger, not other designers.

## Two rejected directions

### 1. Editorial magazine (rejected)

The first build extended an imported design-tool mockup: hairline rules as
structure, tracked uppercase eyebrows, `01 / 02 / 03` section indexes,
standfirst panels, a big serif over a warm cream ground.

Rejected as "generic, AI generated". Correctly — that combination is one of the
most common looks in machine-generated design right now.

### 2. Dark studio (rejected)

Diagnosing the problem as *cream plus serif*, the second build pivoted hard: a
near-black ground, a geometric grotesque, monospace labels, and a scattered
depth-of-field mosaic that assembled into a portrait on scroll. The reference
was [produx.design](https://www.produx.design/).

**That diagnosis was wrong.** The client then pointed at
[verostudio.com](https://www.verostudio.com/) — which is cream `#f3f0ed` with a
Didone serif, almost exactly the palette the pivot had abandoned — and said they
liked it a great deal.

### What the actual problem was

Neither the palette nor the typeface. It was:

1. **No photography.** The pages were typography over grey placeholder boxes. A
   site whose entire argument is "look at this hair" had nothing to look at.
2. **Too many words and too much furniture.** Eyebrows, tracked micro-labels,
   index numbers, standfirst panels, even build-status notes rendered into the
   design itself.

Both reference sites the client chose are opposites in palette but agree
completely on being **imagery-led and sparse**. That is the axis that matters.
Judge future work on it, not on light versus dark.

## The current direction

Warm cream, a high-contrast Didone, a neo-grotesque for the little UI text there
is, and photography carrying every screen.

### Rules

1. **No accent colour.** Colour comes from photography and nowhere else. There
   is no tinted panel or coloured button value anywhere in `globals.css`, so the
   rule enforces itself.
2. **One typographic device.** Nouns uppercase, joining words lowercase italic.
   One device, used everywhere, is what makes it read as a voice rather than as
   decoration. A second device would dilute it.
3. **Few words on screen.** Chrome is a menu button, a wordmark and one link.
   If a label is explaining the design, cut it.
4. **Scenes alternate.** Quiet centred cream against edge-to-edge photography,
   so the page has a rhythm. Uniform stacking was part of what read as
   templated.
5. **Motion has a cause.** No two elements share a delay in the hero, so the
   load reads as one movement rather than six things fading up together.

### Banned

Hairline rules used as structure, tracked uppercase eyebrows, decorative section
indexes, standfirst panels, flat colour blocks, serif-plus-cream *without*
photography, and uniform section-after-section stacking.

## Photography as a material

Photographs are set **into** a lit colour field rather than laid over it, the
way a subject sits on a seamless in a studio. The field shows through as the
photograph's edges dissolve.

This was not the first attempt. Full-bleed photography worked, but the client
noted the gradient-only version had been sleeker. Setting the image into the
field keeps both: real work in the middle, palette around it.

Three consequences, all deliberate:

- The palette survives contact with photography.
- The subject keeps its **true colour** in the middle. Tinting or duotoning the
  hair would look striking and would also misrepresent the work, which is
  disqualifying for a colourist.
- Cluttered edges — salon mirrors, product shelves, other clients — dissolve
  instead of needing to be cropped away.

Vignette and grain sit over photographs as well as fallbacks, because the source
set was shot on different days in different light and a shared treatment is what
makes a mixed bag read as one body of work.

## Motion vocabulary

| Move                 | Where                | Why                                        |
| -------------------- | -------------------- | ------------------------------------------ |
| Line mask reveal     | Statements           | Poise; per-character reads as a gimmick    |
| Quiet fade           | Body copy, links     | The statement above is already theatrical  |
| Slow drift           | Hero photography     | Never perfectly still, never distracting   |
| Scroll-scrubbed wipe | `SceneTransform`     | The transformation happens at scroll speed |
| Cursor-trailed plate | Services menu        | Springs so it lags the hand, not sticks    |

`SceneTransform` is the only pinned section. For a colourist the before/after
*is* the pitch, so it earns being the one place the page holds still.

## Decisions worth not relitigating

- **Instant booking, not requests.** An open slot confirms on the spot. Safety
  comes from a Postgres exclusion constraint, not from UI filtering.
- **Native touch scrolling.** Lenis smooths the wheel; touch is left alone,
  because synthesised momentum is where phone jank comes from.
- **Line-level reveals.** Tried per-character; at Didone display sizes it reads
  as a gimmick.
- **Reduced motion renders the finished composition**, not a degraded animation.
