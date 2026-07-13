import type { Collection } from "@/types";

export type ProductCatalogOverlayEntry = {
  sku?: string;
  slug?: string;
  title?: string;
  description?: string;
  featured?: boolean;
  order?: number;
};

export type GeneratedProductDef = {
  key: string;
  category: Collection["category"];
  collectionSlug: string;
  folderSlug: string;
  slug: string;
  sku: string;
  title: string;
  description?: string;
  featured: boolean;
  order: number;
  imagePaths: readonly string[];
  primaryImagePath: string;
};

export function getProductGalleryPaths(def: Pick<GeneratedProductDef, "imagePaths" | "primaryImagePath">) {
  const withoutPrimary = def.imagePaths.filter((path) => path !== def.primaryImagePath);
  return [def.primaryImagePath, ...withoutPrimary];
}
