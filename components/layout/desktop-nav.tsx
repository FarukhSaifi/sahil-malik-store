"use client";

import { useCallback, useState } from "react";

import Link from "next/link";

import { SITE, getNavBySide, getNavMegaItem } from "@/constants/site";

import { NavDropdown } from "./nav-dropdown";

import type { DesktopNavProps } from "@/types";

export function DesktopNav({ overlay, side }: DesktopNavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const linkClass = overlay ? "nav-link-light" : "nav-link";
  const menswearNav = getNavMegaItem("menswear");
  const womenswearNav = getNavMegaItem("womenswear");
  const coutureNav = getNavMegaItem("couture");

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  if (side === "left") {
    return (
      <nav className="relative hidden items-center gap-6 overflow-visible xl:gap-8 lg:flex">
        <NavDropdown
          id="menswear"
          label={menswearNav.label}
          href={menswearNav.href}
          isOpen={openMenu === "menswear"}
          onOpen={() => setOpenMenu("menswear")}
          onClose={closeMenu}
          linkClass={linkClass}
          panelClassName="w-[min(90vw,560px)] border border-border bg-background p-8 text-foreground shadow-sm"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            {SITE.menswearMenu.map((item) => (
              <Link key={item.href} href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
                {item.label}
              </Link>
            ))}
          </div>
        </NavDropdown>

        <NavDropdown
          id="womenswear"
          label={womenswearNav.label}
          href={womenswearNav.href}
          isOpen={openMenu === "womenswear"}
          onOpen={() => setOpenMenu("womenswear")}
          onClose={closeMenu}
          linkClass={linkClass}
          panelClassName="min-w-[240px] border border-border bg-background p-6 text-foreground shadow-sm"
        >
          <ul className="space-y-3">
            {SITE.womenswearMenu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch className="text-sm transition-opacity hover:opacity-60">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
