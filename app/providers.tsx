"use client";

import { EnquiryProvider } from "@/context/enquiry-provider";
import { HeroSlideshowProvider } from "@/context/hero-slideshow-provider";

import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HeroSlideshowProvider>
      <EnquiryProvider>{children}</EnquiryProvider>
    </HeroSlideshowProvider>
  );
}
