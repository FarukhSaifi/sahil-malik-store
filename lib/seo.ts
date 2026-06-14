import type { Metadata } from "next";

import { SITE } from "@/constants/site";

import type { PageMeta } from "@/types";

export function buildMetadata({ title, description, path = "" }: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
