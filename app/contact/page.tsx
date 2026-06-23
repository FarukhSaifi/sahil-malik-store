import { SITE } from "@/constants/site";

import { getContactInfo } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";


export const metadata = buildMetadata({
  title: `${SITE.pages.contact.metaTitle} | ${SITE.name}`,
  description: SITE.pages.contact.metaDescription,
  path: SITE.routes.contact,
});

export default function ContactPage() {
  const contact = getContactInfo();

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.contact.title} subtitle={SITE.pages.contact.subtitle} align="center" />

        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-sm sm:text-base">
            {contact.address ? (
              <div>
                <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.atelier}</h3>
                <p>{contact.address}</p>
              </div>
            ) : null}

            {contact.hours ? (
              <div>
                <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.hours}</h3>
                <p>{contact.hours}</p>
              </div>
            ) : null}

            {contact.email ? (
              <div>
                <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.email}</h3>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </div>
            ) : null}

            {contact.phone ? (
              <div>
                <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.phone}</h3>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">
                  {contact.phone}
                </a>
              </div>
            ) : null}
          </div>

          {contact.email ? <ContactForm inboxEmail={contact.email} /> : null}
        </div>
      </Container>
    </section>
  );
}
