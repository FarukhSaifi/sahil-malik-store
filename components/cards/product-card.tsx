import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { productPath } from "@/constants/routes";

import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
import { EditorialImage } from "@/components/ui/editorial-image";

import type { ProductCardProps } from "@/types";

export function ProductCard({ product, collectionTitle }: ProductCardProps) {
  return (
    <article className="group relative">
      <Link href={productPath(product.slug)} prefetch className="block">
        <div className="relative aspect-3/4 overflow-hidden">
          <EditorialImage
            image={product.image}
            sizes={IMAGE_SIZES.editorialDefault}
            className="image-hover-lift h-full w-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-inverse/60 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-background">
            <p className="mb-1 uppercase tracking-[0.2em] text-[10px]">{product.sku}</p>
            <h3 className="font-display text-xl font-light sm:text-2xl">{product.title}</h3>
            <p className="mt-1 text-xs text-background/70">{collectionTitle}</p>
          </div>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <AddToEnquiryButton product={product} collectionTitle={collectionTitle} variant="card" />
      </div>
    </article>
  );
}
