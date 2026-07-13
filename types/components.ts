import type {
  Category,
  Celebrity,
  Collection,
  CoutureSeason,
  CtaLink,
  DiscoverItem,
  FaqItem,
  HeroSlide,
  ImageAsset,
  LegalSection,
  PressItem,
  Product,
} from "@/types/data";
import type * as React from "react";
import type { ReactNode } from "react";

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
