import type * as React from "react";
import type { ReactNode } from "react";

// ─── Data models ─────────────────────────────────────────────────────────────

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

// ─── Site ────────────────────────────────────────────────────────────────────

export type CollectionFilter = {
  label: string;
  value?: Collection["category"];
};

export type CtaLink = {
  label: string;
  href: string;
};

// ─── Images ──────────────────────────────────────────────────────────────────

export type ImageOptions = {
  width: number;
  height?: number;
  alt: string;
  priority?: boolean;
};

export type UnsplashOptions = ImageOptions;

// ─── SEO ─────────────────────────────────────────────────────────────────────

export type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  hours: string;
  whatsapp: {
    phone: string;
    defaultMessage: string;
  };
};

// ─── Pages ───────────────────────────────────────────────────────────────────

export type CollectionsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export type CollectionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type CoutureDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type LookbookDetailPageProps = {
  params: Promise<{ slug: string }>;
};

// ─── Providers ───────────────────────────────────────────────────────────────

export type HeroSlideshowContextValue = {
  paused: boolean;
  setPaused: (paused: boolean) => void;
};

// ─── Component props ─────────────────────────────────────────────────────────

export type AnnouncementBarProps = {
  overlay?: boolean;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "outlineInvert" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
};

export type BookAppointmentLinkProps = {
  variant?: "default" | "outlineInvert";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export type CategoryTilesProps = {
  categories: Category[];
};

export type CelebrityGridProps = {
  celebrities: Celebrity[];
};

export type CollectionCardProps = {
  collection: Collection;
};

export type ContactFormProps = {
  inboxEmail: string;
};

export type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  state?: "default" | "error";
};

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  state?: "default" | "error";
};

export type CtaLinkProps = {
  href: string;
  variant?: "default" | "light";
  className?: string;
  children: ReactNode;
  prefetch?: boolean;
};

export type CtaTextProps = {
  variant?: "default" | "light";
  className?: string;
  children: ReactNode;
};

export type CollectionGridProps = {
  collections: Collection[];
  categoryKey: string;
};

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export type CoutureShowcaseProps = {
  seasons: CoutureSeason[];
};

export type DesktopNavProps = {
  overlay: boolean;
  side: "left" | "right";
};

export type NavDropdownProps = {
  id: string;
  label: string;
  href: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  linkClass: string;
  panelClassName: string;
  children: ReactNode;
};

export type DiscoverMoreProps = {
  items: DiscoverItem[];
};

export type EditorialImageProps = {
  image: ImageAsset;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
  fill?: boolean;
  priority?: boolean;
};

export type FeaturedCollectionsProps = {
  collections: Collection[];
};

export type HeroSliderProps = {
  slides: HeroSlide[];
};

export type LookbookTileProps = {
  lookbook: Lookbook;
};

export type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type PhilosophyBlockProps = {
  title: string;
  subtitle: string;
  body: string;
  cta: CtaLink;
};

export type PressCardProps = {
  item: PressItem;
};

export type PressCarouselProps = {
  items: PressItem[];
};

export type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export type SiteHeaderProps = {
  overlay?: boolean;
};

export type WhatsAppButtonProps = {
  phone: string;
  defaultMessage: string;
};
