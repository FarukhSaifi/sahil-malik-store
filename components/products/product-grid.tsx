import { ProductCard } from "@/components/cards/product-card";

import type { ProductGridProps } from "@/types";

export function ProductGrid({ products, collectionTitle }: ProductGridProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} collectionTitle={collectionTitle} />
      ))}
    </div>
  );
}
