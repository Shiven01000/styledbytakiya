import { Hero } from "@/components/sections/Hero";
import { SectionShell } from "@/components/sections/SectionShell";

export default function Home() {
  return (
    <>
      <Hero />

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
        blurb="Short muted loops that only play while they are on screen. This band inverts to gunmetal so the footage carries the section."
        arriving="Phase 5 — IntersectionObserver-gated video, cursor spotlight"
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
    </>
  );
}
