import Link from "next/link";

import { SITE } from "@/constants/site";

import { buildMetadata } from "@/lib/seo";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = buildMetadata({
  title: `${SITE.pages.thankYou.metaTitle} | ${SITE.name}`,
  description: SITE.pages.thankYou.metaDescription,
  path: SITE.routes.thankYou,
});

export default function ThankYouPage() {
  return (
    <section className="section-padding pt-28 sm:pt-32">
      <Container className="max-w-2xl text-center">
        <SectionHeading
          title={SITE.pages.thankYou.title}
          subtitle={SITE.pages.thankYou.subtitle}
          align="center"
          className="mb-6"
        />
        <p className="mx-auto max-w-md text-sm text-muted sm:text-base">{SITE.pages.thankYou.description}</p>
        <div className="mt-10">
          <Button asChild variant="outlineInvert" size="lg" className="label-caps">
            <Link href={SITE.routes.home}>{SITE.pages.thankYou.cta}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
