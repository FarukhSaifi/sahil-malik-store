"use client";

import { useHeroSlideshow } from "@/components/providers/hero-slideshow-provider";
import { EditorialImage } from "@/components/ui/editorial-image";
import { SITE } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { HeroSlide } from "@/lib/data/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const { paused } = useHeroSlideshow();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || paused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, paused, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const current = slides[index % slides.length];

  return (
    <section className="relative -mt-(--site-chrome-height) h-dvh min-h-[520px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.image.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <EditorialImage image={current.image} sizes="100vw" priority={index === 0} className="h-full w-full" />
          <div className="absolute inset-0 bg-linear-to-b from-inverse/25 via-transparent to-inverse/55" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-16 text-center text-background sm:pt-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-4xl"
        >
          <h1 className="heading-promo mb-5">{SITE.heroPromo}</h1>
          <Link href={SITE.routes.collections} prefetch className="editorial-link-light-underline">
            {SITE.ui.discoverNow}
          </Link>
        </motion.div>
      </div>

      {current.quote ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-20 pt-32 text-center text-background sm:pb-24">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="max-w-4xl"
          >
            <p className="heading-editorial mb-4 uppercase not-italic tracking-[0.04em] sm:tracking-[0.06em]">
              {current.quote}
            </p>
            {current.attribution ? <p className="label-caps text-background/80">{current.attribution}</p> : null}
          </motion.div>
        </div>
      ) : null}

      {slides.length > 1 ? (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={SITE.a11y.goToSlide(i + 1)}
              className={`h-px min-h-0 min-w-0 transition-all duration-500 ${
                i === index ? "w-10 bg-background" : "w-4 bg-background/35"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
