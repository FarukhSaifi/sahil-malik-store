import Link from "next/link";
import { notFound } from "next/navigation";

import { collectionPath } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { getCollectionBySlug, getProductBySlug, getProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { ProductDetailsAccordion } from "@/components/products/product-details-accordion";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfoPanel } from "@/components/products/product-info-panel";
import { RelatedProducts } from "@/components/products/related-products";
import { Container } from "@/components/ui/container";

import type { ProductDetailPageProps } from "@/types";

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return buildMetadata({
    title: `${product.title} | ${SITE.name}`,
    description: product.description ?? `${product.title} — ${product.sku}`,
    path: `/products/${product.slug}`,
    image: product.image.src,
    imageAlt: product.image.alt,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const collection = getCollectionBySlug(product.collectionSlug);

  if (!collection) notFound();

  const relatedProducts = getProducts({ collectionSlug: product.collectionSlug })
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="section-padding pb-10 sm:pb-14">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.2em] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={SITE.routes.collections} className="transition-opacity hover:opacity-60">
                  Collections
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={collectionPath(collection.slug)} className="transition-opacity hover:opacity-60">
                  {collection.title}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{product.title}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <ProductGallery gallery={product.gallery} title={product.title} />
            <ProductInfoPanel product={product} collectionTitle={collection.title} />
          </div>

          <div className="mx-auto mt-14 max-w-3xl lg:mt-20">
            <ProductDetailsAccordion product={product} collectionTitle={collection.title} />
          </div>
        </Container>
      </section>

      <RelatedProducts products={relatedProducts} collectionTitle={collection.title} />
    </>
  );
}
