"use client";

import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

import { EditorialImage } from "@/components/ui/editorial-image";

import type { ProductGalleryProps } from "@/types";

export function ProductGallery({ gallery, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const hasMultiple = gallery.length > 1;

  const goTo = useCallback(
    (index: number) => {
      if (!hasMultiple) return;
      setActiveIndex((index + gallery.length) % gallery.length);
    },
    [gallery.length, hasMultiple],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!hasMultiple) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, hasMultiple]);

  if (!activeImage) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-3/4 overflow-hidden bg-border">
        <EditorialImage
          key={activeImage.src}
          image={activeImage}
          sizes={IMAGE_SIZES.productDetail}
          priority
          className="h-full w-full"
        />

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={SITE.a11y.previousGalleryImage}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:bg-background sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={SITE.a11y.nextGalleryImage}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:bg-background sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <p
              aria-live="polite"
              className="absolute bottom-4 right-4 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground"
            >
              {SITE.product.galleryCounter(activeIndex + 1, gallery.length)}
            </p>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <ul className="flex gap-2 overflow-x-auto pb-1" aria-label={`${title} gallery thumbnails`}>
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={`${image.src}-${index}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={SITE.a11y.viewGalleryImage(index + 1, gallery.length)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block h-20 w-16 overflow-hidden border transition-colors sm:h-24 sm:w-20",
                    isActive ? "border-foreground" : "border-border hover:border-muted",
                  )}
                >
                  <EditorialImage
                    image={image}
                    sizes="80px"
                    className="h-full w-full"
                    imageClassName="object-cover"
                    fill={false}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
