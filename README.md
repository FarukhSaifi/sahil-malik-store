# Sahil Malik — Luxury Fashion Portfolio

A production-ready editorial website for **Sahil Malik**, luxury fashion designer. Built with Next.js 16 and shaped like a couture house digital experience: full-bleed imagery, restrained typography, animated navigation, and a **constants-driven content layer** so editors can update copy, product lines, and galleries without touching React components.

**Live site:** [sahilmalik.com](https://sahilmalik.com)  
**Source:** [github.com/FarukhSaifi/sahil-malik-store](https://github.com/FarukhSaifi/sahil-malik-store)

---

## Overview

This is a static-first marketing and portfolio site — not an e-commerce backend. Product collections, couture seasons, and press are authored in TypeScript constant files, served through a thin data adapter, and pre-rendered at build time. Contact and product enquiry forms send transactional email via Resend; atelier details come from environment variables.

```
public/media/     →  generated/media-manifest.ts  →  constants/collections.ts
constants/*.ts  →  lib/data                     →  Server Components  →  static HTML
.env.local        →  lib/contact.ts + lib/email/  →  Contact / WhatsApp / Resend
```

**Convention:** Pages and components import **content** via `lib/data` getters and **configuration** (routes, labels, timing, image sizes) from `constants/`. Avoid hardcoding paths, copy, or magic numbers in components.

---

## Site map

| Route | What visitors see |
| --- | --- |
| `/` | Hero slideshow, category tiles, couture spotlight, As Seen On, discover tiles, philosophy, press carousel, appointment CTA |
| `/collections` | Product archive with category filters (`menswear`, `womenswear`) |
| `/collections/[slug]` | Collection story + product grid |
| `/products/[slug]` | Named product detail with “Add to enquiry” |
| `/enquiry` | Shortlist review + product enquiry form (Resend) |
| `/couture` | Paris Haute Couture archive |
| `/couture/[slug]` | Couture season detail |
| `/press` | Press quotes and media coverage |
| `/about` | Brand story, studio details, designer note, philosophy |
| `/contact` | Atelier info, validated inquiry form, appointment path |

All `[slug]` routes use `generateStaticParams` — new entries in constants are picked up on the next build.

### Product collections (current)

| Slug                         | Category   |
| ---------------------------- | ---------- |
| `sherwani`                   | Menswear   |
| `kurta-sets`                 | Menswear   |
| `suits`                      | Menswear   |
| `jawahar-jacket-set`         | Menswear   |
| `bandhgala-indo-western`     | Menswear   |
| `shirts`                     | Menswear   |
| `womenswear-stock-clearance` | Womenswear |

Product names and URLs are generated sequentially per collection, for example: `Sherwani Set 1` → `/products/sherwani-set-1`, `Kurta Set 1` → `/products/kurta-set-1`.

---

## Key capabilities

**Navigation & shell**

- Sticky announcement bar + header that fades transparent over the homepage hero
- Desktop mega menus (**Menswear**, **Womenswear**, Paris Haute Couture) with hover bridge and Framer Motion transitions
- Full-screen mobile menu (Radix Dialog sheet)
- Responsive logo (`SiteLogo`) with dark/light variants for hero overlay
- Skip-to-content link, back-to-top, optional floating WhatsApp button

**Editorial UI**

- `CtaLink` / `CtaText` — animated underline CTAs (View All, Explore, Discover Now)
- `Button` variants: `default`, `outline`, `outlineInvert`, `ghost`
- `BookAppointmentLink` — shared appointment CTA in header and sections
- `Reveal` entrance animations with `prefers-reduced-motion` and hydration-safe `useMounted` gating
- Collection filter tabs and grid with layout transitions

**Forms**

- `ContactForm` — appointment inquiries via `POST /api/contact` (Resend)
- `EnquiryForm` — product-led enquiries via `POST /api/enquiry` (Resend), includes selected pieces + images
- `EnquiryProvider` — client shortlist persisted in `localStorage` (`sahil-malik-enquiry-v1`)
- `EnquiryBar` — floating chip when shortlist has items → `/enquiry`

**SEO & performance**

- `rootMetadata` + `buildMetadata()` — favicon, app icons, Open Graph, Twitter cards, canonical URLs
- Per-page OG images on collection and couture detail routes
- Dynamic `sitemap.ts` driven by `SITEMAP_STATIC_ROUTES` and path helpers
- `robots.ts`, AVIF/WebP images, blur placeholders
- Local assets under `/media/`\* with long-lived `Cache-Control` headers
- `EditorialImage` as a Server Component (no client-side load state)
- Cormorant Garamond + Inter via `next/font`, Turbopack dev/build caching, tree-shaken icon imports

**Tooling & CI**

- ESLint 9 flat config with enforced import order, type-only imports, and duplicate-import checks
- GitHub Actions CI: lint, dependency audit (`high`), production build (`.github/workflows/ci.yml`)
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
| Images     | `next/image` + local files in `public/media/` via `localImage()`  |

Legacy Unsplash helpers remain in `constants/images.ts` for couture and celebrity placeholders.

---

## Quick start

**Requirements:** Node.js 24+ (LTS), npm

```bash
git clone https://github.com/FarukhSaifi/sahil-malik-store.git
cd sahil-malik-store
npm install
cp .env.example .env.local
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build + static generation |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run generate:media` | Regenerate `generated/media-manifest.ts` and `generated/product-catalog.generated.ts` from disk |
| `npm run normalize:media` | Dry-run media folder normalization (add `:apply` to execute) |

`package-lock.json` is gitignored — `npm install` creates one locally but it is never committed.

---

## Configuration

### Environment variables

Copy `.env.example` → `.env.local`. Mirror these in Vercel (Production + Preview).

| Variable                   | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `CONTACT_EMAIL`            | Contact form inbox + email shown on `/contact`               |
| `CONTACT_CC_EMAIL`         | Optional comma-separated CC list for `/api/contact`          |
| `ENQUIRY_EMAIL`            | Product enquiry form inbox (`/api/enquiry`)                  |
| `ENQUIRY_CC_EMAIL`         | Optional comma-separated CC list for `/api/enquiry`          |
| `CONTACT_PHONE`            | Phone on contact page                                        |
| `CONTACT_ADDRESS`          | Atelier address                                              |
| `CONTACT_HOURS`            | Hours text (default: `By appointment only`)                  |
| `WHATSAPP_PHONE`           | WhatsApp floating button (falls back to `CONTACT_PHONE`)     |
| `WHATSAPP_MESSAGE`         | Pre-filled WhatsApp message                                  |
| `WHATSAPP_DEFAULT_MESSAGE` | Alias for `WHATSAPP_MESSAGE`                                 |
| `RESEND_API_KEY`           | Resend API key for `/api/contact` and `/api/enquiry`         |
| `RESEND_FROM_EMAIL`        | Verified sender, e.g. `Sahil Malik <contact@sahilmalik.com>` |

Read server-side via `getContactInfo()` in `lib/contact.ts` (marked `server-only`).

### Site URL

Set `SITE.url` in `constants/site.ts` to your production domain. This drives canonical URLs, Open Graph links, and the sitemap.

---

## Project layout

```
app/
  layout.tsx, providers.tsx, globals.css   ← root shell + client providers
  (site)/          ← marketing + catalog routes (URLs unchanged)
    page.tsx, about/, collections/, products/, couture/, contact/, press/, enquiry/
  (legal)/         ← faq/, policies/, privacy/, terms/
  api/contact/ + api/enquiry/  ← Resend route handlers
  sitemap.ts, robots.ts, not-found.tsx

components/     layout/, sections/, cards/, enquiry/, products/, ui/
context/        enquiry-provider, hero-slideshow-provider (client state)
constants/      hand-authored content + site configuration
generated/      build output from `npm run generate:media` (do not edit)
hooks/          useHeroOverlay, useMounted, usePrefersReducedMotion
lib/
  data/         constants adapter + public getters
  catalog/      product catalog types + helpers
  email/        transactional email templates
  contact.ts, seo.ts, validation.ts, animations/
types/          index.ts (all shared types / interfaces)
public/media/   brand assets + menswear/womenswear product photography
.github/        workflows/ci.yml, dependabot.yml, SECURITY.md
```

---

## Constants reference

All site copy, media references, routes, and tunable UI values live in `constants/`. Components should not hardcode paths, animation timings, or image `sizes` strings — use the modules below.

### Content (edit for copy & catalog)

| File | What to edit |
| --- | --- |
| `site.ts` | Brand name, `SITE.url`, navigation, mega menus, footer links, page titles, UI labels, a11y strings, homepage limits |
| `hero.ts` | Homepage slideshow slides |
| `categories.ts` | Homepage category tiles (derived from featured collections) |
| `collections.ts` | Product line metadata — slug, category, description, featured flag |
| `products.ts` | Builds runtime `Product[]` from generated catalog |
| `couture.ts` | Haute couture seasons |
| `press.ts` | Press quotes |
| `celebrities.ts` | As Seen On grid |
| `philosophy.ts` | Homepage philosophy block, About page copy, `ABOUT_HERO` image |
| `discover.ts` | Discover More section tiles |

### Configuration (edit for behavior & consistency)

| File        | What to edit                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `routes.ts` | `ROUTES`, `collectionPath()`, `couturePath()`, `collectionsCategoryPath()`, sitemap static routes |
| `layout.ts` | Scroll thresholds, image quality, `IMAGE_SIZES`, motion layout IDs, sitemap priorities            |
| `timing.ts` | Hero interval, animation durations, reveal stagger multipliers                                    |
| `images.ts` | `BRAND` assets, `localImage()` / `galleryFromPaths()`, Unsplash helpers                           |

### Import conventions

```ts
// Content — use lib/data in pages/sections
import { getCollections } from "@/lib/data";

// Configuration — import directly from constants
import { SITE } from "@/constants/site";
import { collectionPath } from "@/constants/routes";
import { IMAGE_SIZES } from "@/constants/layout";
import { TIMING } from "@/constants/timing";
```

`constants/site.ts` re-exports `ROUTES` and path helpers for convenience (`SITE.routes`, etc.).

### Generated (not in `constants/`)

| Path                                     | What to edit                                  |
| ---------------------------------------- | --------------------------------------------- |
| `generated/media-manifest.ts`            | Auto-generated — run `npm run generate:media` |
| `generated/product-catalog.generated.ts` | Auto-generated — run `npm run generate:media` |

---

## Editing content

### Folder-based product catalog

Products are discovered from disk — **one folder = one product**. Collections remain authored in `constants/collections.ts`.

**Media layout**

```
# Menswear
public/media/menswear/{collection}/set-{n}/*.jpg

# Womenswear — sets sit directly under the category (no extra collection folder)
public/media/womenswear/set-{n}/*.jpg
```

- **Product folder** — use sequential names (`set-1/`, `set-2/`, …); all images in the folder become that product's gallery.

**Workflow**

1. Create a folder under the collection and add images.
2. Run `npm run generate:media` — refreshes `generated/media-manifest.ts` and `generated/product-catalog.generated.ts`.
3. Run `npm run build`.

**Auto-generated product metadata:** slug and title come from the collection and set number (e.g. "Sherwani Set 1", `sherwani-set-1`); SKU is assigned as `SM-{ABBREV}-{NNN}` per collection.

**Sherwani example**

```
menswear/sherwani/set-1/dsc-0140-copy.jpg
menswear/sherwani/set-1/dsc-0143-copy.jpg
```

### Add a new product collection

1. Add product folders under `public/media/menswear/{collection-slug}/` (or `public/media/womenswear/` for womenswear sets).
2. Run `npm run generate:media`.
3. Add a `COLLECTION_DEFS` entry in `constants/collections.ts` (title, category, description, `featured`, `order`).
4. Link it in `SITE.menswearMenu` or `SITE.womenswearMenu` inside `constants/site.ts` if it should appear in navigation.
5. Run `npm run build` — `/collections/[slug]` and `/products/[slug]` pages are generated automatically.

### Add a product to an existing collection

1. Create `public/media/menswear/{collection}/set-{n}/` (or `public/media/womenswear/set-{n}/`) and add images.
2. Run `npm run generate:media` and `npm run build`.

**SKU codes:** `SM-{ABBREV}-{NNN}` — Sherwani `SH`, Kurta Sets `KS`, Suits `SU`, Jawahar `JJ`, Bandhgala `BI`, Shirts `ST`, Womenswear Clearance `WC`.

### Update About page copy

Edit `ABOUT` and related exports in `constants/philosophy.ts`. The About page layout lives in `app/about/page.tsx` but all text comes from constants.

### Swap brand assets

Replace files under `public/media/brand/` and update paths in `BRAND` inside `constants/images.ts` if filenames change. Favicon and OG image are wired through `lib/seo.ts` (`rootMetadata`, `siteIcons`).

### Swap a collection image

Run `npm run generate:media` after adding or renaming files on disk. Cover image is the first manifest entry for each collection.

---

## Architecture notes

**Server vs client**

- Pages and most sections are Server Components — data is resolved at render/build time.
- Interactive pieces (`ContactForm`, `CollectionFilters`, `NavDropdown`, `HeroSlider`) are client components where state, URL search params, or motion are needed.

**Header overlay**

`HeroSlideshowProvider` + `useHeroOverlay` track whether the homepage hero is in view. `useMounted` defers overlay-dependent styles until after hydration to avoid React mismatch warnings.

**Data adapter**

`lib/data/adapters/constants-adapter.ts` centralizes filtering (category, featured, limit) and sorting. Swapping constants for a CMS later only requires changing the adapter — page components stay the same.

**Accessibility**

- Skip link, semantic landmarks, `sr-only` sheet title, localized a11y strings in `SITE.a11y`
- Form fields wired with `aria-invalid` and described-by error IDs
- Motion respects `prefers-reduced-motion`; animations gated with `useMounted` on first paint

---

## ESLint

Flat config in `eslint.config.mjs` extends `eslint-config-next` (core-web-vitals + TypeScript) and adds `eslint-plugin-import-x`.

**Import order** (enforced with blank lines between groups):

1. React / Next.js
2. External packages
3. `@/constants/`\*\*
4. `@/types/**`
5. `@/lib/**`
6. `@/hooks/**`
7. `@/components/**`
8. Relative imports

**Additional rules**

- `import-x/no-duplicates` — merge duplicate imports from the same module
- `@typescript-eslint/consistent-type-imports` — use `import type` for type-only imports
- `@typescript-eslint/no-import-type-side-effects` — no runtime side effects from type imports
- `eqeqeq`, `prefer-const`, `no-console` (warn; `console.warn` / `console.error` allowed)

Run `npm run lint:fix` to auto-fix import order and type-import style where possible.

---

## Deploy

**Vercel (recommended)**

1. Import the GitHub repo.
2. Framework: Next.js (auto-detected).
3. Add environment variables from `.env.example`.
4. Deploy — build command `npm run build`, output handled by Next.js.

Works on any Node.js 24+ host: `npm run build && npm run start`.

---

## Security & maintenance

- **CI** runs ESLint, `npm audit --audit-level=high`, and a production build on every push/PR to `main`/`master`.
- **Dependabot** opens weekly PRs for npm dependency updates.
- **Security reports** — use GitHub Private Vulnerability Reporting; see `[.github/SECURITY.md](.github/SECURITY.md)` for scope, timelines, and safe-harbor terms.

---

## License

Private project. All rights reserved.
