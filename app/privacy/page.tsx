import { BRAND } from "@/constants/images";
import { SITE } from "@/constants/site";

import { getPrivacy } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { LegalDocument } from "@/components/sections/legal-document";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { Container } from "@/components/ui/container";

export const metadata = buildMetadata({
  title: `${SITE.pages.privacy.metaTitle} | ${SITE.name}`,
  description: SITE.pages.privacy.metaDescription,
  path: SITE.routes.privacy,
  image: BRAND.ogDefault,
  imageAlt: SITE.pages.about.ogImageAlt,
});

export default function PrivacyPage() {
  const document = getPrivacy();

  return (
    <section className="section-padding">
      <Container>
        <LegalPageHeader title={document.title} subtitle={document.subtitle} />
        <LegalDocument intro={document.intro} sections={document.sections} showToc />
      </Container>
    </section>
  );
}
