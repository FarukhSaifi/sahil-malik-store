import type { Category } from "@/lib/data/types";
import { IMAGE_IDS, unsplash } from "./images";

export const CATEGORIES: Category[] = [
  {
    slug: "evening",
    title: "Evening Wear",
    href: "/collections?category=evening",
    image: unsplash(IMAGE_IDS.eveningGown, {
      width: 800,
      height: 1000,
      alt: "Evening wear collection by Sahil Malik",
    }),
  },
  {
    slug: "bridal",
    title: "Bridal Wear",
    href: "/collections?category=bridal",
    image: unsplash(IMAGE_IDS.bridal, {
      width: 800,
      height: 1000,
      alt: "Bridal couture by Sahil Malik",
    }),
  },
  {
    slug: "menswear",
    title: "Menswear",
    href: "/collections?category=menswear",
    image: unsplash(IMAGE_IDS.menswear, {
      width: 800,
      height: 1000,
      alt: "Menswear collection by Sahil Malik",
    }),
  },
  {
    slug: "saree",
    title: "Saree",
    href: "/collections?category=saree",
    image: unsplash(IMAGE_IDS.saree, {
      width: 800,
      height: 1000,
      alt: "Saree collection by Sahil Malik",
    }),
  },
];
