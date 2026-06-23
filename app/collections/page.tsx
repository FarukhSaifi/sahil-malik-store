import { Suspense } from "react";

import { SITE } from "@/constants/site";

import { getCollections } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { CollectionFilters } from "@/components/sections/collection-filters";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";


import type { CollectionsPageProps } from "@/types";

export const metadata = buildMetadata({
  title: `${SITE.pages.collections.metaTitle} | ${SITE.name}`,
  description: SITE.pages.collections.metaDescription,
  path: SITE.routes.collections,
});

function FiltersFallback() {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {SITE.pages.collections.filters.map((filter) => (
        <span key={filter.label} className="min-h-11 px-4 py-2 uppercase tracking-[0.2em] text-xs text-muted">
          {filter.label}
        </span>
      ))}
    </div>
  );
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const { category } = await searchParams;
  const filters = SITE.pages.collections.filters;
  const activeCategory = filters.find((filter) => filter.value === category)?.value;
  const collections = getCollections(activeCategory ? { category: activeCategory } : undefined);

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.collections.title} subtitle={SITE.pages.collections.subtitle} />

        <Suspense fallback={<FiltersFallback />}>
          <CollectionFilters />
        </Suspense>

        <CollectionGrid collections={collections} categoryKey={activeCategory ?? "all"} />
      </Container>
    </section>
  );
}
