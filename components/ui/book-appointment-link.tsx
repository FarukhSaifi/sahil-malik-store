import Link from "next/link";

import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import type { BookAppointmentLinkProps } from "@/types";

export function BookAppointmentLink({ variant = "outlineInvert", size = "lg", className }: BookAppointmentLinkProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn("label-caps", className)}>
      <Link href={SITE.routes.contact} prefetch>
        {SITE.ui.bookAppointment}
      </Link>
    </Button>
  );
}
