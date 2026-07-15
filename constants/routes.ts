import type { Collection } from "@/types";

export const ROUTES = {
  home: "/",
  collections: "/collections",
  products: "/products",
  enquiry: "/enquiry",
  thankYou: "/thank-you",
  couture: "/couture",
  contact: "/contact",
  press: "/press",
  about: "/about",
  policies: "/policies",
  terms: "/terms",
  privacy: "/privacy",
  faq: "/faq",
} as const;

export function collectionPath(slug: string) {
  return `${ROUTES.collections}/${slug}`;
}

export function productPath(slug: string) {
  return `${ROUTES.products}/${slug}`;
}

export function couturePath(slug: string) {
  return `${ROUTES.couture}/${slug}`;
}

export function collectionsCategoryPath(category: Collection["category"]) {
  return `${ROUTES.collections}?category=${category}`;
}

export const SITEMAP_STATIC_ROUTES = [
  ROUTES.home,
  ROUTES.collections,
  ROUTES.couture,
  ROUTES.press,
  ROUTES.about,
  ROUTES.contact,
  ROUTES.enquiry,
  ROUTES.thankYou,
  ROUTES.policies,
  ROUTES.terms,
  ROUTES.privacy,
  ROUTES.faq,
] as const;
