import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import type { ProductDetailsAccordionProps } from "@/types";

export function ProductDetailsAccordion({ product, collectionTitle }: ProductDetailsAccordionProps) {
  return (
    <div className="divide-y divide-border border-y border-border">
      <details className="group py-6">
        <summary className="cursor-pointer list-none font-display text-lg font-light leading-snug text-foreground marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
          <span className="flex items-start justify-between gap-4">
            <span>{SITE.product.sections.productDetails}</span>
            <span
              aria-hidden
              className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </span>
        </summary>
        <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
          <div>
            <dt className="mb-1 font-medium text-foreground">{SITE.product.styleCodeLabel}</dt>
            <dd>{product.sku}</dd>
          </div>
          <div>
            <dt className="mb-1 font-medium text-foreground">Name of Commodity</dt>
            <dd>{collectionTitle}</dd>
          </div>
          <div>
            <dt className="mb-1 font-medium text-foreground">Category</dt>
            <dd className="capitalize">{product.category}</dd>
          </div>
        </dl>
      </details>

      <details className="group py-6">
        <summary className="cursor-pointer list-none font-display text-lg font-light leading-snug text-foreground marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
          <span className="flex items-start justify-between gap-4">
            <span>{SITE.product.sections.shipping}</span>
            <span
              aria-hidden
              className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </span>
        </summary>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {SITE.product.shippingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href={ROUTES.policies} prefetch className="underline underline-offset-4 hover:text-foreground">
            {SITE.product.policiesLink}
          </Link>
        </p>
      </details>

      <details className="group py-6">
        <summary className="cursor-pointer list-none font-display text-lg font-light leading-snug text-foreground marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
          <span className="flex items-start justify-between gap-4">
            <span>{SITE.product.sections.disclaimer}</span>
            <span
              aria-hidden
              className="mt-1 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </span>
        </summary>
        <p className="mt-5 text-sm leading-relaxed text-muted">{SITE.product.disclaimer}</p>
      </details>
    </div>
  );
}
