import { COLLECTIONS } from "@/constants/collections";
import { collectionPath } from "@/constants/routes";

import type { Category } from "@/types";

export const CATEGORIES: Category[] = [...COLLECTIONS]
  .sort((a, b) => a.order - b.order)
  .map((collection) => ({
    slug: collection.slug,
    title: collection.title,
    href: collectionPath(collection.slug),
    image: {
      ...collection.coverImage,
      width: 800,
      height: 1000,
      alt: `${collection.title} by Sahil Malik`,
    },
  }));
