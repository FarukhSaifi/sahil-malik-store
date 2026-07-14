<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Agent instructions

Project rules live in `.cursor/rules/`. Read matching rules before editing files in those areas.

## Architecture

```
app/(site)/ + app/(legal)/  →  pages (Server Components)
components/                 →  UI only
context/                    →  client React context (enquiry, hero slideshow)
constants/                  →  hand-authored content + site config
generated/                  →  auto-generated catalog (do not edit)
lib/data/                   →  adapter + getters for pages
```

## Quick reference

- Import content via `lib/data`, config via `constants/`.
- **Types/interfaces** → `types/index.ts` only (not split files, not `constants/`, not components, not an `interfaces/` folder).
- **Static copy, routes, labels, content arrays** → `constants/*.ts`.
- **Generated catalog** → `generated/`.
- Providers: `app/providers.tsx` wraps `context/*`.
- After media changes: `npm run generate:media` then `npm run build`.
- ESLint import order is strict — run `npm run lint:fix` after moving imports.

See `README.md` for full constants table and media workflow.
