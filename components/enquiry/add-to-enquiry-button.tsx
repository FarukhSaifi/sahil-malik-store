"use client";

import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

import { useEnquiry } from "@/components/providers/enquiry-provider";
import { Button } from "@/components/ui/button";

import type { AddToEnquiryButtonProps } from "@/types";

export function AddToEnquiryButton({ product, collectionTitle, variant = "card", className }: AddToEnquiryButtonProps) {
  const { isSelected, addProduct, removeProduct } = useEnquiry();
  const selected = isSelected(product.slug);

  const handleClick = () => {
    if (selected) {
      removeProduct(product.slug);
      return;
    }

    addProduct(product, collectionTitle);
  };

  return (
    <Button
      type="button"
      variant={variant === "detail" ? "default" : "outlineInvert"}
      size={variant === "detail" ? "lg" : "sm"}
      className={cn("label-caps", className)}
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={selected ? SITE.a11y.removeFromEnquiry(product.title) : SITE.a11y.addToEnquiry(product.title)}
    >
      {selected ? SITE.ui.removeFromEnquiry : SITE.ui.addToEnquiry}
    </Button>
  );
}
