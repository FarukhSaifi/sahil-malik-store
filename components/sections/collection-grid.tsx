"use client";

import { motion } from "framer-motion";

import { CollectionCard } from "@/components/cards/collection-card";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { CollectionGridProps } from "@/types";

export function CollectionGrid({ collections, categoryKey }: CollectionGridProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </motion.div>
  );
}
