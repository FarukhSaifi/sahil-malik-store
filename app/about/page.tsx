import { BRAND } from "@/constants/images";
import { IMAGE_SIZES } from "@/constants/layout";
import { ABOUT_HERO } from "@/constants/philosophy";
import { SITE } from "@/constants/site";

import { getAbout } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { BookAppointmentLink } from "@/components/ui/book-appointment-link";
import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";

export const metadata = buildMetadata({
  title: `${SITE.pages.about.metaTitle} | ${SITE.name}`,
  description: SITE.pages.about.metaDescription,
  path: SITE.routes.about,
  image: BRAND.ogDefault,
  imageAlt: SITE.pages.about.ogImageAlt,
});

export default function AboutPage() {
  const about = getAbout();

  return (
    <>
      <section className="border-b border-border bg-background">
        <Container className="section-padding pb-0 sm:pb-0">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="label-caps mb-4 text-muted">{SITE.pages.about.subtitle}</p>
              <h1 className="heading-section mb-8 text-3xl sm:text-4xl lg:text-5xl">{about.title}</h1>
              <blockquote className="border-l border-foreground/20 pl-6">
                <p className="font-display text-xl leading-snug text-foreground sm:text-2xl lg:text-[1.65rem]">
                  &ldquo;{about.quote}&rdquo;
                </p>
              </blockquote>
              <p className="mt-8 text-sm leading-relaxed text-muted sm:text-base">{about.intro}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative mx-auto aspect-4/5 max-h-[min(72vh,720px)] w-full overflow-hidden sm:aspect-3/4 lg:ml-auto lg:max-w-xl">
                <EditorialImage image={ABOUT_HERO} sizes={IMAGE_SIZES.aboutHero} className="h-full w-full" priority />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-muted sm:text-base">
            {about.story.map((paragraph, index) => (
              <p key={`story-${index}`}>{paragraph}</p>
            ))}
          </div>

          <aside className="mx-auto mt-14 max-w-3xl border border-border bg-foreground/2 p-8 sm:p-10">
            <p className="label-caps mb-2 text-muted">{about.studio.label}</p>
            <h2 className="heading-section mb-4 text-xl sm:text-2xl">{about.studio.title}</h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{about.studio.body}</p>
          </aside>

          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-lg leading-relaxed text-foreground sm:text-xl">
            {about.tagline}
          </p>
        </Container>
      </section>

      <section className="border-y border-border bg-inverse text-background">
        <Container className="section-padding-tight">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-caps mb-4 text-background/60">{about.designerNote.label}</p>
            <p className="text-sm leading-relaxed text-background/85 sm:text-base">{about.designerNote.body}</p>
            <p className="mt-8 font-display text-base tracking-wide text-background sm:text-lg">
              {about.designerNote.attribution}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-3xl border border-border p-8 text-center sm:p-12">
            <p className="mb-3 uppercase tracking-[0.2em] text-xs text-muted">{about.philosophy.subtitle}</p>
            <h2 className="heading-section mb-6 text-2xl sm:text-3xl">{about.philosophy.title}</h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{about.philosophy.body.split("\n\n")[0]}</p>
          </div>

          <div className="mt-12 text-center">
            <BookAppointmentLink />
          </div>
        </Container>
      </section>
    </>
  );
}
