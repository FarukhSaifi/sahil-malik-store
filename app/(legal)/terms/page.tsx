import { BRAND } from "@/constants/images";
import { SITE } from "@/constants/site";

import { getTerms } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { LegalDocument } from "@/components/sections/legal-document";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { Container } from "@/components/ui/container";

export const metadata = buildMetadata({
  title: `${SITE.pages.terms.metaTitle} | ${SITE.name}`,
  description: SITE.pages.terms.metaDescription,
  path: SITE.routes.terms,
  image: BRAND.ogDefault,
  imageAlt: SITE.pages.terms.ogImageAlt,
});

export default function TermsPage() {
  const document = getTerms();

  return (
    <section className="section-padding">
      <Container>
        <LegalPageHeader title={document.title} subtitle={document.subtitle} />
        <LegalDocument intro={document.intro} sections={document.sections} />
      </Container>
    </section>
  );
}
