"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { motion } from "framer-motion";

import { MOTION_LAYOUT_IDS } from "@/constants/layout";
import { collectionPath } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { TIMING } from "@/constants/timing";

import { EASE_EDITORIAL } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import type { SubCategoryFiltersProps } from "@/types";

export function SubCategoryFilters({ collectionSlug, subCategories }: SubCategoryFiltersProps) {
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub") ?? undefined;
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();
  const canAnimate = mounted && !prefersReducedMotion;
  const activeSub = subCategories.find((item) => item.slug === sub)?.slug;

  if (subCategories.length === 0) {
    return null;
  }

  const filters = [{ slug: undefined, title: SITE.enquiry.allSubCategories }, ...subCategories];

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const href = filter.slug
          ? `${collectionPath(collectionSlug)}?sub=${filter.slug}`
          : collectionPath(collectionSlug);
        const isActive = filter.slug === activeSub || (!filter.slug && !activeSub);

        return (
          <Link
            key={filter.slug ?? "all"}
            href={href}
            prefetch
            className={cn(
              "filter-tab relative min-h-11 px-4 py-2 uppercase tracking-[0.2em] text-xs transition-colors duration-300",
              isActive ? "text-foreground" : "text-muted hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {filter.title}
            {isActive ? (
              canAnimate ? (
                <motion.span
                  layoutId={`${MOTION_LAYOUT_IDS.collectionFilterUnderline}-${collectionSlug}`}
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
