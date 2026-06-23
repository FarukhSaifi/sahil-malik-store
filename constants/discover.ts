import { COLLECTIONS } from "./collections";
import { localImage } from "./images";
import { collectionPath, ROUTES } from "./routes";

import type { DiscoverItem } from "@/types";

const DISCOVER_SLUGS = ["sherwani", "suits", "womenswear-stock-clearance"] as const;

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
