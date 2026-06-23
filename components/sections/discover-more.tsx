import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { Container } from "@/components/ui/container";
import { CtaText } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";

import type { DiscoverMoreProps } from "@/types";

export function DiscoverMore({ items }: DiscoverMoreProps) {
  return (
    <section className="section-padding border-t border-border">
      <Container>
        <Reveal>
          <h2 className="heading-section mb-10 text-center sm:mb-14">{SITE.sections.discoverMore.title}</h2>
        </Reveal>

        <div className="grid gap-0 sm:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.href} delay={index * TIMING.revealStagger.discover}>
              <Link href={item.href} prefetch className="group block">
                <div className="relative aspect-4/5 overflow-hidden">
                  <EditorialImage
                    image={item.image}
                    sizes={IMAGE_SIZES.discoverMore}
                    className="image-hover-lift h-full w-full"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-inverse/55 via-inverse/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-8">
                    <h3 className="font-display text-xl font-light leading-snug sm:text-2xl">{item.title}</h3>
                    <CtaText variant="light" className="mt-4">
                      {SITE.ui.explore}
                    </CtaText>
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
