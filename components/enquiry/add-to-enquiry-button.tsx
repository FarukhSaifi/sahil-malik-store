"use client";

import { BookmarkCheck, BookmarkPlus } from "lucide-react";

import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

import { useEnquiry } from "@/context/enquiry-provider";

import { Button } from "@/components/ui/button";

import type { AddToEnquiryButtonProps } from "@/types";

export function AddToEnquiryButton({ product, collectionTitle, variant = "card", className }: AddToEnquiryButtonProps) {
  const { isSelected, addProduct, removeProduct } = useEnquiry();
  const selected = isSelected(product.slug);
  const isCard = variant === "card";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (selected) {
      removeProduct(product.slug);
      return;
    }

    addProduct(product, collectionTitle);
  };

  const ariaLabel = selected ? SITE.a11y.removeFromEnquiry(product.title) : SITE.a11y.addToEnquiry(product.title);

  return (
    <Button
      type="button"
      variant={isCard ? "outlineInvert" : "default"}
      size={isCard ? "sm" : "lg"}
      className={cn(
        isCard ? "h-10 w-10 shrink-0 bg-background/90 p-0 backdrop-blur-sm" : "label-caps",
        className,
      )}
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {isCard ? (
        selected ? (
          <BookmarkCheck className="h-4 w-4" aria-hidden />
        ) : (
          <BookmarkPlus className="h-4 w-4" aria-hidden />
        )
      ) : selected ? (
        SITE.ui.removeFromEnquiry
      ) : (
        SITE.ui.addToEnquiry
      )}
    </Button>
  );
}
