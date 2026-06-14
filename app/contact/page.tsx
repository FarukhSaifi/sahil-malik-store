import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${SITE.pages.contact.metaTitle} | ${SITE.name}`,
  description: SITE.pages.contact.metaDescription,
  path: SITE.routes.contact,
});

export default function ContactPage() {
  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          title={SITE.pages.contact.title}
          subtitle={SITE.pages.contact.subtitle}
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.atelier}</h3>
              <p>{SITE.contact.address}</p>
            </div>
            <div>
              <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.hours}</h3>
              <p>{SITE.contact.hours}</p>
            </div>
            <div>
              <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.email}</h3>
              <a href={`mailto:${SITE.contact.email}`} className="transition-colors hover:text-accent">
                {SITE.contact.email}
              </a>
            </div>
            <div>
              <h3 className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{SITE.contact.headings.phone}</h3>
              <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">
                {SITE.contact.phone}
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
