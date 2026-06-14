import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { SITE } from "@/constants/site";
import { getCoutureBySlug, getCoutureSeasons } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type CoutureDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const seasons = getCoutureSeasons();
  return seasons.map((season) => ({ slug: season.slug }));
}

export async function generateMetadata({ params }: CoutureDetailPageProps) {
  const { slug } = await params;
  const season = getCoutureBySlug(slug);

  if (!season) return {};

  return buildMetadata({
    title: `${season.title} ${SITE.pages.couture.detailMetaSuffix} | ${SITE.name}`,
    description: season.description,
    path: `/couture/${season.slug}`,
  });
}

export default async function CoutureDetailPage({ params }: CoutureDetailPageProps) {
  const { slug } = await params;
  const season = getCoutureBySlug(slug);

  if (!season) notFound();

  return (
    <>
      <section className="relative h-[50vh] min-h-[320px] w-full lg:h-[65vh]">
        <EditorialImage image={season.heroImage} sizes="100vw" priority className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-inverse/50 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 text-background">
          <p className="mb-2 uppercase tracking-[0.2em] text-xs">{season.subtitle}</p>
          <h1 className="heading-section">{season.title}</h1>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            {season.description}
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 [content-visibility:auto]">
            {season.gallery.map((image) => (
              <div key={image.src} className="relative aspect-3/4 overflow-hidden">
                <EditorialImage image={image} sizes="(max-width: 768px) 100vw, 33vw" className="h-full w-full" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
