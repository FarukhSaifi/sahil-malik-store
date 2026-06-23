import { Cormorant_Garamond, Inter } from "next/font/google";

import { SITE } from "@/constants/site";

import { getContactInfo } from "@/lib/contact";
import { buildMetadata, rootMetadata } from "@/lib/seo";

import { BackToTop } from "@/components/layout/back-to-top";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroSlideshowProvider } from "@/components/providers/hero-slideshow-provider";


import type { Metadata, Viewport } from "next";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...rootMetadata,
  ...buildMetadata({
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.meta.homeDescription,
    path: SITE.routes.home,
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = getContactInfo();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <HeroSlideshowProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
          >
            {SITE.ui.skipToContent}
          </a>
          <SiteChrome />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          {contact.whatsapp.phone ? (
            <WhatsAppButton phone={contact.whatsapp.phone} defaultMessage={contact.whatsapp.defaultMessage} />
          ) : null}
          <BackToTop />
        </HeroSlideshowProvider>
      </body>
    </html>
  );
}
