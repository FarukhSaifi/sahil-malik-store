import { SITE } from "@/constants/site";

import { getLookbooks } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { LookbookTile } from "@/components/cards/lookbook-tile";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";


export const metadata = buildMetadata({
  title: `${SITE.pages.lookbook.metaTitle} | ${SITE.name}`,
  description: SITE.pages.lookbook.metaDescription,
  path: SITE.routes.lookbook,
});

export default function LookbookPage() {
  const lookbooks = getLookbooks();

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.lookbook.title} subtitle={SITE.pages.lookbook.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {lookbooks.map((lookbook) => (
            <LookbookTile key={lookbook.slug} lookbook={lookbook} />
          ))}
        </div>
      </Container>
    </section>
  );
}
