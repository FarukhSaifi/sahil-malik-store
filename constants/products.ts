import { galleryFromPaths, localImage } from "@/constants/images";
import { getProductGalleryPaths } from "@/constants/product-catalog";
import { GENERATED_PRODUCT_DEFS } from "@/constants/product-catalog.generated";

import type { Product } from "@/types";

function buildProduct(def: (typeof GENERATED_PRODUCT_DEFS)[number]): Product {
  const galleryPaths = getProductGalleryPaths(def);
  const image = localImage(def.primaryImagePath, {
    width: 1200,
    height: 1500,
    alt: `${def.title} by Sahil Malik`,
    priority: def.featured,
  });

  return {
    slug: def.slug,
    sku: def.sku,
    title: def.title,
    collectionSlug: def.collectionSlug,
    folderSlug: def.folderSlug,
    category: def.category,
    description: def.description,
    featured: def.featured,
    order: def.order,
    image,
    gallery: galleryFromPaths(galleryPaths, def.title, 1200),
  };
}

export const PRODUCTS: Product[] = GENERATED_PRODUCT_DEFS.map(buildProduct);
