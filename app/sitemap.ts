import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";

import { getCollections, getCoutureSeasons, getLookbooks } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes = ["", "/collections", "/couture", "/lookbook", "/press", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const collectionRoutes = getCollections().map((collection) => ({
    url: `${base}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const coutureRoutes = getCoutureSeasons().map((season) => ({
    url: `${base}/couture/${season.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lookbookRoutes = getLookbooks().map((lookbook) => ({
    url: `${base}/lookbook/${lookbook.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes, ...coutureRoutes, ...lookbookRoutes];
}
