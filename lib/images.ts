/**
 * Photo manifest.
 *
 * Every slot on the site points at a key here rather than a file path, so
 * replacing an image is a one-line edit and no component ever needs touching.
 *
 * STATUS: interim. These are screenshots of Takiya's Instagram posts, so they
 * carry app UI (carousel badges, mute icons, avatars) and burned-in "After" /
 * "Result" overlays, and they are only ~1178px wide — soft at full-bleed on a
 * high-density screen. When the camera-roll originals arrive, drop them in
 * `public/images/work/` under the same filenames and everything updates.
 */

export type Photo = {
  src: string;
  alt: string;
  /** True while the file still has Instagram UI or text burned into it. */
  interim?: boolean;
};

/**
 * The single switch for photography across the whole site.
 *
 * Off, every slot falls back to its lit colour ground and the site runs on the
 * palette alone. On, the same slots carry the photographs. Nothing else needs
 * touching either way — the files stay in `public/images/work/` and the slot
 * assignments below stay intact.
 */
export const PHOTOS_ENABLED = false;

const work = (file: string, alt: string): Photo | undefined =>
  PHOTOS_ENABLED
    ? { src: `/images/work/${file}`, alt, interim: true }
    : undefined;

export const PHOTOS = {
  auburnWaves: work(
    "auburn-waves.jpg",
    "Long auburn hair in soft waves against a pale wall",
  ),
  icyBlondeWaves: work(
    "icy-blonde-waves.jpg",
    "Icy ash blonde with dimensional lowlights, waved",
  ),
  lavenderCarve: work(
    "lavender-carve.jpg",
    "Lavender buzz cut with carved striped detail, shot outdoors",
  ),
  oilSlickMelt: work(
    "oil-slick-melt.jpg",
    "Oil-slick colour melt of blue, green and magenta over dark hair",
  ),
  plumHighlights: work(
    "plum-highlights.jpg",
    "Magenta and plum highlights woven through dark brown hair",
  ),
  brassyGrownOut: work(
    "brassy-grown-out.jpg",
    "Grown-out blonde with warm brassy mid-lengths and dark roots",
  ),
  ashDimensional: work(
    "ash-dimensional.jpg",
    "Cool ash blonde with dimensional lowlights, waved",
  ),
  texturedCrop: work(
    "textured-crop.jpg",
    "Short textured crop with ash blonde tips",
  ),
  blueBlackLayers: work(
    "blue-black-layers.jpg",
    "Blue-black long layers with curtain bangs",
  ),
  glossyBlackBlowout: work(
    "glossy-black-blowout.jpg",
    "Glossy black hair in a layered blowout",
  ),
  redBlackShag: work(
    "red-black-shag.jpg",
    "Red and black shag with a curtain fringe",
  ),
  platinumCrop: work(
    "platinum-crop.jpg",
    "Platinum white spiked crop",
  ),
} satisfies Record<string, Photo | undefined>;

export type PhotoKey = keyof typeof PHOTOS;
