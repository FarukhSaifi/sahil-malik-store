import { EditorialImage } from "@/components/ui/editorial-image";
import type { Lookbook } from "@/lib/data/types";
import Link from "next/link";

type LookbookTileProps = {
  lookbook: Lookbook;
};

export function LookbookTile({ lookbook }: LookbookTileProps) {
  return (
    <Link href={`/lookbook/${lookbook.slug}`} prefetch className="group block">
      <div className="relative aspect-3/4 overflow-hidden">
        <EditorialImage
          image={lookbook.coverImage}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="image-hover-lift h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-background">
          {lookbook.subtitle ? (
            <p className="mb-1 uppercase tracking-[0.2em] text-[10px]">{lookbook.subtitle}</p>
          ) : null}
          <h3 className="font-display text-xl font-light sm:text-2xl">{lookbook.title}</h3>
        </div>
      </div>
    </Link>
  );
}
