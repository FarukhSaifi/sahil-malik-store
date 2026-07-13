import { SITE } from "@/constants/site";

import { buildMetadata } from "@/lib/seo";

import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { EnquiryList } from "@/components/enquiry/enquiry-list";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = buildMetadata({
  title: `${SITE.pages.enquiry.metaTitle} | ${SITE.name}`,
  description: SITE.pages.enquiry.metaDescription,
  path: SITE.routes.enquiry,
});

export default function EnquiryPage() {
  return (
    <section className="section-padding pt-28 sm:pt-32">
      <Container className="max-w-3xl">
        <SectionHeading
          title={SITE.pages.enquiry.title}
          subtitle={SITE.pages.enquiry.subtitle}
          align="center"
          className="mb-12"
        />

        <div className="mb-12">
          <h2 className="label-caps mb-4 text-muted">{SITE.enquiry.selectedHeading}</h2>
          <EnquiryList />
        </div>

        <div>
          <h2 className="label-caps mb-2 text-muted">{SITE.enquiry.formHeading}</h2>
          <p className="mb-8 text-sm text-muted">{SITE.enquiry.formDescription}</p>
          <EnquiryForm />
        </div>
      </Container>
    </section>
  );
}
