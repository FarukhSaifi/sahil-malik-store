"use client";

import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

import { useMounted } from "@/hooks/use-mounted";

import { useEnquiry } from "@/components/providers/enquiry-provider";

export function EnquiryBar() {
  const { count } = useEnquiry();
  const mounted = useMounted();

  if (!mounted || count === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 flex justify-center px-4 sm:bottom-6">
      <Link
        href={ROUTES.enquiry}
        className="label-caps inline-flex min-h-11 items-center rounded-full border border-foreground/10 bg-background/95 px-6 py-3 text-xs shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
      >
        {SITE.enquiry.barLabel(count)}
      </Link>
    </div>
  );
}
