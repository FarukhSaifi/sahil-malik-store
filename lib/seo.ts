
import { BRAND } from "@/constants/images";
import { SITE } from "@/constants/site";

import type { PageMeta } from "@/types";
import type { Metadata } from "next";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildOgImages(image: string, alt: string): NonNullable<Metadata["openGraph"]>["images"] {
  const url = toAbsoluteUrl(image);
  const isOptimizedOg = image.includes("/media/brand/og-");

  return [
    {
      url,
      alt,
      ...(isOptimizedOg ? { width: OG_WIDTH, height: OG_HEIGHT } : {}),
    },
  ];
}

export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: BRAND.favicon, sizes: "48x48" },
    { url: BRAND.icon192, sizes: "192x192", type: "image/png" },
    { url: BRAND.icon512, sizes: "512x512", type: "image/png" },
  ],
  apple: [{ url: BRAND.appleIcon, sizes: "180x180", type: "image/png" }],
};

export function buildMetadata({ title, description, path = "", image, imageAlt }: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? BRAND.ogDefault;
  const ogAlt = imageAlt ?? title;
  const ogImages = buildOgImages(ogImage, ogAlt);
  const absoluteImage = toAbsoluteUrl(ogImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  icons: siteIcons,
};
