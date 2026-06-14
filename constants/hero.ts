import { IMAGE_IDS, unsplash } from "./images";

import type { HeroSlide } from "@/types";

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: unsplash(IMAGE_IDS.heroRunway, {
      width: 1920,
      height: 1080,
      alt: "Sahil Malik couture evening gown on runway",
      priority: true,
    }),
    quote: "We don't simply fall in love, we become it.",
    attribution: "— Sahil Malik, Becoming Love",
  },
  {
    image: unsplash(IMAGE_IDS.heroEditorial, {
      width: 1920,
      height: 1080,
      alt: "Editorial bridal couture by Sahil Malik",
    }),
    quote: "Luxury is shaped by care, craft, and time.",
    attribution: "— Sahil Malik Atelier",
  },
  {
    image: unsplash(IMAGE_IDS.heroEmbroidery, {
      width: 1920,
      height: 1080,
      alt: "Hand-embroidered festive couture detail",
    }),
    quote: "Every creation carries the soul of many hands.",
    attribution: "— Sahil Malik",
  },
];
