export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==";

export const ROUTES = {
  home: "/",
  collections: "/collections",
  couture: "/couture",
  contact: "/contact",
  lookbook: "/lookbook",
  press: "/press",
  about: "/about",
} as const;

export const UI = {
  discoverNow: "Discover Now",
  viewAll: "View All",
  explore: "Explore",
  bookAppointment: "Book an Appointment",
  menu: "Menu",
  related: "Related",
  sendInquiry: "Send Inquiry",
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
  goToSlide: (index: number) => `Go to slide ${index}`,
} as const;

export const SITE = {
  name: "Sahil Malik",
  tagline: "Luxury Fashion Designer",
  url: "https://sahilmalik.com",
  announcement: "Special prices live now",
  heroPromo: "Special Prices",
  heroQuote: "We don't simply fall in love, we become it.",
  heroAttribution: "— Sahil Malik, Becoming Love",
  meta: {
    homeDescription:
      "Sahil Malik — luxury fashion designer. Discover couture collections, festive wear, bridal, menswear, and editorial lookbooks.",
  },
  routes: ROUTES,
  ui: UI,
  a11y: A11Y,
  nav: [
    { key: "shop", label: "Shop", href: ROUTES.collections, mega: "shop" },
    { key: "couture", label: "Paris Haute Couture", href: ROUTES.couture, mega: "couture" },
    { key: "findUs", label: "Find Us", href: ROUTES.contact },
    { key: "lookbook", label: "Lookbook", href: ROUTES.lookbook },
  ],
  navSecondary: [
    { key: "press", label: "Press", href: ROUTES.press },
    { key: "about", label: "About", href: ROUTES.about },
  ],
  navMegaKeys: ["shop", "couture"] as const,
  shopMenu: {
    headings: {
      women: "Women",
      men: "Men",
      collections: "Collections",
      trending: "Trending",
    },
    women: [
      { label: "Lehenga", href: "/collections?category=bridal" },
      { label: "Saree", href: "/collections?category=saree" },
      { label: "Gown", href: "/collections?category=evening" },
      { label: "Dress", href: "/collections?category=evening" },
    ],
    men: [
      { label: "Sherwani", href: "/collections?category=menswear" },
      { label: "Bandhgala", href: "/collections?category=menswear" },
      { label: "Kurta Set", href: "/collections?category=menswear" },
    ],
    collections: [
      { label: "Raas — Spring Summer '26", href: "/collections/raas-spring-summer-26" },
      { label: "Becoming Love — Festive '25", href: "/collections/becoming-love-festive-25" },
      { label: "Amrita — Festive '24", href: "/collections/amrita-festive-24" },
      { label: "Nargis — Festive '24", href: "/collections/nargis-festive-24" },
    ],
    trending: [
      { label: "Bride's Edit", href: "/collections?category=bridal" },
      { label: "Festive Couture", href: ROUTES.collections },
      { label: "Groom's Edit", href: "/collections?category=menswear" },
    ],
  },
  coutureMenu: [
    { label: "Alchemy — Spring '26", href: "/couture/alchemy-spring-2026" },
    { label: "Becoming Love — Fall '25", href: "/couture/becoming-love-fall-2025" },
    { label: "Aura — Fall '24", href: "/couture/aura-fall-2024" },
  ],
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
      subtitle: "Seasonal",
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
      metaDescription: "The Sahil Malik atelier — philosophy, craft, and conscious luxury.",
      subtitle: "Our Story",
    },
    contact: {
      metaTitle: "Contact & Appointments",
      metaDescription: "Book an appointment at the Sahil Malik atelier.",
      title: UI.bookAppointment,
      subtitle: "The Couture Experience",
    },
    collections: {
      metaTitle: "Collections",
      metaDescription: "Explore Sahil Malik collections — evening wear, bridal, menswear, and saree.",
      title: "Collections",
      subtitle: "All Seasons",
      filters: [
        { label: "All", value: undefined },
        { label: "Evening", value: "evening" },
        { label: "Bridal", value: "bridal" },
        { label: "Menswear", value: "menswear" },
        { label: "Saree", value: "saree" },
      ],
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
      { label: "Our Policies", href: ROUTES.about },
      { label: "Terms of Service", href: ROUTES.about },
      { label: "Privacy Policy", href: ROUTES.about },
      { label: "FAQs", href: ROUTES.contact },
    ],
    info: [
      { label: "About Us", href: ROUTES.about },
      { label: "Contact Us", href: ROUTES.contact },
      { label: "Find Us", href: ROUTES.contact },
    ],
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  socialLinks: [
    { key: "instagram", label: "Instagram", href: "https://instagram.com" },
    { key: "facebook", label: "Facebook", href: "https://facebook.com" },
  ],
  copyright: "© 2026 Sahil Malik. All rights reserved.",
} as const;

const LEFT_NAV_KEYS = new Set(["shop", "couture"]);
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
