import { useSyncExternalStore } from "react";

const THRESHOLD_RATIO = 0.65;

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.scrollY < window.innerHeight * THRESHOLD_RATIO;
}

function getServerSnapshot() {
  return true;
}

export function useHeroOverlay(enabled: boolean) {
  const overHero = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return enabled && overHero;
}
