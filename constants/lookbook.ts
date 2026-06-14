import { IMAGE_IDS, galleryFromIds, unsplash } from "./images";

import type { Lookbook } from "@/types";

export const LOOKBOOKS: Lookbook[] = [
  {
    slug: "editorial-noir",
    title: "Editorial Noir",
    subtitle: "Winter Story",
    coverImage: unsplash(IMAGE_IDS.editorial, {
      width: 1200,
      height: 1500,
      alt: "Editorial Noir lookbook cover",
    }),
    description: "Monochrome drama in sculpted silhouettes and shadow play.",
    gallery: galleryFromIds([IMAGE_IDS.editorial, IMAGE_IDS.lookbookAlt, IMAGE_IDS.fashionWalk], "Editorial Noir"),
  },
  {
    slug: "golden-hour",
    title: "Golden Hour",
    subtitle: "Festive Story",
    coverImage: unsplash(IMAGE_IDS.heroEmbroidery, {
      width: 1200,
      height: 1500,
      alt: "Golden Hour lookbook cover",
    }),
    description: "Warm light, hand embroidery, and the poetry of celebration.",
    gallery: galleryFromIds([IMAGE_IDS.heroEmbroidery, IMAGE_IDS.saree], "Golden Hour"),
  },
  {
    slug: "atelier-portraits",
    title: "Atelier Portraits",
    subtitle: "Behind the Craft",
    coverImage: unsplash(IMAGE_IDS.atelier, {
      width: 1200,
      height: 1500,
      alt: "Atelier Portraits lookbook cover",
    }),
    description: "Intimate glimpses into the hands that shape every Sahil Malik creation.",
    gallery: galleryFromIds([IMAGE_IDS.atelier, IMAGE_IDS.couture], "Atelier portrait"),
  },
];
