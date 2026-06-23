import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";

import type { CelebrityGridProps } from "@/types";

export function CelebrityGrid({ celebrities }: CelebrityGridProps) {
  return (
    <section className="section-padding">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14">
            <h2 className="heading-section">{SITE.sections.asSeenOn.title}</h2>
            <CtaLink href={SITE.sections.asSeenOn.href}>{SITE.ui.viewAll}</CtaLink>
          </div>
        </Reveal>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {celebrities.map((celebrity, index) => (
            <Reveal
              key={celebrity.name}
              delay={index * TIMING.revealStagger.press}
              className="w-[42vw] shrink-0 snap-start sm:w-auto"
            >
              <div className="group text-center">
                <div className="relative aspect-3/4 overflow-hidden">
                  <EditorialImage
                    image={celebrity.image}
                    sizes={IMAGE_SIZES.celebrity}
                    className="image-hover-lift h-full w-full"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-light sm:text-lg">{celebrity.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
