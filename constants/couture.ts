import { IMAGE_IDS, galleryFromIds, unsplash } from "./images";

import type { CoutureSeason } from "@/types";

export const COUTURE_SEASONS: CoutureSeason[] = [
  {
    slug: "alchemy-spring-2026",
    title: "Alchemy",
    subtitle: "Couture Spring 2026",
    season: "Spring",
    year: 2026,
    featured: true,
    heroImage: unsplash(IMAGE_IDS.heroEmbroidery, {
      width: 1920,
      height: 1080,
      alt: "Alchemy Couture Spring 2026",
      priority: true,
    }),
    description:
      "Elemental ideas translated into meticulously crafted couture — fire, water, air, and earth woven into Parisian silhouettes.",
    gallery: galleryFromIds(
      [IMAGE_IDS.heroEmbroidery, IMAGE_IDS.heroRunway, IMAGE_IDS.heroEditorial],
      "Alchemy couture",
    ),
  },
  {
    slug: "becoming-love-fall-2025",
    title: "Becoming Love",
    subtitle: "Couture Fall 2025",
    season: "Fall",
    year: 2025,
    featured: true,
    heroImage: unsplash(IMAGE_IDS.bridal, {
      width: 1920,
      height: 1080,
      alt: "Becoming Love Couture Fall 2025",
    }),
    description:
      "Paris Haute Couture presented as an ode to transformation — where devotion meets deliberate, slow craft.",
    gallery: galleryFromIds([IMAGE_IDS.bridal, IMAGE_IDS.eveningGown], "Becoming Love couture"),
  },
  {
    slug: "aura-fall-2024",
    title: "Aura",
    subtitle: "Couture Fall 2024",
    season: "Fall",
    year: 2024,
    featured: false,
    heroImage: unsplash(IMAGE_IDS.heroEditorial, {
      width: 1920,
      height: 1080,
      alt: "Aura Couture Fall 2024",
    }),
    description: "Luminous surfaces and weightless volumes — couture that exists between presence and atmosphere.",
    gallery: galleryFromIds([IMAGE_IDS.heroEditorial], "Aura couture"),
  },
];
