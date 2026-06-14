import type { Collection } from "@/lib/data/types";
import { IMAGE_IDS, galleryFromIds, unsplash } from "./images";

export const COLLECTIONS: Collection[] = [
  {
    slug: "becoming-love-festive-25",
    title: "Becoming Love",
    category: "bridal",
    season: "Festive '25",
    coverImage: unsplash(IMAGE_IDS.bridal, {
      width: 1200,
      height: 1500,
      alt: "Becoming Love Festive 2025 collection",
      priority: true,
    }),
    description:
      "A celebration of devotion rendered in hand embroidery, silk organza, and celestial motifs — where romance becomes ritual.",
    featured: true,
    order: 1,
    gallery: galleryFromIds(
      [IMAGE_IDS.bridal, IMAGE_IDS.couture, IMAGE_IDS.heroEditorial, IMAGE_IDS.fashionWalk],
      "Becoming Love",
    ),
  },
  {
    slug: "raas-spring-summer-26",
    title: "Raas",
    category: "evening",
    season: "Spring Summer '26",
    coverImage: unsplash(IMAGE_IDS.heroRunway, {
      width: 1200,
      height: 1500,
      alt: "Raas Spring Summer 2026 collection",
    }),
    description:
      "Elemental silhouettes in fluid drapes and micro-pleats, inspired by the rhythm of spring and the poetry of movement.",
    featured: true,
    order: 2,
    gallery: galleryFromIds(
      [IMAGE_IDS.heroRunway, IMAGE_IDS.eveningGown, IMAGE_IDS.couture, IMAGE_IDS.editorial],
      "Raas",
    ),
  },
  {
    slug: "amrita-festive-24",
    title: "Amrita",
    category: "saree",
    season: "Festive '24",
    coverImage: unsplash(IMAGE_IDS.saree, {
      width: 1200,
      height: 1500,
      alt: "Amrita Festive 2024 saree collection",
    }),
    description:
      "Heritage weaves reimagined through contemporary drape, featuring zardozi, aari, and tonal resham embroidery.",
    featured: true,
    order: 3,
    gallery: galleryFromIds(
      [IMAGE_IDS.saree, IMAGE_IDS.heroEmbroidery, IMAGE_IDS.bridal, IMAGE_IDS.fashionWalk],
      "Amrita",
    ),
  },
  {
    slug: "nargis-festive-24",
    title: "Nargis",
    category: "evening",
    season: "Festive '24",
    coverImage: unsplash(IMAGE_IDS.eveningGown, {
      width: 1200,
      height: 1500,
      alt: "Nargis Festive 2024 evening collection",
    }),
    description:
      "Nocturnal florals bloom across sculpted corsetry and trailing hemlines — evening wear as wearable art.",
    featured: true,
    order: 4,
    gallery: galleryFromIds(
      [IMAGE_IDS.eveningGown, IMAGE_IDS.heroRunway, IMAGE_IDS.couture, IMAGE_IDS.editorial],
      "Nargis",
    ),
  },
  {
    slug: "cosmos-spring-23",
    title: "Cosmos",
    category: "bridal",
    season: "Spring Festive '23",
    coverImage: unsplash(IMAGE_IDS.heroEditorial, {
      width: 1200,
      height: 1500,
      alt: "Cosmos Spring Festive 2023 collection",
    }),
    description:
      "Constellations hand-stitched across tulle and silk — a bridal odyssey through light, shadow, and infinite craft.",
    featured: false,
    order: 5,
    gallery: galleryFromIds(
      [IMAGE_IDS.heroEditorial, IMAGE_IDS.bridal, IMAGE_IDS.couture, IMAGE_IDS.fashionWalk],
      "Cosmos",
    ),
  },
  {
    slug: "regal-menswear-25",
    title: "Regal",
    category: "menswear",
    season: "Festive '25",
    coverImage: unsplash(IMAGE_IDS.menswear, {
      width: 1200,
      height: 1500,
      alt: "Regal Menswear Festive 2025",
    }),
    description:
      "Sherwanis and bandhgalas in architectural cuts, elevated with tonal threadwork and heritage textiles.",
    featured: false,
    order: 6,
    gallery: galleryFromIds(
      [IMAGE_IDS.menswear, IMAGE_IDS.fashionWalk, IMAGE_IDS.editorial, IMAGE_IDS.atelier],
      "Regal",
    ),
  },
];
