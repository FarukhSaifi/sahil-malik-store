import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { AddToEnquiryButton } from "@/components/enquiry/add-to-enquiry-button";
import { BookAppointmentLink } from "@/components/ui/book-appointment-link";

import type { ProductInfoPanelProps } from "@/types";

export function ProductInfoPanel({ product, collectionTitle }: ProductInfoPanelProps) {
  return (
    <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
      <p className="label-caps mb-3 text-muted">{collectionTitle}</p>
      <h1 className="heading-section mb-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{product.title}</h1>

      {product.description ? (
        <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">{product.description}</p>
      ) : null}

      <dl className="mb-6 space-y-2 border-y border-border py-5 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-muted">{SITE.product.styleCodeLabel}:</dt>
          <dd className="font-medium tracking-wide">{product.sku}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-muted">{SITE.product.collectionLabel}:</dt>
          <dd>{collectionTitle}</dd>
        </div>
        {product.modelSize ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-muted">{SITE.product.modelSizeLabel}:</dt>
            <dd>{product.modelSize}</dd>
          </div>
        ) : null}
        {product.modelHeight ? (
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-muted">{SITE.product.modelHeightLabel}:</dt>
            <dd>{product.modelHeight}</dd>
          </div>
        ) : null}
      </dl>

      <p className="mb-6 text-xs uppercase tracking-[0.18em] text-muted">{SITE.product.madeToOrder}</p>

      <div className="space-y-3">
        <AddToEnquiryButton product={product} collectionTitle={collectionTitle} variant="detail" className="w-full" />
        <BookAppointmentLink variant="outlineInvert" className="w-full" />
        <Link
          href={ROUTES.enquiry}
          prefetch
          className="block text-center text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
        >
          {SITE.product.viewEnquiry}
        </Link>
      </div>

      <p className="mt-8 text-sm text-muted">
        {SITE.product.customisePrompt}{" "}
        <Link href={ROUTES.contact} prefetch className="underline underline-offset-4 hover:text-foreground">
          {SITE.product.customiseCta}
        </Link>
      </p>
    </div>
  );
}
