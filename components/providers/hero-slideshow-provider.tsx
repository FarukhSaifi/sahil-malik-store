"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HeroSlideshowContextValue = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
};

const HeroSlideshowContext = createContext<HeroSlideshowContextValue | null>(null);

export function HeroSlideshowProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return <HeroSlideshowContext.Provider value={{ paused, setPaused }}>{children}</HeroSlideshowContext.Provider>;
}

export function useHeroSlideshow() {
  const context = useContext(HeroSlideshowContext);
  if (!context) {
    return { paused: false, setPaused: () => {} };
  }
  return context;
}
