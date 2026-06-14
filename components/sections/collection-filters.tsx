"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SITE } from "@/constants/site";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function CollectionFilters() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const prefersReducedMotion = usePrefersReducedMotion();
  const filters = SITE.pages.collections.filters;
  const activeCategory = filters.find((filter) => filter.value === category)?.value;

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const href = filter.value ? `${SITE.routes.collections}?category=${filter.value}` : SITE.routes.collections;
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
              prefersReducedMotion ? (
                <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
              ) : (
                <motion.span
                  layoutId="collection-filter-underline"
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
