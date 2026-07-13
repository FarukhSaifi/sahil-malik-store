import { galleryFromPaths, localImage } from "@/constants/images";

import { GENERATED_PRODUCT_DEFS } from "@/generated/product-catalog.generated";

import { getProductGalleryPaths } from "@/lib/catalog";

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
    description: (def as { description?: string }).description,
    featured: def.featured,
    order: def.order,
    image,
    gallery: galleryFromPaths(galleryPaths, def.title, 1200),
  };
}

export const PRODUCTS: Product[] = GENERATED_PRODUCT_DEFS.map(buildProduct);
