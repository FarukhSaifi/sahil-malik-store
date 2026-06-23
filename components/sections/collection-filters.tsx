"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { motion } from "framer-motion";

import { MOTION_LAYOUT_IDS } from "@/constants/layout";
import { collectionsCategoryPath } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { EASE_EDITORIAL } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CollectionFilters() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const canAnimate = mounted && !prefersReducedMotion;
  const filters = SITE.pages.collections.filters;
  const activeCategory = filters.find((filter) => filter.value === category)?.value;

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const href = filter.value
          ? collectionsCategoryPath(filter.value as "menswear" | "womenswear")
          : SITE.routes.collections;
        const isActive = filter.value === activeCategory || (!filter.value && !activeCategory);

        return (
          <Link
            key={filter.label}
            href={href}
            prefetch
            className={cn(
              "filter-tab relative min-h-11 px-4 py-2 uppercase tracking-[0.2em] text-xs transition-colors duration-300",
              isActive ? "text-foreground" : "text-muted hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {filter.label}
            {isActive ? (
              canAnimate ? (
                <motion.span
                  layoutId={MOTION_LAYOUT_IDS.collectionFilterUnderline}
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                  transition={{ duration: TIMING.filter.underlineDuration, ease: EASE_EDITORIAL }}
                />
              ) : (
                <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
              )
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
