export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==";

import { collectionPath, collectionsCategoryPath, couturePath, ROUTES } from "@/constants/routes";

export {
  collectionPath,
  collectionsCategoryPath,
  collectionSubCategoryPath,
  couturePath,
  lookbookPath,
  productPath,
  ROUTES,
  SITEMAP_STATIC_ROUTES,
} from "@/constants/routes";

export const UI = {
  discoverNow: "Discover Now",
  viewAll: "View All",
  explore: "Explore",
  bookAppointment: "Book an Appointment",
  menu: "Menu",
  related: "Related",
  sendInquiry: "Send Inquiry",
  addToEnquiry: "Add to Enquiry",
  addedToEnquiry: "Added",
  removeFromEnquiry: "Remove",
  viewEnquiry: "Review Enquiry",
  browseCollections: "Browse Collections",
  skipToContent: "Skip to content",
} as const;

export const A11Y = {
  openMenu: "Open menu",
  openNavigation: "Open navigation",
  search: "Search",
  pauseSlideshow: "Pause slideshow",
  playSlideshow: "Play slideshow",
  backToTop: "Back to top",
  whatsapp: "Chat with us on WhatsApp",
  whatsappLabel: "WhatsApp",
  close: "Close",
  navigationMenu: "Navigation Menu",
  home: (name: string) => `${name} — Home`,
  goToSlide: (index: number) => `Go to slide ${index}`,
  previousGalleryImage: "Previous image",
  nextGalleryImage: "Next image",
  viewGalleryImage: (index: number, total: number) => `View image ${index} of ${total}`,
  addToEnquiry: (title: string) => `Add ${title} to enquiry`,
  removeFromEnquiry: (title: string) => `Remove ${title} from enquiry`,
  enquiryPieces: (count: number) => `${count} piece${count === 1 ? "" : "s"} selected`,
} as const;

const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/sahilmalikcouture",
  facebook: "https://www.facebook.com/sahilmalikcouture",
} as const;

