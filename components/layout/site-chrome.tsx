"use client";

import { SITE } from "@/constants/site";
import { useHeroOverlay } from "@/hooks/use-hero-overlay";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";
import { SiteHeader } from "./site-header";

export function SiteChrome() {
  const pathname = usePathname();
  const isHome = pathname === SITE.routes.home;
  const overHero = useHeroOverlay(isHome);
  const isOverlay = isHome && overHero;

  return (
    <div className="relative top-0 z-50 w-full">
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
