import { COLLECTIONS, WOMENSWEAR_COLLECTION_SLUG } from "@/constants/collections";
import { localImage } from "@/constants/images";
import { collectionPath, ROUTES } from "@/constants/routes";

import type { DiscoverItem } from "@/types";

const DISCOVER_SLUGS = ["sherwani", "suits", WOMENSWEAR_COLLECTION_SLUG] as const;

export const DISCOVER_ITEMS: DiscoverItem[] = [
  ...DISCOVER_SLUGS.map((slug) => {
    const collection = COLLECTIONS.find((item) => item.slug === slug)!;

    return {
      title: collection.title,
      href: collectionPath(collection.slug),
      image: {
        ...collection.coverImage,
        width: 800,
        height: 1000,
        alt: `Discover ${collection.title}`,
      },
    };
  }),
  {
    title: "Sahil Malik World",
    href: ROUTES.about,
    image: localImage("/media/brand/about-hero.png", {
      width: 800,
      height: 1000,
      alt: "Discover Sahil Malik World",
    }),
  },
];