export const SITE = {
  name: "Sahil Malik",
  tagline: "Luxury Fashion Designer",
  url: "https://sahilmalik.com",
  announcement: "Special prices live now",
  heroPromo: "Special Prices",
  meta: {
    homeDescription:
      "Sahil Malik — luxury fashion designer. Discover sherwanis, kurta sets, suits, bandhgalas, and womenswear from the atelier.",
  },
  routes: ROUTES,
  ui: UI,
  a11y: A11Y,
  nav: [
    { key: "menswear", label: "Menswear", href: collectionsCategoryPath("menswear"), mega: "menswear" },
    { key: "womenswear", label: "Womenswear", href: collectionsCategoryPath("womenswear"), mega: "womenswear" },
    { key: "couture", label: "Paris Haute Couture", href: ROUTES.couture, mega: "couture" },
    // { key: "findUs", label: "Find Us", href: ROUTES.contact },
    { key: "lookbook", label: "Lookbook", href: ROUTES.lookbook },
  ],
  navSecondary: [
    { key: "press", label: "Press", href: ROUTES.press },
    { key: "about", label: "About", href: ROUTES.about },
  ],
  navMegaKeys: ["menswear", "womenswear", "couture"] as const,
  menswearMenu: [
    { label: "Sherwani", href: collectionPath("sherwani") },
    { label: "Kurta Sets", href: collectionPath("kurta-sets") },
    { label: "Suits", href: collectionPath("suits") },
    { label: "Jawahar Jacket Set", href: collectionPath("jawahar-jacket-set") },
    { label: "Bandhgala & Indo-Western", href: collectionPath("bandhgala-indo-western") },
    { label: "Shirts", href: collectionPath("shirts") },
  ],
  womenswearMenu: [{ label: "Stock Clearance", href: collectionPath("womenswear-stock-clearance") }],
  coutureMenu: [
    { label: "Alchemy — Spring '26", href: couturePath("alchemy-spring-2026") },
    { label: "Becoming Love — Fall '25", href: couturePath("becoming-love-fall-2025") },
    { label: "Aura — Fall '24", href: couturePath("aura-fall-2024") },
  ],
  homepage: {
    featuredCoutureLimit: 2,
    pressLimit: 6,
  },
  sections: {
    asSeenOn: {
      title: "As Seen On",
      href: ROUTES.press,
    },
    discoverMore: {
      title: "Discover More",
    },
    collections: {
      title: "Collections",
      subtitle: "Product Lines",
      href: ROUTES.collections,
    },
    appointment: {
      eyebrow: "The Couture Experience",
      title: "The Couture Experience",
      body: "At the Sahil Malik atelier, purpose shapes process through hand embroidery, weaving, and artisanal craft. Rooted in the philosophy of Environment, Employment, and Empowerment, each creation sustains craft communities and celebrates conscious luxury.",
      cta: { label: UI.bookAppointment, href: ROUTES.contact },
    },
    press: {
      title: "Press",
    },
  },
  pages: {
    about: {
      metaTitle: "About",
      metaDescription:
        "Discover Sahil Malik Couture — from NIFT to Shahpur Jat, a journey of heritage craftsmanship and contemporary menswear.",
      subtitle: "Our Story",
      ogImageAlt: "Sahil Malik Couture — Shahpur Jat atelier",
    },
    contact: {
      metaTitle: "Contact & Appointments",
      metaDescription: "Book an appointment at the Sahil Malik atelier.",
      title: UI.bookAppointment,
      subtitle: "The Couture Experience",
    },
    collections: {
      metaTitle: "Collections",
      metaDescription:
        "Explore Sahil Malik menswear and womenswear — sherwanis, kurta sets, suits, bandhgalas, shirts, and more.",
      title: "Collections",
      subtitle: "Menswear & Womenswear",
      filters: [
        { label: "All", value: undefined },
        { label: "Menswear", value: "menswear" },
        { label: "Womenswear", value: "womenswear" },
      ],
      relatedLimit: 3,
    },
    couture: {
      metaTitle: "Couture",
      metaDescription: "Paris Haute Couture collections by Sahil Malik.",
      title: "Paris Haute Couture",
      subtitle: "Archive",
      detailMetaSuffix: "Couture",
    },
    lookbook: {
      metaTitle: "Lookbook",
      metaDescription: "Editorial lookbooks and photo stories by Sahil Malik.",
      title: "Lookbook",
      subtitle: "Editorial",
      detailMetaSuffix: "Lookbook",
    },
    press: {
      metaTitle: "Press",
      metaDescription: "Press coverage and editorial features on Sahil Malik.",
      title: "Press",
      subtitle: "In the media",
    },
    policies: {
      metaTitle: "Our Policies",
      metaDescription:
        "Order, payment, shipping, and exchange policies for Sahil Malik Couture — crafted with exceptional attention to detail.",
      title: "Our Policies",
      subtitle: "Client Care",
      ogImageAlt: "Sahil Malik Couture — Our Policies",
    },
    terms: {
      metaTitle: "Terms of Service",
      metaDescription: "Terms of Service for Sahil Malik Couture website, orders, and bespoke services.",
      title: "Terms of Service",
      subtitle: "Legal",
      ogImageAlt: "Sahil Malik Couture — Terms of Service",
    },
    privacy: {
      metaTitle: "Privacy Policy",
      metaDescription: "How Sahil Malik Couture collects, uses, and protects your personal information.",
      title: "Privacy Policy",
      subtitle: "Your Data",
      ogImageAlt: "Sahil Malik Couture — Privacy Policy",
    },
    faq: {
      metaTitle: "FAQs",
      metaDescription:
        "Frequently asked questions about orders, bespoke services, shipping, payments, and appointments at Sahil Malik Couture.",
      title: "Frequently Asked Questions",
      subtitle: "Support",
    },
    enquiry: {
      metaTitle: "Product Enquiry",
      metaDescription: "Review your selected Sahil Malik Couture pieces and send an enquiry to the atelier.",
      title: "Product Enquiry",
      subtitle: "Your Selection",
      ogImageAlt: "Sahil Malik Couture — Product Enquiry",
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      description: "The page you are looking for does not exist or has been moved.",
      cta: "Return Home",
    },
  },
  form: {
    labels: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    errors: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email address",
      messageRequired: "Message is required",
    },
    submitLabel: UI.sendInquiry,
    mailtoSubject: (name: string) => `Appointment Inquiry from ${name}`,
    mailtoBody: (name: string, email: string, message: string) =>
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  },
  contact: {
    storeTitle: "Flagship Store - Shahpur Jat, New Delhi",
    address: "253, Ground Floor, Opposite Govindam Sweets, Shahpur Jat, New Delhi 110049.",
    phone: "+91 99992 70640",
    email: "atelier@sahilmalik.com",
    map: {
      query: "Sahil Malik Couture, 253, Ground Floor, Opposite Govindam Sweets, Shahpur Jat, New Delhi 110049",
      title: "Sahil Malik Couture atelier on Google Maps",
      openLabel: "Open in Maps",
    },
    headings: {
      atelier: "Atelier",
      hours: "Hours",
      email: "Email",
      phone: "Phone",
    },
  },
  footer: {
    headings: {
      support: "Support",
      info: "Info",
      followUs: "Follow Us",
    },
    support: [
      { label: "Our Policies", href: ROUTES.policies },
      { label: "Terms of Service", href: ROUTES.terms },
      { label: "Privacy Policy", href: ROUTES.privacy },
      { label: "FAQs", href: ROUTES.faq },
    ],
    info: [
      { label: "About Us", href: ROUTES.about },
      { label: "Contact Us", href: ROUTES.contact },
      // { label: "Find Us", href: ROUTES.contact },
    ],
  },
  socialLinks: [
    { key: "instagram", label: "Instagram", href: SOCIAL_URLS.instagram },
    { key: "facebook", label: "Facebook", href: SOCIAL_URLS.facebook },
  ],
  copyright: "© 2026 Sahil Malik. All rights reserved.",
  product: {
    styleCodeLabel: "Style Code",
    madeToOrder: "Made to order: 8–10 weeks",
    customisePrompt: "Want to customise your outfit?",
    customiseCta: "Book an appointment",
    viewEnquiry: "Review your enquiry",
    relatedTitle: "You May Also Like",
    galleryCounter: (current: number, total: number) => `${current} / ${total}`,
    sections: {
      productDetails: "Product Details",
      shipping: "Shipping, Packaging & Returns",
      disclaimer: "Disclaimer",
    },
    shippingItems: [
      "Complimentary shipping within India on confirmed orders.",
      "International deliveries — shipping calculated at enquiry.",
      "Bespoke and made-to-order pieces require additional production time.",
    ],
    disclaimer:
      "Subtle variations in product colours may occur due to lighting and screen settings. For bespoke customisations or assistance, kindly reach us through our contact page.",
    policiesLink: "View policies",
  },
  enquiry: {
    maxItems: 20,
    storageKey: "sahil-malik-enquiry-v1",
    barLabel: (count: number) =>
      count === 1 ? "1 piece selected · Review enquiry" : `${count} pieces selected · Review enquiry`,
    emptyTitle: "No pieces selected",
    emptyDescription: "Browse our collections and add pieces to your enquiry shortlist.",
    emptyCta: "Browse Collections",
    pageTitle: "Your Enquiry",
    pageSubtitle: "Selected Pieces",
    metaTitle: "Enquiry",
    metaDescription: "Review your selected Sahil Malik pieces and send an enquiry to the atelier.",
    selectedHeading: "Selected Pieces",
    formHeading: "Send Enquiry",
    formDescription: "Share your details and our atelier team will respond shortly.",
    submitLabel: "Send Enquiry",
    submitSuccess: "Thank you — your enquiry has been sent.",
    submitError: "Something went wrong. Please try again or contact us directly.",
    productSummaryLabel: "Pieces in this enquiry",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
    },
    errors: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email address",
      messageRequired: "Message is required",
      noProducts: "Add at least one piece to your enquiry",
      maxProducts: "You can select up to 20 pieces",
    },
    lookbookHeading: "Full Lookbook",
    allSubCategories: "All",
  },
} as const;

const LEFT_NAV_KEYS = new Set(["menswear", "womenswear", "couture"]);
const MEGA_NAV_KEYS = new Set(SITE.navMegaKeys);

export function getNavBySide(side: "left" | "right") {
  return SITE.nav.filter((item) => (side === "left" ? LEFT_NAV_KEYS.has(item.key) : !LEFT_NAV_KEYS.has(item.key)));
}

export function getNavDrawerItems() {
  return SITE.nav.filter((item) => !MEGA_NAV_KEYS.has(item.key as (typeof SITE.navMegaKeys)[number]));
}

export function getNavMegaItem(key: (typeof SITE.navMegaKeys)[number]) {
  return SITE.nav.find((item) => item.key === key)!;
}
