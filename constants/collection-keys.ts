import type { Collection } from "@/types";

export const COLLECTION_CATEGORIES = {
  menswear: "menswear",
  womenswear: "womenswear",
} as const satisfies Record<string, Collection["category"]>;

/** Canonical collection slug for the flat womenswear product sets. */
export const WOMENSWEAR_COLLECTION_SLUG = "womenswear-stock-clearance";
