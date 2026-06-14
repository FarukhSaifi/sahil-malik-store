import { EditorialImage } from "@/components/ui/editorial-image";
import type { Collection } from "@/lib/data/types";
import Link from "next/link";

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} prefetch className="group block">
      <div className="relative aspect-3/4 overflow-hidden">
        <EditorialImage
          image={collection.coverImage}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
