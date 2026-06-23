"use client";

import { useEffect } from "react";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { TIMING } from "@/constants/timing";

import { EASE_EDITORIAL } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import type { NavDropdownProps } from "@/types";

export function NavDropdown({
  id,
  label,
  href,
  isOpen,
  onOpen,
  onClose,
  linkClass,
  panelClassName,
  children,
}: NavDropdownProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={href}
        prefetch
        className={cn(linkClass, "inline-flex items-center gap-1")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={cn("h-3 w-3 opacity-60 transition-transform duration-300", isOpen && "rotate-180")} />
      </Link>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key={id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: TIMING.nav.dropdownOffsetY }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: TIMING.nav.dropdownOffsetY }}
            transition={{ duration: TIMING.nav.dropdownDuration, ease: EASE_EDITORIAL }}
            className="absolute left-0 top-full z-50 pt-4"
          >
            <div className={panelClassName}>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
