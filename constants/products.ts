import { galleryFromPaths, localImage } from "@/constants/images";
import { PRODUCT_OVERRIDES } from "@/constants/product-overrides";

import { GENERATED_PRODUCT_DEFS } from "@/generated/product-catalog.generated";

import { getProductGalleryPaths } from "@/lib/catalog";

import type { Product } from "@/types";

function buildProduct(def: (typeof GENERATED_PRODUCT_DEFS)[number]): Product {
  const override = PRODUCT_OVERRIDES[def.key];
  const title = override?.title ?? def.title;
  const galleryPaths = getProductGalleryPaths(def);
  const image = localImage(def.primaryImagePath, {
    width: 1200,
    height: 1500,
    alt: `${title} by Sahil Malik`,
    priority: def.featured,
  });

  return {
    slug: def.slug,
    sku: def.sku,
    title,
    collectionSlug: def.collectionSlug,
    folderSlug: def.folderSlug,
    category: def.category,
    description: override?.description ?? (def as { description?: string }).description,
    modelSize: override?.modelSize,
    modelHeight: override?.modelHeight,
    featured: def.featured,
    order: def.order,
    image,
    gallery: galleryFromPaths(galleryPaths, title, 1200),
  };
}

export const PRODUCTS: Product[] = GENERATED_PRODUCT_DEFS.map(buildProduct);
