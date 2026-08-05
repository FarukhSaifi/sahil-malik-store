import { COLLECTIONS } from "@/constants/collections";
import { collectionPath } from "@/constants/routes";

import type { DiscoverItem } from "@/types";

export const DISCOVER_ITEMS: DiscoverItem[] = [...COLLECTIONS]
  .sort((a, b) => a.order - b.order)
  .map((collection) => ({
    title: collection.title,
    href: collectionPath(collection.slug),
    image: {
      ...collection.coverImage,
      width: 800,
      height: 1000,
      alt: `Discover ${collection.title}`,
    },
  }));
