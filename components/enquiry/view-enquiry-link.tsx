"use client";

import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { useMounted } from "@/hooks/use-mounted";

import { useEnquiry } from "@/context/enquiry-provider";

export function ViewEnquiryLink() {
  const { count } = useEnquiry();
  const mounted = useMounted();

  if (!mounted || count === 0) {
    return null;
  }

  return (
    <Link
      href={ROUTES.enquiry}
      prefetch
      className="block text-center text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
    >
      {SITE.product.viewEnquiry}
    </Link>
  );
}
