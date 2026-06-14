import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/constants/site";
import Link from "next/link";

export default function NotFound() {
  const { code, title, description, cta } = SITE.pages.notFound;

  return (
    <section className="section-padding">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-4 uppercase tracking-[0.2em] text-xs text-muted">{code}</p>
          <h1 className="heading-section mb-6">{title}</h1>
          <p className="mb-8 text-sm text-muted sm:text-base">{description}</p>
          <Button asChild>
            <Link href={SITE.routes.home}>{cta}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
