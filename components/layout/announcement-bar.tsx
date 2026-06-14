"use client";

import { useHeroSlideshow } from "@/components/providers/hero-slideshow-provider";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import Link from "next/link";

type AnnouncementBarProps = {
  overlay?: boolean;
};

export function AnnouncementBar({ overlay = false }: AnnouncementBarProps) {
  const { paused, setPaused } = useHeroSlideshow();

  return (
    <div
      className={cn(
        "transition-colors duration-500",
        overlay ? "border-transparent bg-transparent" : "border-b border-border bg-background",
      )}
    >
      <div className="mx-auto flex h-11 max-w-[100vw] items-center px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className={cn(
            "flex min-h-11 min-w-11 shrink-0 items-center justify-center transition-opacity hover:opacity-60",
            overlay ? "text-background" : "text-foreground",
          )}
          aria-label={paused ? SITE.a11y.playSlideshow : SITE.a11y.pauseSlideshow}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
          <div className="flex animate-marquee gap-12 whitespace-nowrap motion-reduce:animate-none">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={cn("label-caps", overlay ? "text-background" : "text-foreground")}>
                {SITE.announcement}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={SITE.routes.collections}
          prefetch
          className={cn(
            "label-caps hidden shrink-0 underline underline-offset-4 transition-opacity hover:opacity-60 sm:inline-flex",
            overlay ? "text-background" : "text-foreground",
          )}
        >
          {SITE.ui.discoverNow}
        </Link>

        <div className="w-11 shrink-0 sm:hidden" aria-hidden />
      </div>
    </div>
  );
}
