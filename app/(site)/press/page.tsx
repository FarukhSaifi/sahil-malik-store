import { SITE } from "@/constants/site";

import { getPress } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

import { PressCard } from "@/components/cards/press-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";


export const metadata = buildMetadata({
  title: `${SITE.pages.press.metaTitle} | ${SITE.name}`,
  description: SITE.pages.press.metaDescription,
  path: SITE.routes.press,
});

export default function PressPage() {
  const press = getPress();

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading title={SITE.pages.press.title} subtitle={SITE.pages.press.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {press.map((item) => (
            <PressCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
