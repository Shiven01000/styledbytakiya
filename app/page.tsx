import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SceneStatement } from "@/components/sections/SceneStatement";
import { SceneFullBleed } from "@/components/sections/SceneFullBleed";
import { SceneTransform } from "@/components/sections/SceneTransform";
import { PHOTOS } from "@/lib/images";

export default function Home() {
  return (
    <>
      <Hero />

      <SceneStatement
        lines={["COLOUR {that} STILL", "LOOKS RIGHT {at}", "WEEK SIX"]}
        body="Lived-in blonde and colour correction in Edmonton. One client in the chair at a time, which is the only way to work slowly enough to get it right."
      />

      {/* The one pinned set piece: the transformation runs at scroll speed. */}
      <SceneTransform
        id="work"
        after="amber"
        beforePhoto={PHOTOS.brassyGrownOut}
        afterPhoto={PHOTOS.ashDimensional}
        lines={["BRASSY {and} GROWN OUT,", "{back to} ASH"]}
        caption="One sitting" 
      />

      <Services />

      <SceneFullBleed
        id="motion"
        ground="olive"
        photo={PHOTOS.oilSlickMelt}
        lines={["HAIR {only reads}", "{when it} MOVES"]}
        caption="Oil-slick melt · in daylight" 
      />

      <SceneStatement
        id="about"
        lines={["NINE YEARS, {most of}", "{them spent undoing a}", "RUSH JOB"]}
        body="I work slowly and in daylight, and I would rather talk you out of a look than send you home with something that gives up by week three. Consultation is free and every appointment starts with one."
      />

      <SceneFullBleed
        id="booking"
        ground="rose"
        photo={PHOTOS.plumHighlights}
        lines={["PICK {a} TIME.", "{it is} YOURS {immediately}"]}
        caption="No deposit · payment in the chair" 
      />
    </>
  );
}
