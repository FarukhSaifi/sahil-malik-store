import { SITE } from "@/constants/site";

import { BookAppointmentLink } from "@/components/ui/book-appointment-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

import { getAbout } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${SITE.pages.about.metaTitle} | ${SITE.name}`,
  description: SITE.pages.about.metaDescription,
  path: SITE.routes.about,
});

export default function AboutPage() {
  const about = getAbout();

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={about.title} subtitle={SITE.pages.about.subtitle} />

        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-muted sm:text-base">
          <p className="font-display text-xl text-foreground sm:text-2xl">{about.intro}</p>
          {about.story.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl border border-border p-8 text-center sm:p-12">
          <p className="mb-3 uppercase tracking-[0.2em] text-xs text-muted">{about.philosophy.subtitle}</p>
          <h2 className="heading-section mb-6 text-2xl sm:text-3xl">{about.philosophy.title}</h2>
          <p className="text-sm leading-relaxed text-muted sm:text-base">{about.philosophy.body.split("\n\n")[0]}</p>
        </div>

        <div className="mt-12 text-center">
          <BookAppointmentLink />
        </div>
      </Container>
    </section>
  );
}
