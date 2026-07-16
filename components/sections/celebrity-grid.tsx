"use client";

import { useEffect, useRef } from "react";

import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";

import type { CelebrityGridProps } from "@/types";

export function CelebrityGrid({ archive = false, celebrities, id, showViewAll = true }: CelebrityGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const useMobileSlide = !archive;

  useEffect(() => {
    if (!useMobileSlide || prefersReducedMotion || celebrities.length <= 1) {
      return;
    }

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let index = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const clearTimers = () => {
      if (timer) {
        clearInterval(timer);
        timer = undefined;
      }
      if (resumeTimer) {
        clearTimeout(resumeTimer);
        resumeTimer = undefined;
      }
    };

    const scrollToIndex = (nextIndex: number) => {
      const cards = track.querySelectorAll<HTMLElement>("[data-celeb-card]");
      const card = cards[nextIndex];
      if (!card) {
        return;
      }

      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    };

    const start = () => {
      clearTimers();
      if (!mobileQuery.matches) {
        return;
      }

      timer = setInterval(() => {
        const cards = track.querySelectorAll("[data-celeb-card]");
        if (cards.length === 0) {
          return;
        }
        index = (index + 1) % cards.length;
        scrollToIndex(index);
      }, TIMING.asSeenOn.intervalMs);
    };

    const pause = () => {
      clearTimers();
      resumeTimer = setTimeout(start, TIMING.asSeenOn.resumeMs);
    };

    const syncIndexFromScroll = () => {
      const cards = [...track.querySelectorAll<HTMLElement>("[data-celeb-card]")];
      if (cards.length === 0) {
        return;
      }

      const nearest = cards.reduce(
        (best, card, cardIndex) => {
          const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { index: cardIndex, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      index = nearest.index;
    };

    const onInteract = () => {
      syncIndexFromScroll();
      pause();
    };

    start();
    mobileQuery.addEventListener("change", start);
    track.addEventListener("pointerdown", onInteract);
    track.addEventListener("touchstart", onInteract, { passive: true });
    track.addEventListener("wheel", onInteract, { passive: true });

    return () => {
      clearTimers();
      mobileQuery.removeEventListener("change", start);
      track.removeEventListener("pointerdown", onInteract);
      track.removeEventListener("touchstart", onInteract);
      track.removeEventListener("wheel", onInteract);
    };
  }, [celebrities.length, prefersReducedMotion, useMobileSlide]);

  return (
    <section id={id} className="section-padding scroll-mt-24">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14">
            <h2 className="heading-section">{SITE.sections.asSeenOn.title}</h2>
            {showViewAll ? <CtaLink href={SITE.sections.asSeenOn.href}>{SITE.ui.viewAll}</CtaLink> : null}
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className={
            archive
              ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6"
              : "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          }
        >
          {celebrities.map((celebrity, index) => (
            <div
              key={celebrity.id}
              data-celeb-card={useMobileSlide ? "" : undefined}
              className={archive ? undefined : "w-[42vw] shrink-0 snap-start sm:w-auto"}
            >
              <Reveal delay={index * TIMING.revealStagger.press}>
                <div className="group text-center">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <EditorialImage
                      image={celebrity.image}
                      sizes={IMAGE_SIZES.celebrity}
                      className="image-hover-lift h-full w-full"
                    />
                  </div>
                  {celebrity.name ? (
                    <h3 className="mt-4 font-display text-base font-light sm:text-lg">{celebrity.name}</h3>
                  ) : null}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
