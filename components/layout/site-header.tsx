"use client";

import { useEffect, useState } from "react";

import { Menu, Search } from "lucide-react";
import Link from "next/link";

import { SITE } from "@/constants/site";

import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

import { cn } from "@/lib/utils";
import type { SiteHeaderProps } from "@/types";

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const iconClass = cn(
    "h-[17px] w-[17px] transition-opacity hover:opacity-60",
    overlay ? "text-background" : "text-foreground",
  );

  return (
    <>
      <header
        className={cn(
          "site-header w-full overflow-visible transition-colors duration-500",
          overlay ? "border-transparent bg-transparent" : "border-b border-border bg-background",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[100vw] items-center px-4 sm:px-6 lg:px-10">
          <div className="flex flex-1 items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
              aria-label={SITE.a11y.openMenu}
            >
              <Menu className={iconClass} />
            </button>
            <DesktopNav overlay={overlay} side="left" />
          </div>

          <Link
            href={SITE.routes.home}
            className={cn("site-logo shrink-0", overlay ? "text-background" : "text-foreground")}
          >
            {SITE.name}
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              className="hidden min-h-11 min-w-11 items-center justify-center lg:flex"
              aria-label={SITE.a11y.search}
            >
              <Search className={iconClass} />
            </button>
            <DesktopNav overlay={overlay} side="right" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="hidden min-h-11 items-center justify-center lg:flex"
              aria-label={SITE.a11y.openNavigation}
            >
              <span className={cn("label-caps", overlay ? "nav-link-light" : "nav-link")}>{SITE.ui.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
