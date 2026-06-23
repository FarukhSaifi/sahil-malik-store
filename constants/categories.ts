import { COLLECTIONS } from "./collections";
import { collectionPath } from "./routes";

import type { Category } from "@/types";

const HOMEPAGE_CATEGORY_SLUGS = ["sherwani", "kurta-sets", "suits", "womenswear-stock-clearance"] as const;

export const CATEGORIES: Category[] = HOMEPAGE_CATEGORY_SLUGS.map((slug) => {
  const collection = COLLECTIONS.find((item) => item.slug === slug)!;

  return {
    slug: collection.slug,
    title: collection.title,
    href: collectionPath(collection.slug),
    image: {
      ...collection.coverImage,
      width: 800,
      height: 1000,
      alt: `${collection.title} by Sahil Malik`,
    },
  };
});
