# Sahil Malik — Luxury Fashion Portfolio

Editorial portfolio website for **Sahil Malik**, a luxury fashion designer. The experience is inspired by high-end fashion houses — full-bleed imagery, couture storytelling, and a content-driven architecture built for easy updates without touching layout code.

**Live repo:** [github.com/FarukhSaifi/sahil-malik-store](https://github.com/FarukhSaifi/sahil-malik-store)

---

## Features

- **Homepage** — hero slideshow, category tiles, couture showcase, celebrity grid, discover more, philosophy block, press carousel, and appointment CTA
- **Collections** — filterable listing and season detail pages with galleries
- **Paris Haute Couture** — archive and season detail routes
- **Lookbook** — editorial photo stories with masonry galleries
- **Press, About & Contact** — brand story, media coverage, and appointment inquiry form
- **Responsive shell** — sticky announcement bar, scroll-aware transparent header on home, mega menus, and mobile drawer navigation
- **SEO** — metadata, sitemap, robots.txt, and static generation for detail routes
- **Performance** — optimized images, font preloading, lazy loading, and reduced-motion support

---

## Tech Stack

| Layer     | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language  | TypeScript                                               |
| Styling   | Tailwind CSS v4 (`@theme` tokens)                        |
| Animation | Framer Motion                                            |
| UI        | Radix UI + shadcn-style primitives                       |
| Fonts     | Cormorant Garamond + Inter via `next/font`               |
| Images    | `next/image` with Unsplash remote patterns               |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
git clone https://github.com/FarukhSaifi/sahil-malik-store.git
cd sahil-malik-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

---

## Project Structure

```
app/                    # Routes (App Router)
  collections/          # Shop / collections listing + [slug]
  couture/              # Paris Haute Couture + [slug]
  lookbook/             # Editorial lookbooks + [slug]
  press/ about/ contact/
components/
  layout/               # Header, footer, announcement bar, nav
  sections/             # Homepage & page sections
  ui/                   # Shared primitives (Button, Sheet, Image…)
constants/              # All static site content (edit here)
lib/
  data/                 # Types + constants adapter
hooks/                  # useHeroOverlay, usePrefersReducedMotion
```

---

## Content Management

All copy, navigation, and sample data live in `constants/`:

| File             | Contents                                                  |
| ---------------- | --------------------------------------------------------- |
| `site.ts`        | Brand name, nav, footer, UI labels, page metadata, routes |
| `hero.ts`        | Hero slideshow slides                                     |
| `categories.ts`  | Evening, Bridal, Menswear, Saree tiles                    |
| `collections.ts` | Season collections                                        |
| `couture.ts`     | Couture seasons                                           |
| `lookbook.ts`    | Lookbook stories                                          |
| `press.ts`       | Press quotes                                              |
| `celebrities.ts` | As Seen On grid                                           |
| `philosophy.ts`  | About & philosophy copy                                   |
| `discover.ts`    | Discover More tiles                                       |
| `images.ts`      | Verified Unsplash image IDs                               |

Update content in these files — components read from `lib/data` and require no layout changes.

---

## Environment

No environment variables are required for local development. The contact form uses a `mailto:` link configured in `constants/site.ts`.

For production, set `SITE.url` in `constants/site.ts` to your deployed domain so sitemap and metadata URLs are correct.

---

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended for Next.js):

1. Import the GitHub repository
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Deploy

Alternatively, any Node.js host that supports Next.js 16 will work with `npm run build && npm run start`.

---

---

## License

Private project. All rights reserved.
