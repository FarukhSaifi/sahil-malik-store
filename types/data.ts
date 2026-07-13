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
  category: "menswear" | "womenswear";
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

export type LegalSection = {
  id: string;
  title: string;
  intro?: string;
  items?: readonly string[];
  paragraphs?: readonly string[];
  footerNote?: string;
};

export type LegalDocument = {
  title: string;
  subtitle: string;
  intro?: string;
  sections: readonly LegalSection[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type QueryOptions = {
  featured?: boolean;
  limit?: number;
  category?: Collection["category"];
};

export type Product = {
  slug: string;
  sku: string;
  title: string;
  collectionSlug: string;
  folderSlug: string;
  category: Collection["category"];
  description?: string;
  image: ImageAsset;
  gallery: ImageAsset[];
  featured?: boolean;
  order: number;
};

export type ProductQueryOptions = {
  collectionSlug?: string;
  category?: Collection["category"];
  featured?: boolean;
  limit?: number;
};

export type EnquiryItem = {
  productSlug: string;
  sku: string;
  title: string;
  imageSrc: string;
  collectionTitle: string;
  addedAt: number;
};

export type EnquiryProductSummary = {
  slug: string;
  sku: string;
  title: string;
};

export type EnquiryFormPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  products: EnquiryProductSummary[];
  idempotencyKey: string;
  honeypot?: string;
};

export type CollectionFilter = {
  label: string;
  value?: Collection["category"];
};

export type CtaLink = {
  label: string;
  href: string;
};

export type ImageOptions = {
  width: number;
  height?: number;
  alt: string;
  priority?: boolean;
};

export type UnsplashOptions = ImageOptions;

export type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  storeTitle: string;
  address: string;
  hours: string;
  map: {
    embedSrc: string;
    openUrl: string;
  };
  whatsapp: {
    phone: string;
    defaultMessage: string;
  };
};

export type CollectionsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type CoutureDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type HeroSlideshowContextValue = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
};
