import type { GeneratedProductDef } from "@/types";

export type { GeneratedProductDef } from "@/types";

export function getProductGalleryPaths(def: Pick<GeneratedProductDef, "imagePaths" | "primaryImagePath">) {
  const withoutPrimary = def.imagePaths.filter((path) => path !== def.primaryImagePath);
  return [def.primaryImagePath, ...withoutPrimary];
}
