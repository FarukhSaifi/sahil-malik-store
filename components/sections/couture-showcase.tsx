import Link from "next/link";

import { IMAGE_SIZES } from "@/constants/layout";
import { couturePath } from "@/constants/routes";
import { TIMING } from "@/constants/timing";

import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";

import type { CoutureShowcaseProps } from "@/types";

export function CoutureShowcase({ seasons }: CoutureShowcaseProps) {
  return (
    <section className="flex flex-col">
      {seasons.map((season, index) => (
        <Reveal key={season.slug} delay={index * TIMING.revealStagger.discover}>
          <Link
            href={couturePath(season.slug)}
            prefetch
            className="group relative block min-h-[70vh] overflow-hidden sm:min-h-[78vh]"
          >
            <EditorialImage
              image={season.heroImage}
              sizes={IMAGE_SIZES.hero}
              priority={index === 0}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-inverse/20 via-transparent   to-transparent transition-colors duration-700 group-hover:from-inverse/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-background">
              <p className="label-caps mb-4 text-background/80">{season.subtitle}</p>
              <h2 className="heading-section max-w-4xl text-background">{season.title}</h2>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
