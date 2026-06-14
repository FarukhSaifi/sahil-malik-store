import { notFound } from "next/navigation";

import { SITE } from "@/constants/site";

import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";

import { getLookbookBySlug, getLookbooks } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { LookbookDetailPageProps } from "@/types";

export async function generateStaticParams() {
  const lookbooks = getLookbooks();
  return lookbooks.map((lookbook) => ({ slug: lookbook.slug }));
}

export async function generateMetadata({ params }: LookbookDetailPageProps) {
  const { slug } = await params;
  const lookbook = getLookbookBySlug(slug);

  if (!lookbook) return {};

  return buildMetadata({
    title: `${lookbook.title} ${SITE.pages.lookbook.detailMetaSuffix} | ${SITE.name}`,
    description: lookbook.description,
    path: `/lookbook/${lookbook.slug}`,
  });
}

export default async function LookbookDetailPage({ params }: LookbookDetailPageProps) {
  const { slug } = await params;
  const lookbook = getLookbookBySlug(slug);

  if (!lookbook) notFound();

  return (
    <>
      <section className="relative h-[45vh] min-h-[280px] w-full lg:h-[55vh]">
        <EditorialImage image={lookbook.coverImage} sizes="100vw" priority className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/50 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-background">
          {lookbook.subtitle ? <p className="mb-2 uppercase tracking-[0.2em] text-xs">{lookbook.subtitle}</p> : null}
          <h1 className="heading-section">{lookbook.title}</h1>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {lookbook.description}
          </p>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [content-visibility:auto]">
            {lookbook.gallery.map((image) => (
              <div key={image.src} className="relative mb-4 aspect-3/4 break-inside-avoid overflow-hidden">
                <EditorialImage image={image} sizes="(max-width: 768px) 100vw, 33vw" className="h-full w-full" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
