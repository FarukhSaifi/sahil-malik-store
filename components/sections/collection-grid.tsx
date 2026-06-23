"use client";

import { motion } from "framer-motion";

import { TIMING } from "@/constants/timing";

import { EASE_EDITORIAL } from "@/lib/animations/variants";

import { useMounted } from "@/hooks/use-mounted";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { CollectionCard } from "@/components/cards/collection-card";



import type { CollectionGridProps } from "@/types";

export function CollectionGrid({ collections, categoryKey }: CollectionGridProps) {
  const mounted = useMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      key={categoryKey}
      initial={{ opacity: 0, y: TIMING.grid.enterOffsetY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: TIMING.grid.enterDuration, ease: EASE_EDITORIAL }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </motion.div>
  );
}
