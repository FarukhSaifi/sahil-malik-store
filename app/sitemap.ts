
import { SITEMAP } from "@/constants/layout";
import { collectionPath, couturePath, lookbookPath, SITEMAP_STATIC_ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { getCollections, getCoutureSeasons, getLookbooks } from "@/lib/data";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes = SITEMAP_STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: SITEMAP.staticChangeFrequency,
    priority: path === SITEMAP_STATIC_ROUTES[0] ? SITEMAP.homePriority : SITEMAP.staticPriority,
  }));

  const collectionRoutes = getCollections().map((collection) => ({
    url: `${base}${collectionPath(collection.slug)}`,
    lastModified: new Date(),
    changeFrequency: SITEMAP.dynamicChangeFrequency,
    priority: SITEMAP.detailPriority,
  }));

  const coutureRoutes = getCoutureSeasons().map((season) => ({
    url: `${base}${couturePath(season.slug)}`,
    lastModified: new Date(),
    changeFrequency: SITEMAP.dynamicChangeFrequency,
    priority: SITEMAP.detailPriority,
  }));

  const lookbookRoutes = getLookbooks().map((lookbook) => ({
    url: `${base}${lookbookPath(lookbook.slug)}`,
    lastModified: new Date(),
    changeFrequency: SITEMAP.dynamicChangeFrequency,
    priority: SITEMAP.detailPriority,
  }));

  return [...staticRoutes, ...collectionRoutes, ...coutureRoutes, ...lookbookRoutes];
}
