import { ExternalLink } from "lucide-react";

import { SITE } from "@/constants/site";

import type { ContactInfo } from "@/types";

type ContactMapProps = {
  map: ContactInfo["map"];
};

export function ContactMap({ map }: ContactMapProps) {
  return (
    <section aria-label={SITE.contact.map.title} className="border-t border-border">
      <div className="relative aspect-4/3 w-full sm:aspect-21/9">
        <iframe
          title={SITE.contact.map.title}
          src={map.embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        <a
          href={map.openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-sm border border-border bg-background/95 px-4 py-2 text-[10px] shadow-sm backdrop-blur-sm transition-colors hover:bg-background sm:right-6 sm:top-6 sm:text-xs"
        >
          {SITE.contact.map.openLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
