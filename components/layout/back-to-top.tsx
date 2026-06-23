"use client";

import { useEffect, useState } from "react";

import { ArrowUp } from "lucide-react";

import { LAYOUT } from "@/constants/layout";
import { SITE } from "@/constants/site";

import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > LAYOUT.backToTopScrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={SITE.a11y.backToTop}
      className={cn(
        "fixed bottom-6 right-4 z-40 flex min-h-11 min-w-11 items-center justify-center border border-border bg-background text-foreground shadow-sm transition-all duration-300 hover:border-foreground sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
