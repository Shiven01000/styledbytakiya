import type { Ground } from "@/components/media/Backdrop";

/**
 * Placeholder menu. Names use the brace convention from `Headline` — braced
 * runs set lowercase italic. Real names, durations and prices come from
 * Supabase in Phase 6; this shape matches the `services` table so the swap is
 * a data-source change rather than a component change.
 */
export type Service = {
  slug: string;
  name: string;
  note: string;
  priceFrom: number;
  ground: Ground;
};

export const SERVICES: Service[] = [
  {
    slug: "cut-and-style",
    name: "CUT {and} STYLE",
    note: "Dry cut · 90 min",
    priceFrom: 95,
    ground: "sand",
  },
  {
    slug: "lived-in-balayage",
    name: "LIVED-IN {balayage}",
    note: "Colour · 3–4 hrs",
    priceFrom: 260,
    ground: "amber",
  },
  {
    slug: "colour-correction",
    name: "COLOUR {correction}",
    note: "Consultation first · 4–6 hrs",
    priceFrom: 420,
    ground: "slate",
  },
  {
    slug: "bridal",
    name: "BRIDAL {and} TRIAL",
    note: "Two sittings",
    priceFrom: 180,
    ground: "rose",
  },
  {
    slug: "silk-press",
    name: "SILK {press}",
    note: "Smoothing · 2 hrs",
    priceFrom: 110,
    ground: "olive",
  },
  {
    slug: "extensions",
    name: "HAND-TIED {extensions}",
    note: "Install and blend · 4 hrs",
    priceFrom: 340,
    ground: "sand",
  },
];
