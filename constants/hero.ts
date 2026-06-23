import { localImage } from "./images";
import { MEDIA_MANIFEST } from "./media-manifest";

import type { HeroSlide } from "@/types";

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: localImage(MEDIA_MANIFEST.sherwani[0], {
      width: 1920,
      height: 1080,
      alt: "Sahil Malik sherwani collection",
      priority: true,
    }),
    quote: "We don't simply fall in love, we become it.",
    attribution: "— Sahil Malik, Becoming Love",
  },
  {
    image: localImage(MEDIA_MANIFEST.suits[0], {
      width: 1920,
      height: 1080,
      alt: "Sahil Malik tailored suits",
    }),
    quote: "Luxury is shaped by care, craft, and time.",
    attribution: "— Sahil Malik Atelier",
  },
  {
    image: localImage(MEDIA_MANIFEST["kurta-sets"][0], {
      width: 1920,
      height: 1080,
      alt: "Sahil Malik kurta sets",
    }),
    quote: "Every creation carries the soul of many hands.",
    attribution: "— Sahil Malik",
  },
];
