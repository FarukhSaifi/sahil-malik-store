import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { collectionPath } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

import type { FeaturedCollectionsProps } from "@/types";

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="section-padding bg-background">
      <Container>
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title={SITE.sections.collections.title}
              subtitle={SITE.sections.collections.subtitle}
              className="mb-0"
            />
            <CtaLink href={SITE.sections.collections.href}>{SITE.ui.viewAll}</CtaLink>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {collections.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * TIMING.revealStagger.featured}>
              <Link href={collectionPath(collection.slug)} prefetch className="group block">
                <div className="relative aspect-3/4 overflow-hidden">
                  <EditorialImage
                    image={collection.coverImage}
                    sizes={IMAGE_SIZES.featuredCollection}
                    className="image-hover-lift h-full w-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-inverse/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                    <p className="mb-1 uppercase tracking-[0.2em] text-[10px]">{collection.season}</p>
                    <h3 className="font-display text-2xl font-light sm:text-3xl">{collection.title}</h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
