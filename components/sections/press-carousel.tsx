"use client";

import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

import type { PressCarouselProps } from "@/types";

export function PressCarousel({ items }: PressCarouselProps) {
  return (
    <section className="section-padding-tight border-t border-border">
      <Container>
        <Reveal>
          <h2 className="heading-section mb-8 text-center sm:mb-12">{SITE.sections.press.title}</h2>
        </Reveal>

        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:gap-8 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <Reveal
              key={item.slug}
              delay={index * TIMING.revealStagger.press}
              className="w-[78vw] shrink-0 snap-start sm:w-[360px]"
            >
              <article className="flex min-h-[240px] flex-col justify-between py-2">
                <blockquote className="heading-editorial not-italic leading-relaxed text-foreground">
                  {item.quote}
                </blockquote>
                <div className="mt-8">
                  <p className="label-caps font-medium">{item.publication}</p>
                  <p className="mt-2 text-xs text-muted">{item.date}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
