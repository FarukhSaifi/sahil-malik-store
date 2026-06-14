import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

type PhilosophyBlockProps = {
  title: string;
  subtitle: string;
  body: string;
  cta: { label: string; href: string };
};

export function PhilosophyBlock({ title, subtitle, body, cta }: PhilosophyBlockProps) {
  return (
    <section className="section-padding bg-background">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-section mb-3 uppercase tracking-[0.08em]">{title}</h2>
            <p className="mb-8 label-caps text-muted">{subtitle}</p>
            <div className="space-y-5 text-sm leading-[1.8] text-muted sm:text-base">
              {body.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <Link href={cta.href} prefetch className="editorial-link mt-10">
              {cta.label}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
