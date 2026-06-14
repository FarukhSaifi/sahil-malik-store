import { EditorialImage } from "@/components/ui/editorial-image";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/constants/site";
import type { Category } from "@/lib/data/types";
import Link from "next/link";

type CategoryTilesProps = {
  categories: Category[];
};

export function CategoryTiles({ categories }: CategoryTilesProps) {
  return (
    <section className="section-padding-tight">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 0.06}>
            <Link href={category.href} prefetch className="group block">
              <div className="relative aspect-4/5 overflow-hidden">
                <EditorialImage
                  image={category.image}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="image-hover-lift h-full w-full"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-5 sm:px-5 sm:py-6">
                <h2 className="font-display text-xl font-light sm:text-2xl lg:text-[1.75rem]">{category.title}</h2>
                <span className="label-caps opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:opacity-100">
                  {SITE.ui.viewAll}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
