import { galleryFromPaths, localImage } from "@/constants/images";

import type { CoutureSeason } from "@/types";

/** SM-SH-004 — Ivory Embellished Couture Sherwani */
const NAQSH_IMAGES = [
  "/media/menswear/sherwani/set-4/untitled-session16709-copy.jpg",
  "/media/menswear/sherwani/set-4/untitled-session16714-copy.jpg",
  "/media/menswear/sherwani/set-4/untitled-session16768-copy.jpg",
] as const;

/** SM-SH-003 — Ivory Dabka Embroidered Couture Sherwani */
const NOORANI_IMAGES = [
  "/media/menswear/sherwani/set-3/dsc-0540-copy.jpg",
  "/media/menswear/sherwani/set-3/dsc-0546-copy.jpg",
  "/media/menswear/sherwani/set-3/dsc-0558-copy.jpg",
] as const;

export const COUTURE_SEASONS: CoutureSeason[] = [
  {
    slug: "naqsh-2026",
    title: "Naqsh",
    subtitle: "Ivory Embellished Couture",
    season: "2026",
    year: 2026,
    featured: true,
    heroImage: localImage(NAQSH_IMAGES[0], {
      width: 1920,
      height: 1080,
      alt: "Naqsh — Ivory Embellished Couture",
      priority: true,
    }),
    description:
      "Named for the art of pattern and ornament, Naqsh presents an ivory raw silk sherwani adorned with intricate hand embroidery — sequins, beads, and cut beads — crafted for celebrations of enduring elegance.",
    gallery: galleryFromPaths(NAQSH_IMAGES, "Naqsh couture"),
  },
  {
    slug: "noorani-2026",
    title: "Noorani",
    subtitle: "Ivory Dabka Couture",
    season: "2026",
    year: 2026,
    featured: true,
    heroImage: localImage(NOORANI_IMAGES[0], {
      width: 1920,
      height: 1080,
      alt: "Noorani — Ivory Dabka Couture",
    }),
    description:
      "Radiant ivory couture defined by dabka hand embroidery with pearls and cut bead detailing — a ceremonial sherwani layered over silk kurta, completed with a matching stole and churidar pajama.",
    gallery: galleryFromPaths(NOORANI_IMAGES, "Noorani couture"),
  },
];
