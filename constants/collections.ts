import { galleryFromPaths, localImage } from "./images";
import { MEDIA_MANIFEST  } from "./media-manifest";

import type {MediaManifestSlug} from "./media-manifest";
import type { Collection } from "@/types";

type CollectionDef = {
  slug: MediaManifestSlug;
  title: string;
  category: Collection["category"];
  season: string;
  description: string;
  featured: boolean;
  order: number;
};

const COLLECTION_DEFS: CollectionDef[] = [
  {
    slug: "sherwani",
    title: "Sherwani",
    category: "menswear",
    season: "Menswear",
    description:
      "Architectural sherwanis in heritage textiles, elevated with tonal threadwork, hand embroidery, and ceremonial refinement.",
    featured: true,
    order: 1,
  },
  {
    slug: "kurta-sets",
    title: "Kurta Sets",
    category: "menswear",
    season: "Menswear",
    description:
      "Festive and occasion kurta sets crafted with artisanal surface ornamentation, fluid silhouettes, and conscious luxury.",
    featured: true,
    order: 2,
  },
  {
    slug: "suits",
    title: "Suits",
    category: "menswear",
    season: "Menswear",
    description:
      "Tailored suits that balance modern structure with Sahil Malik's signature embroidery and refined Indian craft.",
    featured: true,
    order: 3,
  },
  {
    slug: "jawahar-jacket-set",
    title: "Jawahar Jacket Set",
    category: "menswear",
    season: "Menswear",
    description:
      "Jawahar jacket sets rendered in rich weaves and meticulous hand-finish — occasion wear with quiet authority.",
    featured: false,
    order: 4,
  },
  {
    slug: "bandhgala-indo-western",
    title: "Bandhgala & Indo-Western",
    category: "menswear",
    season: "Menswear",
    description:
      "Bandhgalas and Indo-western silhouettes that merge classic Indian tailoring with contemporary global restraint.",
    featured: false,
    order: 5,
  },
  {
    slug: "shirts",
    title: "Shirts",
    category: "menswear",
    season: "Menswear",
    description:
      "Elevated shirts with embroidered detail and precise cut — versatile pieces from the Sahil Malik atelier.",
    featured: false,
    order: 6,
  },
  {
    slug: "womenswear-stock-clearance",
    title: "Womenswear Stock Clearance",
    category: "womenswear",
    season: "Womenswear",
    description:
      "A curated selection of womenswear pieces from the atelier — limited availability, signature Sahil Malik craft.",
    featured: true,
    order: 7,
  },
];

function buildCollection(def: CollectionDef): Collection {
  const paths = MEDIA_MANIFEST[def.slug];

  return {
    slug: def.slug,
    title: def.title,
    category: def.category,
    season: def.season,
    description: def.description,
    featured: def.featured,
    order: def.order,
    coverImage: localImage(paths[0], {
      width: 1200,
      height: 1500,
      alt: `${def.title} by Sahil Malik`,
      priority: def.featured,
    }),
    gallery: galleryFromPaths(paths, def.title),
  };
}

export const COLLECTIONS: Collection[] = COLLECTION_DEFS.map(buildCollection);
