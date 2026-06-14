import { CollectionCard } from "@/components/cards/collection-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/constants/site";
import { getCollections } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: `${SITE.pages.collections.metaTitle} | ${SITE.name}`,
  description: SITE.pages.collections.metaDescription,
  path: SITE.routes.collections,
});

type CollectionsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const { category } = await searchParams;
  const filters = SITE.pages.collections.filters;
  const activeCategory = filters.find((f) => f.value === category)?.value;
  const collections = getCollections(activeCategory ? { category: activeCategory } : undefined);

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.collections.title} subtitle={SITE.pages.collections.subtitle} />

        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const href = filter.value
              ? `${SITE.routes.collections}?category=${filter.value}`
              : SITE.routes.collections;
            const isActive = filter.value === activeCategory || (!filter.value && !activeCategory);

            return (
              <Link
                key={filter.label}
                href={href}
                className={cn(
                  "min-h-11 px-4 py-2 uppercase tracking-[0.2em] text-xs transition-colors",
                  isActive ? "border-b-2 border-foreground text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </Container>
    </section>
  );
}
