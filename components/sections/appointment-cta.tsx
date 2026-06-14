import { SITE } from "@/constants/site";

import { BookAppointmentLink } from "@/components/ui/book-appointment-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function AppointmentCTA() {
  const { eyebrow, title, body } = SITE.sections.appointment;

  return (
    <section className="section-padding border-t border-border">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-caps mb-4 text-muted">{eyebrow}</p>
            <h2 className="heading-section mb-6">{title}</h2>
            <p className="mb-10 text-sm leading-[1.8] text-muted sm:text-base">{body}</p>
            <BookAppointmentLink />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
