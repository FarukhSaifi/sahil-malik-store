import { CollectionCard } from "@/components/cards/collection-card";
import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { SITE } from "@/constants/site";
import { getCollectionBySlug, getCollections } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

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
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const related = getCollections()
    .filter((c) => c.slug !== collection.slug && c.category === collection.category)
    .slice(0, 3);

  return (
    <>
      <section className="relative h-[50vh] min-h-[320px] w-full lg:h-[60vh]">
        <EditorialImage image={collection.coverImage} sizes="100vw" priority className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/50 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-background">
          <p className="mb-2 uppercase tracking-[0.2em] text-xs">{collection.season}</p>
          <h1 className="heading-section">{collection.title}</h1>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {collection.description}
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4 [content-visibility:auto]">
            {collection.gallery.map((image) => (
              <div key={image.src} className="relative aspect-3/4 overflow-hidden">
                <EditorialImage image={image} sizes="(max-width: 768px) 100vw, 50vw" className="h-full w-full" />
              </div>
            ))}
          </div>

          {related.length > 0 ? (
            <div className="mt-16">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="heading-section text-2xl sm:text-3xl">{SITE.ui.related}</h2>
                <Link href={SITE.routes.collections} className="editorial-link">
                  {SITE.ui.viewAll}
                </Link>
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
