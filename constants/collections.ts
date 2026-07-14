import { COLLECTION_CATEGORIES, WOMENSWEAR_COLLECTION_SLUG } from "@/constants/collection-keys";
import { galleryFromPaths, localImage } from "@/constants/images";

import { MEDIA_MANIFEST } from "@/generated/media-manifest";

import type { MediaManifestSlug } from "@/generated/media-manifest";
import type { Collection, CollectionDefinition } from "@/types";

export { COLLECTION_CATEGORIES, WOMENSWEAR_COLLECTION_SLUG } from "@/constants/collection-keys";

const COLLECTION_DEFS: Array<CollectionDefinition & { slug: MediaManifestSlug }> = [
  {
    slug: "sherwani",
    title: "Sherwani",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Architectural sherwanis in heritage textiles, elevated with tonal threadwork, hand embroidery, and ceremonial refinement.",
    featured: true,
    order: 1,
  },
  {
    slug: "kurta-sets",
    title: "Kurta Sets",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Festive and occasion kurta sets crafted with artisanal surface ornamentation, fluid silhouettes, and conscious luxury.",
    featured: true,
    order: 2,
  },
  {
    slug: "suits",
    title: "Suits",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Tailored suits that balance modern structure with Sahil Malik's signature embroidery and refined Indian craft.",
    featured: true,
    order: 3,
  },
  {
    slug: "jawahar-jacket-set",
    title: "Jawahar Jacket Set",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Jawahar jacket sets rendered in rich weaves and meticulous hand-finish — occasion wear with quiet authority.",
    featured: false,
    order: 4,
  },
  {
    slug: "bandhgala-indo-western",
    title: "Bandhgala & Indo-Western",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Bandhgalas and Indo-western silhouettes that merge classic Indian tailoring with contemporary global restraint.",
    featured: false,
    order: 5,
  },
  {
    slug: "shirts",
    title: "Shirts",
    category: COLLECTION_CATEGORIES.menswear,
    season: "Menswear",
    description:
      "Elevated shirts with embroidered detail and precise cut — versatile pieces from the Sahil Malik atelier.",
    featured: false,
    order: 6,
  },
  {
    slug: WOMENSWEAR_COLLECTION_SLUG,
    title: "Womens Wear",
    category: COLLECTION_CATEGORIES.womenswear,
    season: "Womenswear",
    description:
      "A curated selection of womenswear pieces from the atelier — limited availability, signature Sahil Malik craft.",
    featured: true,
    order: 7,
  },
];

function buildCollection(def: CollectionDefinition & { slug: MediaManifestSlug }): Collection {
  const paths = MEDIA_MANIFEST[def.slug];

  if (!paths?.length) {
    throw new Error(
      `No media manifest images for collection "${def.slug}". Run npm run normalize:media:apply && npm run generate:media.`,
    );
  }

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
