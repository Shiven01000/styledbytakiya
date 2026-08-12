import Link from "next/link";
import { SectionShell } from "@/components/sections/SectionShell";
import { TokenSpecimen } from "@/components/dev/TokenSpecimen";

export default function Home() {
  return (
    <>
      {/* Hero — static in Phase 1. The orchestrated load-in sequence and the
          scroll-linked exit arrive in Phase 2. */}
      <section className="flex min-h-svh flex-col justify-between px-gutter pt-28 pb-8 md:pt-36">
        <p className="text-micro font-medium tracking-micro text-violet uppercase">
          Colourist &nbsp;/&nbsp; Colour correction &nbsp;/&nbsp; Edmonton
          &nbsp;/&nbsp; By appointment only
        </p>

        <div className="py-10">
          <h1 className="font-display text-d-xxl leading-[0.82] font-normal tracking-display-tight">
            Takiya
          </h1>
          <p className="ml-[8vw] font-display text-d-xl leading-[0.9] font-light tracking-display text-violet italic md:ml-[14vw]">
            Bauce
          </p>
          <p className="mt-8 max-w-[34ch] text-body-lg leading-relaxed font-light text-ink-body text-pretty">
            Lived-in blondes and colour correction, cut for how you actually
            wear it. One client in the chair at a time — no double-booking, no
            rushing.
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <span className="flex items-center gap-3 text-micro font-medium tracking-micro text-ink-faint uppercase">
            <span className="h-px w-8 bg-ink-faint" aria-hidden />
            Scroll
          </span>
          <Link
            href="#booking"
            className="border-b-2 border-violet pb-1 font-display text-d-sm font-medium tracking-display text-ink transition-colors duration-300 hover:text-violet"
          >
            Request a booking →
          </Link>
        </div>
      </section>

      <SectionShell
        id="services"
        index="01"
        label="Services"
        title="The"
        accent="menu"
        blurb="Starting rates. Length, density and colour history move the number — you get the real quote at consultation, before anything is mixed."
        arriving="Phase 3 — cursor-following preview on desktop, thumbnail rows on mobile"
        tone="shift"
      />

      <SectionShell
        id="portfolio"
        index="02"
        label="Work"
        title="Selected"
        accent="work"
        blurb="Before and after, in the round. The gallery is the centrepiece interaction on this site rather than a grid of thumbnails."
        arriving="Phase 4 — circular scroll morph: scatter, line, ring, then arc"
      />

      <SectionShell
        id="clips"
        index="03"
        label="In motion"
        title="Hair, actually"
        accent="moving"
        blurb="Short muted loops that only play while they are on screen. This band inverts to near-black so the footage carries the section."
        arriving="Phase 5 — IntersectionObserver-gated video, violet cursor spotlight"
        tone="eclipse"
      />

      <SectionShell
        id="about"
        index="04"
        label="About"
        title="Nine years behind the"
        accent="chair"
        blurb="Most of them spent fixing colour someone else rushed. Slow work, in daylight, with a free consultation where every appointment starts."
        arriving="Phase 5 — sticky portrait with the text panel scrolling over it"
        tone="shift"
      />

      <SectionShell
        id="booking"
        index="05"
        label="Booking"
        title="Request"
        accent="a chair"
        blurb="Pick a service and a time and it is confirmed on the spot. Nothing is charged here — payment happens in the salon, after."
        arriving="Phase 6 — live availability from Supabase, confirmation email via Resend"
      />

      <TokenSpecimen />
    </>
  );
}
