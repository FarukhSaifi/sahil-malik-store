export const LAYOUT = {
  backToTopScrollThreshold: 600,
  heroOverlayThresholdRatio: 0.65,
  announcementRepeatCount: 4,
  collectionGalleryPriorityCount: 2,
} as const;

export const IMAGE_QUALITY = {
  default: 75,
  priority: 85,
} as const;

export const IMAGE_SIZES = {
  logo: "(max-width: 640px) 140px, 180px",
  aboutHero: "(max-width: 1024px) 100vw, 42vw",
  collectionGallery: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw",
  editorialDefault: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  featuredCollection: "(max-width: 640px) 100vw, 50vw",
  categoryTile: "(max-width: 640px) 50vw, 25vw",
  celebrity: "(max-width: 640px) 42vw, (max-width: 1024px) 33vw, 16vw",
  discoverMore: "(max-width: 640px) 100vw, 33vw",
  hero: "100vw",
  detailHero: "100vw",
  galleryThreeCol: "(max-width: 768px) 100vw, 33vw",
  coutureListing: "(max-width: 1024px) 100vw, 50vw",
} as const;

export const MOTION_LAYOUT_IDS = {
  collectionFilterUnderline: "collection-filter-underline",
} as const;

export const SITEMAP = {
  staticChangeFrequency: "weekly" as const,
  dynamicChangeFrequency: "monthly" as const,
  homePriority: 1,
  staticPriority: 0.8,
  detailPriority: 0.7,
} as const;
