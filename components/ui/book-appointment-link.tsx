import Link from "next/link";

import { SITE } from "@/constants/site";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
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
