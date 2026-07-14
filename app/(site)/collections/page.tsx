import { Suspense } from "react";

import { SITE } from "@/constants/site";

import { getCollections, getProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { ProductGrid } from "@/components/products/product-grid";
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
  const { filters, productGridCategories, allCategoryKey, title, subtitle } = SITE.pages.collections;
  const activeCategory = filters.find((filter) => filter.value === category)?.value;
  const showProductGrid =
    activeCategory != null && (productGridCategories as readonly string[]).includes(activeCategory);

  const collections = showProductGrid ? [] : getCollections(activeCategory ? { category: activeCategory } : undefined);

  const categoryCollections = showProductGrid && activeCategory ? getCollections({ category: activeCategory }) : [];
  const categoryProducts = showProductGrid && activeCategory ? getProducts({ category: activeCategory }) : [];
  const categoryFilter = filters.find((filter) => filter.value === activeCategory);
  const categoryTitle = categoryCollections[0]?.title ?? categoryFilter?.label ?? title;
  const categorySubtitle = categoryFilter?.label ?? subtitle;

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          title={showProductGrid ? categoryTitle : title}
          subtitle={showProductGrid ? categorySubtitle : subtitle}
        />

        <Suspense fallback={<FiltersFallback />}>
          <CollectionFilters />
        </Suspense>

        {showProductGrid ? (
          <ProductGrid products={categoryProducts} collectionTitle={categoryTitle} />
        ) : (
          <CollectionGrid collections={collections} categoryKey={activeCategory ?? allCategoryKey} />
        )}
      </Container>
    </section>
  );
}
