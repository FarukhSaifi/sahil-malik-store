"use client";

import { useCallback, useState } from "react";

import Link from "next/link";

import { SITE, getNavBySide, getNavMegaItem } from "@/constants/site";

import { NavDropdown } from "./nav-dropdown";

import type { DesktopNavProps } from "@/types";

export function DesktopNav({ overlay, side }: DesktopNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const linkClass = overlay ? "nav-link-light" : "nav-link";
  const shopNav = getNavMegaItem("shop");
  const coutureNav = getNavMegaItem("couture");

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  if (side === "left") {
    return (
      <nav className="relative hidden items-center gap-8 overflow-visible lg:flex">
        <NavDropdown
          id="shop"
          label={shopNav.label}
          href={shopNav.href}
          isOpen={openMenu === "shop"}
          onOpen={() => setOpenMenu("shop")}
          onClose={closeMenu}
          linkClass={linkClass}
          panelClassName="w-[min(90vw,720px)] border border-border bg-background p-8 text-foreground shadow-sm"
        >
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="label-caps mb-4 text-muted">{SITE.shopMenu.headings.women}</p>
              <ul className="space-y-2">
                {SITE.shopMenu.women.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
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
                    <Link href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
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
                    <Link href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </NavDropdown>

        <NavDropdown
          id="couture"
          label={coutureNav.label}
          href={coutureNav.href}
          isOpen={openMenu === "couture"}
          onOpen={() => setOpenMenu("couture")}
          onClose={closeMenu}
          linkClass={linkClass}
          panelClassName="min-w-[280px] border border-border bg-background p-6 text-foreground shadow-sm"
        >
          <ul className="space-y-3">
            {SITE.coutureMenu.map((item) => (
              <li key={item.label}>
                <Link href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </NavDropdown>
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-8 overflow-visible lg:flex">
      {getNavBySide("right").map((item) => (
        <Link key={item.key} href={item.href} prefetch className={linkClass}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
