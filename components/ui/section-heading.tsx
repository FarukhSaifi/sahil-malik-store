import { cn } from "@/lib/utils";

import type { SectionHeadingProps } from "@/types";

export function SectionHeading({ title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-12", align === "center" && "text-center", className)}>
      {subtitle ? <p className="mb-3 uppercase tracking-[0.2em] text-xs text-muted">{subtitle}</p> : null}
      <h2 className="heading-section">{title}</h2>
    </div>
  );
}
