import { COLLECTIONS, WOMENSWEAR_COLLECTION_SLUG } from "@/constants/collections";
import { collectionPath } from "@/constants/routes";

import type { Category } from "@/types";

/** Homepage category tiles under the hero — fixed order. */
export const HOME_CATEGORY_SLUGS = [
  "kurta-sets",
  "bandhgala-indo-western",
  "sherwani",
  WOMENSWEAR_COLLECTION_SLUG,
] as const;

function toCategory(collection: (typeof COLLECTIONS)[number]): Category {
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
}

export const CATEGORIES: Category[] = HOME_CATEGORY_SLUGS.map((slug) => {
  const collection = COLLECTIONS.find((item) => item.slug === slug);

  if (!collection) {
    throw new Error(`Missing collection for homepage category slug "${slug}".`);
  }

  return toCategory(collection);
});
