export const ROUTES = {
  home: "/",
  collections: "/collections",
  couture: "/couture",
  contact: "/contact",
  lookbook: "/lookbook",
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

export function couturePath(slug: string) {
  return `${ROUTES.couture}/${slug}`;
}

export function lookbookPath(slug: string) {
  return `${ROUTES.lookbook}/${slug}`;
}

export function collectionsCategoryPath(category: "menswear" | "womenswear") {
  return `${ROUTES.collections}?category=${category}`;
}

export const SITEMAP_STATIC_ROUTES = [
  ROUTES.home,
  ROUTES.collections,
  ROUTES.couture,
  ROUTES.lookbook,
  ROUTES.press,
  ROUTES.about,
  ROUTES.contact,
  ROUTES.policies,
  ROUTES.terms,
  ROUTES.privacy,
  ROUTES.faq,
] as const;
