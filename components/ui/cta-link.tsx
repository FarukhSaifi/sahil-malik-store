"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { CtaLinkProps, CtaTextProps } from "@/types";

export const ctaLinkVariants = cva("", {
  variants: {
    variant: {
      default: "cta-link",
      light: "cta-link-light",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function CtaText({ variant = "default", className, children }: CtaTextProps) {
  return <span className={cn(ctaLinkVariants({ variant }), className)}>{children}</span>;
}

export function CtaLink({ href, variant = "default", className, children, prefetch = true }: CtaLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} className={cn(ctaLinkVariants({ variant }), className)}>
      {children}
    </Link>
  );
}
