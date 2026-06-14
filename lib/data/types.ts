export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  priority?: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Collection = {
  slug: string;
  title: string;
  category: "evening" | "bridal" | "menswear" | "saree";
  season: string;
  coverImage: ImageAsset;
  description: string;
  featured: boolean;
  order: number;
  gallery: ImageAsset[];
};

export type CoutureSeason = {
  slug: string;
  title: string;
  subtitle?: string;
  season: string;
  year: number;
  heroImage: ImageAsset;
  description: string;
  featured: boolean;
  gallery: ImageAsset[];
};

export type Lookbook = {
  slug: string;
  title: string;
  subtitle?: string;
  coverImage: ImageAsset;
  description: string;
  gallery: ImageAsset[];
};

export type PressItem = {
  slug: string;
  quote: string;
  publication: string;
  date: string;
  url?: string;
};

export type Celebrity = {
  name: string;
  image: ImageAsset;
};

export type Category = {
  slug: string;
  title: string;
  image: ImageAsset;
  href: string;
};

export type HeroSlide = {
  image: ImageAsset;
  quote?: string;
  attribution?: string;
};

export type DiscoverItem = {
  title: string;
  href: string;
  image: ImageAsset;
};

export type QueryOptions = {
  featured?: boolean;
  limit?: number;
  category?: Collection["category"];
};
