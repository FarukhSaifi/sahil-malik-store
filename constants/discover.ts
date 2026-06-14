import { IMAGE_IDS, unsplash } from "./images";

import type { DiscoverItem } from "@/types";

export const DISCOVER_ITEMS: DiscoverItem[] = [
  {
    title: "Alchemy — Couture Spring 2026",
    href: "/couture/alchemy-spring-2026",
    image: unsplash(IMAGE_IDS.heroEmbroidery, {
      width: 800,
      height: 1000,
      alt: "Discover Alchemy Couture Spring 2026",
    }),
  },
  {
    title: "Sahil Malik World",
    href: "/about",
    image: unsplash(IMAGE_IDS.atelier, {
      width: 800,
      height: 1000,
      alt: "Discover Sahil Malik World",
    }),
  },
  {
    title: "Becoming Love — Couture Fall 2025",
    href: "/couture/becoming-love-fall-2025",
    image: unsplash(IMAGE_IDS.bridal, {
      width: 800,
      height: 1000,
      alt: "Discover Becoming Love Couture Fall 2025",
    }),
  },
];
