import { Hero } from "@/components/sections/Hero";
import { SceneStatement } from "@/components/sections/SceneStatement";
import { SceneFullBleed } from "@/components/sections/SceneFullBleed";

export default function Home() {
  return (
    <>
      <Hero />

      <SceneStatement
        lines={["COLOUR {that} STILL", "LOOKS RIGHT {at}", "WEEK SIX"]}
        body="Lived-in blonde and colour correction in Edmonton. One client in the chair at a time, which is the only way to work slowly enough to get it right."
      />

      <SceneFullBleed
        id="work"
        ground="sand"
        lines={["BEFORE {and} AFTER,", "{in the} ROUND"]}
        caption="Honey balayage · grown out four months"
      />

      <SceneStatement
        id="services"
        tone="deep"
        lines={["EVERY PRICE {here is a}", "STARTING POINT"]}
        body="Length, density and whatever happened to your hair before you got here all move the number. You get the real figure at consultation, before anything is mixed."
        action={{ href: "#booking", label: "See the menu" }}
      />

      <SceneFullBleed
        id="motion"
        ground="olive"
        lines={["HAIR {only reads}", "{when it} MOVES"]}
        caption="Silk press · in motion"
      />

      <SceneStatement
        id="about"
        lines={["NINE YEARS, {most of}", "{them spent undoing a}", "RUSH JOB"]}
        body="I work slowly and in daylight, and I would rather talk you out of a look than send you home with something that gives up by week three. Consultation is free and every appointment starts with one."
      />

      <SceneFullBleed
        id="booking"
        ground="rose"
        lines={["PICK {a} TIME.", "{it is} YOURS {immediately}"]}
        caption="No deposit · payment in the chair"
      />
    </>
  );
}
