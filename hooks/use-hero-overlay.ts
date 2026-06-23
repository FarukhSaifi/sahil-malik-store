import { useSyncExternalStore } from "react";

import { LAYOUT } from "@/constants/layout";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.scrollY < window.innerHeight * LAYOUT.heroOverlayThresholdRatio;
}

function getServerSnapshot() {
  return true;
}

export function useHeroOverlay(enabled: boolean) {
  const overHero = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return enabled && overHero;
}
