import type * as React from "react";
import type { ReactNode } from "react";

// ─── Domain models ───────────────────────────────────────────────────────────

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
  id: string;
  /** Display name; omit when the person cannot be identified yet. */
  name?: string;
  image: ImageAsset;
  featured?: boolean;
};

export type Category = {
  slug: string;
  title: string;
  image: ImageAsset;
  href: string;
};

export type HeroSlide = {
  image: ImageAsset;
  promo: string;
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
  modelSize?: string;
  modelHeight?: string;
  image: ImageAsset;
  gallery: ImageAsset[];
  featured?: boolean;
  order: number;
};

export type ProductOverride = {
  title: string;
  description: string;
  modelSize: string;
  modelHeight: string;
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
  imageSrc: string;
  collectionTitle?: string;
};

export type EnquiryFormPayload = {
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  products: EnquiryProductSummary[];
  idempotencyKey: string;
  honeypot?: string;
};

export type ContactFormPayload = {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
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

export type EnquiryContextValue = {
  items: EnquiryItem[];
  count: number;
  isSelected: (productSlug: string) => boolean;
  addProduct: (product: Product, collectionTitle: string) => void;
  removeProduct: (productSlug: string) => void;
  clearAll: () => void;
};

export type EnquiryFormField = "name" | "email" | "phone" | "preferredDate" | "preferredTime" | "message";

export type ContactFormField = "name" | "email" | "preferredDate" | "preferredTime" | "message";

export type CollectionDefinition = {
  slug: string;
  title: string;
  category: Collection["category"];
  season: string;
  description: string;
  featured: boolean;
  order: number;
};

export type GeneratedProductDef = {
  key: string;
  category: Collection["category"];
  collectionSlug: string;
  folderSlug: string;
  slug: string;
  sku: string;
  title: string;
  description?: string;
  featured: boolean;
  order: number;
  imagePaths: readonly string[];
  primaryImagePath: string;
};

export type TransactionalEmailInput = {
  to: string;
  cc?: string[];
  replyTo: string;
  subject: string;
  html: string;
  idempotencyKey: string;
};

export type TransactionalEmailResult =
  | { ok: true; id: string | undefined }
  | { ok: false; status: 503 | 502; message: string };

export type ResendConfig = {
  apiKey: string;
  fromEmail: string;
};

export type EditorialEmailOptions = {
  title: string;
  preheader?: string;
  bodyHtml: string;
};

// ─── Component / provider props ──────────────────────────────────────────────

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

export type AppointmentDateTimePickerProps = {
  preferredDate: string;
  preferredTime: string;
  dateError?: string;
  timeError?: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onInteract?: () => void;
};

export type CategoryTilesProps = {
  categories: Category[];
};

export type CelebrityGridProps = {
  celebrities: Celebrity[];
  /** Uses a two-column mobile grid instead of the homepage carousel. */
  archive?: boolean;
  /** Section anchor id. */
  id?: string;
  /** When false, hides the View All CTA (full archive pages). Default true. */
  showViewAll?: boolean;
};

export type CollectionCardProps = {
  collection: Collection;
};

export type ProductCardProps = {
  product: Product;
  collectionTitle: string;
};

export type ProductGridProps = {
  products: Product[];
  collectionTitle: string;
};

export type AddToEnquiryButtonProps = {
  product: Product;
  collectionTitle: string;
  variant?: "card" | "detail";
  className?: string;
};

export type ProductGalleryProps = {
  gallery: ImageAsset[];
  title: string;
};

export type ProductInfoPanelProps = {
  product: Product;
  collectionTitle: string;
};

export type ProductDetailsAccordionProps = {
  product: Product;
  collectionTitle: string;
};

export type RelatedProductsProps = {
  products: Product[];
  collectionTitle: string;
};

export type EnquiryListProps = {
  className?: string;
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

export type HeroSliderProps = {
  slides: HeroSlide[];
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

export type LegalPageHeaderProps = {
  title: string;
  subtitle: string;
};

export type LegalDocumentProps = {
  intro?: string;
  sections: readonly LegalSection[];
  showToc?: boolean;
};

export type FaqListProps = {
  items: readonly FaqItem[];
};

export type SiteHeaderProps = {
  overlay?: boolean;
};

export type SiteLogoProps = {
  overlay?: boolean;
  className?: string;
};

export type WhatsAppButtonProps = {
  phone: string;
  defaultMessage: string;
};

export type ContactMapProps = {
  map: ContactInfo["map"];
};

export type AppProvidersProps = {
  children: ReactNode;
};
