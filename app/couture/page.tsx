import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/constants/site";
import { getCoutureSeasons } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: `${SITE.pages.couture.metaTitle} | ${SITE.name}`,
  description: SITE.pages.couture.metaDescription,
  path: SITE.routes.couture,
});

export default function CouturePage() {
  const seasons = getCoutureSeasons();

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.couture.title} subtitle={SITE.pages.couture.subtitle} />

        <div className="flex flex-col gap-10 lg:gap-14">
          {seasons.map((season) => (
            <Link
              key={season.slug}
              href={`${SITE.routes.couture}/${season.slug}`}
              prefetch
              className="group grid gap-6 lg:grid-cols-2 lg:items-center"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <EditorialImage
                  image={season.heroImage}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="image-hover-lift h-full w-full"
                />
              </div>
              <div>
                <p className="mb-2 uppercase tracking-[0.2em] text-xs text-muted">{season.subtitle}</p>
                <h2 className="heading-section mb-4">{season.title}</h2>
                <p className="text-sm leading-relaxed text-muted sm:text-base">{season.description}</p>
                <span className="editorial-link-underline mt-6">{SITE.ui.explore}</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
