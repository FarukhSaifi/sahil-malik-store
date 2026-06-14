"use client";

import { SITE, getNavBySide, getNavMegaItem } from "@/constants/site";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type DesktopNavProps = {
  overlay: boolean;
  side: "left" | "right";
};

export function DesktopNav({ overlay, side }: DesktopNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const linkClass = overlay ? "nav-link-light" : "nav-link";
  const shopNav = getNavMegaItem("shop");
  const coutureNav = getNavMegaItem("couture");

  if (side === "left") {
    return (
      <nav className="relative hidden items-center gap-8 lg:flex">
        <div className="relative" onMouseEnter={() => setOpenMenu("shop")} onMouseLeave={() => setOpenMenu(null)}>
          <Link href={shopNav.href} prefetch className={cn(linkClass, "inline-flex items-center gap-1")}>
            {shopNav.label}
            <ChevronDown className="h-3 w-3 opacity-60" />
          </Link>

          {openMenu === "shop" ? (
            <div className="absolute left-0 top-full z-50 mt-4 w-[min(90vw,720px)] border border-border bg-background p-8 text-foreground shadow-sm">
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="label-caps mb-4 text-muted">{SITE.shopMenu.headings.women}</p>
                  <ul className="space-y-2">
                    {SITE.shopMenu.women.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm transition-opacity hover:opacity-60">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-caps mb-4 text-muted">{SITE.shopMenu.headings.men}</p>
                  <ul className="space-y-2">
                    {SITE.shopMenu.men.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm transition-opacity hover:opacity-60">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-caps mb-4 text-muted">{SITE.shopMenu.headings.collections}</p>
                  <ul className="space-y-2">
                    {SITE.shopMenu.collections.map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm transition-opacity hover:opacity-60">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative" onMouseEnter={() => setOpenMenu("couture")} onMouseLeave={() => setOpenMenu(null)}>
          <Link href={coutureNav.href} prefetch className={cn(linkClass, "inline-flex items-center gap-1")}>
            {coutureNav.label}
            <ChevronDown className="h-3 w-3 opacity-60" />
          </Link>

          {openMenu === "couture" ? (
            <div className="absolute left-0 top-full z-50 mt-4 min-w-[280px] border border-border bg-background p-6 text-foreground shadow-sm">
              <ul className="space-y-3">
                {SITE.coutureMenu.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm transition-opacity hover:opacity-60">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {getNavBySide("right").map((item) => (
        <Link key={item.key} href={item.href} prefetch className={linkClass}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
