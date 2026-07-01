import { CATEGORIES } from "@/constants/categories";
import { CELEBRITIES } from "@/constants/celebrities";
import { COLLECTIONS } from "@/constants/collections";
import { COUTURE_SEASONS } from "@/constants/couture";
import { DISCOVER_ITEMS } from "@/constants/discover";
import { HERO_SLIDES } from "@/constants/hero";
import { LOOKBOOKS } from "@/constants/lookbook";
import { ABOUT, PHILOSOPHY } from "@/constants/philosophy";
import { FAQ_ITEMS, POLICIES_PAGE, PRIVACY_POLICY, TERMS_OF_SERVICE } from "@/constants/policies";
import { PRESS_ITEMS } from "@/constants/press";

import type { QueryOptions } from "@/types";

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
  getCoutureSeasons: (opts?: QueryOptions) => filterFeatured(COUTURE_SEASONS, opts),
  getCoutureBySlug: (slug: string) => COUTURE_SEASONS.find((c) => c.slug === slug) ?? null,
  getLookbooks: () => LOOKBOOKS,
  getLookbookBySlug: (slug: string) => LOOKBOOKS.find((l) => l.slug === slug) ?? null,
  getPress: (opts?: QueryOptions) => {
    const items = [...PRESS_ITEMS];
    return opts?.limit ? items.slice(0, opts.limit) : items;
  },
  getCelebrities: () => CELEBRITIES,
  getPhilosophy: () => PHILOSOPHY,
  getAbout: () => ABOUT,
  getDiscoverItems: () => DISCOVER_ITEMS,
  getPolicies: () => POLICIES_PAGE,
  getTerms: () => TERMS_OF_SERVICE,
  getPrivacy: () => PRIVACY_POLICY,
  getFaq: () => FAQ_ITEMS,
};
