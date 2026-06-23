import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@/constants/images";
import { IMAGE_SIZES } from "@/constants/layout";
import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

import type { SiteLogoProps } from "@/types";

export function SiteLogo({ overlay = false, className }: SiteLogoProps) {
  const src = overlay ? BRAND.logoLight : BRAND.logoDark;

  return (
    <Link
      href={SITE.routes.home}
      aria-label={SITE.a11y.home(SITE.name)}
      className={cn(
        "site-logo inline-flex max-w-[min(52vw,11rem)] shrink-0 items-center transition-opacity hover:opacity-70 sm:max-w-[min(40vw,12.5rem)] lg:max-w-none",
        className,
      )}
    >
      <Image
        src={src}
        alt={SITE.name}
        width={BRAND.logoWidth}
        height={BRAND.logoHeight}
        priority
        sizes={IMAGE_SIZES.logo}
        className={cn(
          "h-7 w-auto max-w-full object-contain object-center sm:h-8 lg:h-9",
          overlay && "drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]",
        )}
      />
    </Link>
  );
}
