import { galleryFromPaths, localImage } from "@/constants/images";

import type { CoutureSeason } from "@/types";

/** SM-SH-004 — Ivory Embellished Couture Sherwani */
const NAQSH_IMAGES = [
  "/media/menswear/sherwani/set-4/untitled-session16709-copy.jpg",
  "/media/menswear/sherwani/set-4/untitled-session16714-copy.jpg",
  "/media/menswear/sherwani/set-4/untitled-session16768-copy.jpg",
] as const;

/** SM-BI-003 — Blush 3D Hand Embroidered Raw Silk Bandhgala Set */
const NOORANI_IMAGES = [
  "/media/menswear/bandhgala-indo-western/set-3/dsc-0099-copy.jpg",
  "/media/menswear/bandhgala-indo-western/set-3/dsc-0105-copy.jpg",
  "/media/menswear/bandhgala-indo-western/set-3/dsc-0107-copy.jpg",
  "/media/menswear/bandhgala-indo-western/set-3/dsc-0114-copy.jpg",
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
    subtitle: "Blush 3D Embroidered Couture",
    season: "2026",
    year: 2026,
    featured: true,
    heroImage: localImage(NOORANI_IMAGES[0], {
      width: 1920,
      height: 1080,
      alt: "Noorani — Blush 3D Embroidered Couture",
    }),
    description:
      "Named for radiance, Noorani presents a blush raw silk bandhgala defined by three-dimensional hand embroidery with kasab outlining, beads, and pearls — styled with a matching blush inner layer and ivory trousers for a refined contemporary silhouette.",
    gallery: galleryFromPaths(NOORANI_IMAGES, "Noorani couture"),
  },
];
