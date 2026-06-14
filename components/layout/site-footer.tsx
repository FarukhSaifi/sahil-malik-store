import Link from "next/link";

import { SITE } from "@/constants/site";

import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="section-padding-tight">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="label-caps mb-5">{SITE.footer.headings.support}</h3>
            <ul className="space-y-3">
              {SITE.footer.support.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted transition-opacity hover:opacity-60">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-5">{SITE.footer.headings.info}</h3>
            <ul className="space-y-3">
              {SITE.footer.info.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted transition-opacity hover:opacity-60">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps mb-5">{SITE.footer.headings.followUs}</h3>
            <ul className="space-y-3">
              {SITE.socialLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-opacity hover:opacity-60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted">{SITE.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
