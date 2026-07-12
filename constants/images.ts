import { BLUR_DATA_URL } from "@/constants/site";

import type { ImageAsset, ImageOptions } from "@/types";

export const IMAGE_IDS = {
  heroRunway: "1490481651871-ab68de25d43d",
  heroEditorial: "1469334031218-e382a71b716b",
  heroEmbroidery: "1558618666-fcd25c85cd64",
  eveningGown: "1595777457583-95e059d581b8",
  bridal: "1572804013309-59a88b7e92f1",
  portrait1: "1524504388940-b1c1722653e1",
  portrait2: "1529626455594-4ff0802cfb7e",
  portrait3: "1488426862026-3ee34a7d66df",
  portrait4: "1534528741775-53994a69daeb",
  portrait5: "1520813792240-56fc4a3765a7",
  portrait6: "1566174053879-31528523f8ae",
} as const;

export const BRAND = {
  logoDark: "/media/brand/logo-dark.png",
  logoLight: "/media/brand/logo-light.png",
  /** Intrinsic dimensions of optimized logo assets (871×400) */
  logoWidth: 871,
  logoHeight: 400,
  aboutHero: "/media/brand/about-hero.png",
  ogDefault: "/media/brand/og-default.jpg",
  favicon: "/media/brand/favicon.ico",
  icon192: "/media/brand/icon-192.png",
  icon512: "/media/brand/icon-512.png",
  appleIcon: "/media/brand/apple-icon.png",
} as const;

export function unsplash(id: string, options: ImageOptions): ImageAsset {
  const height = options.height ?? Math.round(options.width * 1.25);

  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${options.width}&q=80`,
    alt: options.alt,
    width: options.width,
    height,
    blurDataURL: BLUR_DATA_URL,
    priority: options.priority,
  };
}

export function galleryFromIds(ids: string[], altPrefix: string, width = 1200): ImageAsset[] {
  return ids.map((id, i) =>
    unsplash(id, {
      width,
      alt: `${altPrefix} look ${i + 1}`,
    }),
  );
}

export function localImage(src: string, options: ImageOptions): ImageAsset {
  const height = options.height ?? Math.round(options.width * 1.25);

  return {
    src,
    alt: options.alt,
    width: options.width,
    height,
    blurDataURL: BLUR_DATA_URL,
    priority: options.priority,
  };
}

export function galleryFromPaths(paths: readonly string[], altPrefix: string, width = 1200): ImageAsset[] {
  return paths.map((src, i) =>
    localImage(src, {
      width,
      alt: `${altPrefix} look ${i + 1}`,
    }),
  );
}
