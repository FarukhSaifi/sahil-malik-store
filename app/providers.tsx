"use client";

import { EnquiryProvider } from "@/context/enquiry-provider";
import { HeroSlideshowProvider } from "@/context/hero-slideshow-provider";

import type { AppProvidersProps } from "@/types";

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HeroSlideshowProvider>
      <EnquiryProvider>{children}</EnquiryProvider>
    </HeroSlideshowProvider>
  );
}
