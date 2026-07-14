import { notFound } from "next/navigation";

import { IMAGE_SIZES } from "@/constants/layout";
import { collectionPath } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { getCollectionBySlug, getCollections, getProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { CollectionCard } from "@/components/cards/collection-card";
import { ProductGrid } from "@/components/products/product-grid";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";

import type { CollectionDetailPageProps } from "@/types";

export async function generateStaticParams() {
  const collections = getCollections();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) return {};

  return buildMetadata({
    title: `${collection.title} | ${SITE.name}`,
    description: collection.description,
    path: collectionPath(collection.slug),
    image: collection.coverImage.src,
    imageAlt: collection.coverImage.alt,
  });
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const products = getProducts({ collectionSlug: slug });
  const hasProducts = products.length > 0;
  const showHero = !(SITE.pages.collections.hideHeroCategories as readonly string[]).includes(collection.category);

  const related = getCollections()
    .filter((c) => c.slug !== collection.slug && c.category === collection.category)
    .slice(0, SITE.pages.collections.relatedLimit);

  return (
    <>
      {showHero ? (
        <section className="relative h-[50vh] min-h-[320px] w-full lg:h-[60vh]">
          <EditorialImage
            image={collection.coverImage}
            sizes={IMAGE_SIZES.detailHero}
            priority
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-inverse/50 to-transparent" />
          <Container className="absolute inset-x-0 bottom-0 pb-10 text-background">
            <p className="mb-2 uppercase tracking-[0.2em] text-xs">{collection.season}</p>
            <h1 className="heading-section">{collection.title}</h1>
          </Container>
        </section>
      ) : null}

      <section className="section-padding">
        <Container>
          {showHero ? null : (
            <div className="mb-8 text-center md:mb-12">
              <p className="mb-3 uppercase tracking-[0.2em] text-xs text-muted">{collection.season}</p>
              <h1 className="heading-section">{collection.title}</h1>
            </div>
          )}

          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {collection.description}
          </p>

          {hasProducts ? (
            <div className="mt-12">
              <ProductGrid products={products} collectionTitle={collection.title} />
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-16">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="heading-section text-2xl sm:text-3xl">{SITE.ui.related}</h2>
                <CtaLink href={SITE.routes.collections}>{SITE.ui.viewAll}</CtaLink>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <CollectionCard key={item.slug} collection={item} />
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
