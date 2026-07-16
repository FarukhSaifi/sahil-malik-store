import { CATEGORIES } from "@/constants/categories";
import { CELEBRITIES } from "@/constants/celebrities";
import { COLLECTIONS } from "@/constants/collections";
import { COUTURE_SEASONS } from "@/constants/couture";
import { DISCOVER_ITEMS } from "@/constants/discover";
import { HERO_SLIDES } from "@/constants/hero";
import { ABOUT, PHILOSOPHY } from "@/constants/philosophy";
import { FAQ_ITEMS, POLICIES_PAGE, PRIVACY_POLICY, TERMS_OF_SERVICE } from "@/constants/policies";
import { PRESS_ITEMS } from "@/constants/press";
import { PRODUCTS } from "@/constants/products";

import type { ProductQueryOptions, QueryOptions } from "@/types";

function filterFeatured<T extends { featured?: boolean }>(items: T[], opts?: QueryOptions) {
  let result = [...items];

  if (opts?.featured) {
    result = result.filter((item) => item.featured);
  }

  if (opts?.limit) {
    result = result.slice(0, opts.limit);
  }

  return result;
}

export const constantsAdapter = {
  getHeroSlides: () => HERO_SLIDES,
  getCategories: () => CATEGORIES,
  getCollections: (opts?: QueryOptions) => {
    let result = [...COLLECTIONS].sort((a, b) => a.order - b.order);

    if (opts?.category) {
      result = result.filter((c) => c.category === opts.category);
    }

    if (opts?.featured) {
      result = result.filter((c) => c.featured);
    }

    if (opts?.limit) {
      result = result.slice(0, opts.limit);
    }

    return result;
  },
  getCollectionBySlug: (slug: string) => COLLECTIONS.find((c) => c.slug === slug) ?? null,
  getProducts: (opts?: ProductQueryOptions) => {
    let result = [...PRODUCTS].sort((a, b) => a.order - b.order);

    if (opts?.collectionSlug) {
      result = result.filter((p) => p.collectionSlug === opts.collectionSlug);
    }

    if (opts?.category) {
      result = result.filter((p) => p.category === opts.category);
    }

    if (opts?.featured) {
      result = result.filter((p) => p.featured);
    }

    if (opts?.limit) {
      result = result.slice(0, opts.limit);
    }

    return result;
  },
  getProductBySlug: (slug: string) => PRODUCTS.find((p) => p.slug === slug) ?? null,
  getCoutureSeasons: (opts?: QueryOptions) => filterFeatured(COUTURE_SEASONS, opts),
  getCoutureBySlug: (slug: string) => COUTURE_SEASONS.find((c) => c.slug === slug) ?? null,
  getPress: (opts?: QueryOptions) => {
    const items = [...PRESS_ITEMS];
    return opts?.limit ? items.slice(0, opts.limit) : items;
  },
  getCelebrities: (opts?: QueryOptions) => filterFeatured(CELEBRITIES, opts),
  getPhilosophy: () => PHILOSOPHY,
  getAbout: () => ABOUT,
  getDiscoverItems: () => DISCOVER_ITEMS,
  getPolicies: () => POLICIES_PAGE,
  getTerms: () => TERMS_OF_SERVICE,
  getPrivacy: () => PRIVACY_POLICY,
  getFaq: () => FAQ_ITEMS,
};
