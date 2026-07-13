import { SITE } from "@/constants/site";

import { getFaq } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { FaqList } from "@/components/sections/faq-list";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { BookAppointmentLink } from "@/components/ui/book-appointment-link";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";

export const metadata = buildMetadata({
  title: `${SITE.pages.faq.metaTitle} | ${SITE.name}`,
  description: SITE.pages.faq.metaDescription,
  path: SITE.routes.faq,
});

export default function FaqPage() {
  const items = getFaq();

  return (
    <section className="section-padding">
      <Container>
        <LegalPageHeader title={SITE.pages.faq.title} subtitle={SITE.pages.faq.subtitle} />
        <FaqList items={items} />

        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-center">
          <CtaLink href={SITE.routes.policies}>{SITE.footer.support[0].label}</CtaLink>
          <BookAppointmentLink />
        </div>
      </Container>
    </section>
  );
}
