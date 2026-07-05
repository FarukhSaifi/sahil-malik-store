"use client";

import Image from "next/image";

import { SITE } from "@/constants/site";

import { useEnquiry } from "@/components/providers/enquiry-provider";
import { Button } from "@/components/ui/button";

import type { EnquiryListProps } from "@/types";

export function EnquiryList({ className }: EnquiryListProps) {
  const { items, removeProduct } = useEnquiry();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.productSlug} className="flex items-center gap-4 border-b border-border py-4 last:border-b-0">
          <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
            <Image src={item.imageSrc} alt={item.title} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{item.sku}</p>
            <p className="font-display text-lg font-light">{item.title}</p>
            <p className="text-xs text-muted">{item.collectionTitle}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="label-caps shrink-0"
            onClick={() => removeProduct(item.productSlug)}
          >
            {SITE.ui.removeFromEnquiry}
          </Button>
        </li>
      ))}
    </ul>
  );
}
