"use client";

import Link from "next/link";

import { SITE, getNavDrawerItems, getNavMegaItem } from "@/constants/site";

import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";

import type { MobileMenuProps } from "@/types";

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const menswearNav = getNavMegaItem("menswear");
  const womenswearNav = getNavMegaItem("womenswear");
  const coutureNav = getNavMegaItem("couture");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="justify-between overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        <div className="flex flex-col gap-10 pt-14">
          <p className="font-display text-2xl font-light tracking-[0.2em] uppercase">{SITE.name}</p>

          <nav className="flex flex-col gap-8">
            <div>
              <SheetClose asChild>
                <Link href={menswearNav.href} prefetch className="label-caps text-muted">
                  {menswearNav.label}
                </Link>
              </SheetClose>
              <ul className="mt-4 space-y-3 pl-2">
                {SITE.menswearMenu.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        prefetch
                        className="text-lg font-light transition-opacity hover:opacity-60"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SheetClose asChild>
                <Link href={womenswearNav.href} prefetch className="label-caps text-muted">
                  {womenswearNav.label}
                </Link>
              </SheetClose>
              <ul className="mt-4 space-y-3 pl-2">
                {SITE.womenswearMenu.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        prefetch
                        className="text-lg font-light transition-opacity hover:opacity-60"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SheetClose asChild>
                <Link href={coutureNav.href} prefetch className="label-caps text-muted">
                  {coutureNav.label}
                </Link>
              </SheetClose>
              <ul className="mt-4 space-y-3 pl-2">
                {SITE.coutureMenu.map((item) => (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        prefetch
                        className="text-lg font-light transition-opacity hover:opacity-60"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>

            {getNavDrawerItems().map((item) => (
              <SheetClose asChild key={item.key}>
                <Link
                  href={item.href}
                  prefetch
                  className="font-display text-3xl font-light transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}

            {SITE.navSecondary.map((item) => (
              <SheetClose asChild key={item.key}>
                <Link
                  href={item.href}
                  prefetch
                  className="font-display text-3xl font-light transition-opacity hover:opacity-60"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8">
          {SITE.socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps text-muted transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
