import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { collectionPath } from "@/constants/routes";

import { EditorialImage } from "@/components/ui/editorial-image";

import type { CollectionCardProps } from "@/types";

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={collectionPath(collection.slug)} prefetch className="group block">
      <div className="relative aspect-3/4 overflow-hidden">
        <EditorialImage
          image={collection.coverImage}
          sizes={IMAGE_SIZES.editorialDefault}
          className="image-hover-lift h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-background">
          <p className="mb-1 uppercase tracking-[0.2em] text-[10px]">{collection.season}</p>
          <h3 className="font-display text-xl font-light sm:text-2xl">{collection.title}</h3>
          <p className="mt-1 capitalize text-xs text-background/70">{collection.category}</p>
        </div>
      </div>
    </Link>
  );
}
