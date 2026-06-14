import { AppointmentCTA } from "@/components/sections/appointment-cta";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { CelebrityGrid } from "@/components/sections/celebrity-grid";
import { CoutureShowcase } from "@/components/sections/couture-showcase";
import { DiscoverMore } from "@/components/sections/discover-more";
import { HeroSlider } from "@/components/sections/hero-slider";
import { PhilosophyBlock } from "@/components/sections/philosophy-block";
import { PressCarousel } from "@/components/sections/press-carousel";
import {
  getCategories,
  getCelebrities,
  getCoutureSeasons,
  getDiscoverItems,
  getHeroSlides,
  getPhilosophy,
  getPress,
} from "@/lib/data";

export default async function HomePage() {
  const [heroSlides, categories, couture, celebrities, discover, philosophy, press] = await Promise.all([
    Promise.resolve(getHeroSlides()),
    Promise.resolve(getCategories()),
    Promise.resolve(getCoutureSeasons({ featured: true, limit: 2 })),
    Promise.resolve(getCelebrities()),
    Promise.resolve(getDiscoverItems()),
    Promise.resolve(getPhilosophy()),
    Promise.resolve(getPress({ limit: 6 })),
  ]);

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <CategoryTiles categories={categories} />
      <CoutureShowcase seasons={couture} />
      <CelebrityGrid celebrities={celebrities} />
      <DiscoverMore items={discover} />
      <PhilosophyBlock {...philosophy} />
      <PressCarousel items={press} />
      <AppointmentCTA />
    </>
  );
}
