import { SITE } from "@/constants/site";

import { ProductCard } from "@/components/cards/product-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

import type { RelatedProductsProps } from "@/types";

export function RelatedProducts({ products, collectionTitle }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-padding border-t border-border">
      <Container>
        <Reveal>
          <h2 className="heading-section mb-10 text-center sm:mb-14">{SITE.product.relatedTitle}</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <Reveal key={product.slug}>
              <ProductCard product={product} collectionTitle={collectionTitle} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
