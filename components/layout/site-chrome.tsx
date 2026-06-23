"use client";

import { usePathname } from "next/navigation";

import { SITE } from "@/constants/site";

import { useHeroOverlay } from "@/hooks/use-hero-overlay";
import { useMounted } from "@/hooks/use-mounted";

import { AnnouncementBar } from "./announcement-bar";
import { SiteHeader } from "./site-header";


export function SiteChrome() {
  const pathname = usePathname();
  const isHome = pathname === SITE.routes.home;
  const mounted = useMounted();
  const overHero = useHeroOverlay(isHome && mounted);
  // Before mount, keep the home hero overlay so SSR matches the first client paint.
  const isOverlay = isHome && (!mounted || overHero);

  return (
    <div className="sticky top-0 z-50 w-full overflow-visible">
      {isOverlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-inverse/35 via-inverse/10 to-transparent"
        />
      ) : null}
      <AnnouncementBar overlay={isOverlay} />
      <SiteHeader overlay={isOverlay} />
    </div>
  );
}
