import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/constants/site";
import Link from "next/link";

export function AppointmentCTA() {
  const { eyebrow, title, body, cta } = SITE.sections.appointment;

  return (
    <section className="section-padding border-t border-border">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="label-caps mb-4 text-muted">{eyebrow}</p>
            <h2 className="heading-section mb-6">{title}</h2>
            <p className="mb-10 text-sm leading-[1.8] text-muted sm:text-base">{body}</p>
            <Link
              href={cta.href}
              prefetch
              className="inline-flex min-h-11 items-center border border-foreground px-8 label-caps transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              {cta.label}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
