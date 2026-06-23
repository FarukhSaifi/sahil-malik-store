import { BRAND, localImage } from "./images";
import { ROUTES } from "./routes";

export const PHILOSOPHY = {
  title: "Empowering Craft Communities",
  subtitle: "ASAP — As Slow As Possible",
  body: `At the Sahil Malik atelier, "ASAP" — As Slow As Possible — is a philosophy where luxury is shaped by care, craft, and time.

Through purpose-led processes and collective participation, every creation empowers Indian craft communities and carries the soul of many hands.`,
  cta: { label: "Discover More", href: ROUTES.about },
} as const;

export const ABOUT_HERO_ALT = "Sahil Malik in Shahpur Jat couture studio";

export const ABOUT_HERO = localImage(BRAND.aboutHero, {
  width: 1200,
  height: 1500,
  alt: ABOUT_HERO_ALT,
  priority: true,
});

export const ABOUT = {
  title: "About Us",
  quote: "Some journeys take you across the world. The most meaningful ones bring you back to yourself.",
  intro:
    "Sahil Malik Couture is the culmination of a journey shaped by ambition, reinvention, and a deep appreciation for craftsmanship.",
  story: [
    "Before establishing his eponymous label, Sahil Malik built a successful corporate career, working with global organizations including Amazon, serving as a Spanish language mentor, and working across international markets such as Spain. While these experiences broadened his perspective, they also reaffirmed his passion for design and creativity.",
    "This calling led him to the National Institute of Fashion Technology (NIFT), New Delhi, where he refined his creative vision and laid the foundation for Sahil Malik Couture.",
    "Today, the label reinterprets India's rich artisanal heritage through contemporary menswear. Defined by intricate hand embroidery, luxurious fabrics, and refined silhouettes, each creation is crafted with meticulous attention to detail and a deep respect for traditional craftsmanship.",
    "From bespoke ensembles to couture collections, Sahil Malik Couture creates timeless garments for men who value authenticity, elegance, and enduring style.",
  ],
  studio: {
    label: "The Couture Studio",
    title: "Shahpur Jat, New Delhi",
    body: "In August 2025, the brand opened its couture studio in the heart of Shahpur Jat — a space where craftsmanship, couture, and personalized experiences come together.",
  },
  tagline: "Where heritage inspires, craftsmanship endures, and modern luxury comes to life.",
  designerNote: {
    label: "Designer's Note",
    body: `My journey into fashion wasn't conventional. Years spent building a career in business, working across international markets, and as a Spanish language mentor taught me discipline, precision, and the value of a clear vision. Yet, creativity remained the constant thread throughout. Pursuing fashion at NIFT and founding Sahil Malik Couture allowed me to transform that passion into purpose. Every collection is an extension of this journey — bringing together heritage craftsmanship, contemporary design, and a commitment to creating garments that stand the test of time.`,
    attribution: "— Sahil Malik",
  },
  philosophy: PHILOSOPHY,
} as const;
