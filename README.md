# Sahil Malik — Luxury Fashion Portfolio

A production-ready editorial website for **Sahil Malik**, luxury fashion designer. Built with Next.js 16 and shaped like a couture house digital experience: full-bleed imagery, restrained typography, animated navigation, and a **constants-driven content layer** so editors can update copy, seasons, and galleries without touching React components.

**Live site:** [sahilmalik.com](https://sahilmalik.com)  
**Source:** [github.com/FarukhSaifi/sahil-malik-store](https://github.com/FarukhSaifi/sahil-malik-store)

---

## Overview

This is a static-first marketing and portfolio site — not an e-commerce backend. Collections, couture seasons, lookbooks, and press are authored in TypeScript constant files, served through a thin data adapter, and pre-rendered at build time. Contact flows use client-side validation and a `mailto:` handoff; atelier details come from environment variables.

```
constants/*.ts  →  lib/data  →  Server Components  →  static HTML
.env.local      →  lib/contact.ts  →  Contact page / WhatsApp / mailto
```

---

## Site map

| Route | What visitors see |
| --- | --- |
| `/` | Hero slideshow, shop categories, couture spotlight, As Seen On, discover tiles, philosophy, press carousel, appointment CTA |
| `/collections` | Shop archive with category filters (`bridal`, `evening`, `menswear`, `saree`) |
| `/collections/[slug]` | Season story + image gallery |
| `/couture` | Paris Haute Couture archive |
| `/couture/[slug]` | Couture season detail |
| `/lookbook` | Editorial lookbook index |
| `/lookbook/[slug]` | Lookbook story + masonry gallery |
| `/press` | Press quotes and media coverage |
| `/about` | Brand story and atelier philosophy |
| `/contact` | Atelier info, validated inquiry form, appointment path |

All `[slug]` routes use `generateStaticParams` — new entries in constants are picked up on the next build.

---

## Key capabilities

**Navigation & shell**

- Sticky announcement bar + header that fades transparent over the homepage hero
- Desktop mega menus (Shop, Paris Haute Couture) with hover bridge and Framer Motion transitions
- Full-screen mobile menu (Radix Dialog sheet)
- Skip-to-content link, back-to-top, optional floating WhatsApp button

**Editorial UI**

- `CtaLink` / `CtaText` — animated underline CTAs (View All, Explore, Discover Now)
- `Button` variants: `default`, `outline`, `outlineInvert`, `ghost`
- `BookAppointmentLink` — shared appointment CTA in header and sections
- `Reveal` entrance animations with `prefers-reduced-motion` fallback
- Collection filter tabs and grid with layout transitions

**Forms**

- `ContactForm` — required-field and email validation, inline errors, disabled submit until valid
- Opens `mailto:` to `CONTACT_EMAIL` — no API route or database required

**SEO & performance**

- `buildMetadata()` — title, description, Open Graph, Twitter card, canonical URL per page
- Dynamic `sitemap.ts` (static + all collection/couture/lookbook slugs)
- `robots.ts`, AVIF/WebP images, blur placeholders, Unsplash remote patterns
- Cormorant Garamond + Inter via `next/font`, Turbopack dev/build caching, tree-shaken icon imports

**Tooling**

- ESLint 9 with enforced import order (`eslint-plugin-import-x`)
- Dependabot weekly npm updates (`.github/dependabot.yml`)
- Security disclosure policy (`.github/SECURITY.md`)

---

## Tech stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Framework  | Next.js 16 — App Router, Server Components, Turbopack             |
| UI         | React 19, TypeScript 5                                            |
| Styling    | Tailwind CSS v4 — `@theme` tokens in `app/globals.css`            |
| Motion     | Framer Motion                                                     |
| Primitives | Radix UI Dialog (sheet), class-variance-authority, tailwind-merge |
| Icons      | Lucide React                                                      |
| Images     | `next/image` + curated Unsplash IDs in `constants/images.ts`      |

---

## Quick start

**Requirements:** Node.js 20+, npm

```bash
git clone https://github.com/FarukhSaifi/sahil-malik-store.git
cd sahil-malik-store
npm install
cp .env.example .env.local
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

| Command         | Purpose                              |
| --------------- | ------------------------------------ |
| `npm run dev`   | Dev server (Turbopack)               |
| `npm run build` | Production build + static generation |
| `npm run start` | Serve production build               |
| `npm run lint`  | Run ESLint                           |

`package-lock.json` is gitignored — `npm install` creates one locally but it is never committed.

---

## Configuration

### Environment variables

Copy `.env.example` → `.env.local`. Mirror these in Vercel (Production + Preview).

| Variable                   | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| `CONTACT_EMAIL`            | Contact form inbox (`mailto:` target)                    |
| `CONTACT_PHONE`            | Phone on contact page                                    |
| `CONTACT_ADDRESS`          | Atelier address                                          |
| `CONTACT_HOURS`            | Hours text (default: `By appointment only`)              |
| `WHATSAPP_PHONE`           | WhatsApp floating button (falls back to `CONTACT_PHONE`) |
| `WHATSAPP_MESSAGE`         | Pre-filled WhatsApp message                              |
| `WHATSAPP_DEFAULT_MESSAGE` | Alias for `WHATSAPP_MESSAGE`                             |

Read server-side via `getContactInfo()` in `lib/contact.ts` (marked `server-only`).

### Site URL

Set `SITE.url` in `constants/site.ts` to your production domain. This drives canonical URLs, Open Graph links, and the sitemap.

---

## Project layout

```
app/
  page.tsx                    # Homepage (composes all homepage sections)
  layout.tsx                  # Root layout, fonts, chrome, footer
  globals.css                 # Design tokens, CTA/filter animations, utilities
  collections/ couture/ lookbook/   # Index + [slug] detail routes
  press/ about/ contact/
  sitemap.ts  robots.ts

components/
  layout/       site-chrome, site-header, desktop-nav, nav-dropdown,
                mobile-menu, announcement-bar, footer, whatsapp-button
  sections/     hero-slider, category-tiles, collection-filters/grid,
                contact-form, press-carousel, …
  cards/        collection-card, lookbook-tile, press-card
  ui/           button, cta-link, book-appointment-link, form-field,
                input, textarea, sheet, reveal, editorial-image, container
  providers/    hero-slideshow-provider

constants/      ← primary content source (see table below)
hooks/          useHeroOverlay, usePrefersReducedMotion
lib/
  data/         constants adapter + public getters
  contact.ts    env-based contact info
  seo.ts        metadata builder
  validation.ts form helpers
  animations/   shared motion variants
types/          shared TypeScript interfaces
.github/        dependabot.yml, SECURITY.md
```

---

## Editing content

All site copy and media references live in `constants/`. Components never hardcode seasons or nav labels — they call `lib/data` getters.

| File | What to edit |
| --- | --- |
| `site.ts` | Brand name, `SITE.url`, navigation, mega menus, footer links, page titles, form error copy, UI labels |
| `hero.ts` | Homepage slideshow slides |
| `categories.ts` | Shop category tiles (Evening, Bridal, Menswear, Saree) |
| `collections.ts` | Collection seasons — slug, category, gallery, featured flag |
| `couture.ts` | Haute couture seasons |
| `lookbook.ts` | Editorial lookbook entries |
| `press.ts` | Press quotes |
| `celebrities.ts` | As Seen On grid |
| `philosophy.ts` | Homepage philosophy block + About page copy |
| `discover.ts` | Discover More section tiles |
| `images.ts` | Unsplash photo IDs used across the site |

### Add a new collection season

1. Add an object to `COLLECTIONS` in `constants/collections.ts` with a unique `slug`, `category`, `coverImage`, and `gallery`.
2. Optionally set `featured: true` and `order` for homepage prominence.
3. Link it in `SITE.shopMenu.collections` inside `constants/site.ts` if it should appear in the Shop mega menu.
4. Run `npm run build` — the new `/collections/[slug]` page is generated automatically.

### Swap an image

Update the ID in `constants/images.ts`, or pass a new ID to `unsplash()` in the relevant constants file. Only `images.unsplash.com/photo-*` URLs are allowed (`next.config.ts`).

---

## Architecture notes

**Server vs client**

- Pages and most sections are Server Components — data is resolved at render/build time.
- Interactive pieces (`ContactForm`, `CollectionFilters`, `NavDropdown`, `HeroSlider`) are client components where state, URL search params, or motion are needed.

**Header overlay**

`HeroSlideshowProvider` + `useHeroOverlay` track whether the homepage hero is in view. When true, the announcement bar and header switch to an inverted overlay style.

**Data adapter**

`lib/data/adapters/constants-adapter.ts` centralizes filtering (category, featured, limit) and sorting. Swapping constants for a CMS later only requires changing the adapter — page components stay the same.

**Accessibility**

- Skip link, semantic landmarks, `sr-only` sheet title, `aria-describedby` on dialog content
- Form fields wired with `aria-invalid` and described-by error IDs
- Motion respects `prefers-reduced-motion`

---

## Deploy

**Vercel (recommended)**

1. Import the GitHub repo.
2. Framework: Next.js (auto-detected).
3. Add environment variables from `.env.example`.
4. Deploy — build command `npm run build`, output handled by Next.js.

Works on any Node.js 20+ host: `npm run build && npm run start`.

---

## Security & maintenance

- **Dependabot** opens weekly PRs for npm dependency updates.
- **Security reports** — use GitHub Private Vulnerability Reporting; see [`.github/SECURITY.md`](.github/SECURITY.md) for scope, timelines, and safe-harbor terms.

---

## License

Private project. All rights reserved.
