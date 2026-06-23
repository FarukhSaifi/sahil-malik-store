import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { CtaText } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";

import type { CategoryTilesProps } from "@/types";

export function CategoryTiles({ categories }: CategoryTilesProps) {
  return (
    <section className="section-padding-tight">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * TIMING.revealStagger.category}>
            <Link href={category.href} prefetch className="group block">
              <div className="relative aspect-4/5 overflow-hidden">
                <EditorialImage
                  image={category.image}
                  sizes={IMAGE_SIZES.categoryTile}
                  className="image-hover-lift h-full w-full"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-5 sm:px-5 sm:py-6">
                <h2 className="font-display text-xl font-light sm:text-2xl lg:text-[1.75rem]">{category.title}</h2>
                <CtaText className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:opacity-100">
                  {SITE.ui.viewAll}
                </CtaText>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
