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

## Cursor Cloud specific instructions

Standard commands live in `README.md` / `package.json` (`npm run dev`, `build`, `lint`, `generate:media`). Notes below cover only non-obvious cloud gotchas.

- **Node version / PATH shadowing:** The README targets Node 24+. The VM's default `node` on `PATH` is `/exec-daemon/node` (v22.x) which cannot be removed and shadows nvm. Both lint and `next build`/`next dev` work fine on that v22, so it is an acceptable fallback. To use the documented Node 24 instead, select it with nvm: `nvm use 24` (default alias is set; run `nvm install 24` first if it is missing). Note that `nvm use`/`node -v` only affect the current shell because `/exec-daemon/node` wins on fresh shells — prepend `$HOME/.nvm/versions/node/v24.*/bin` to `PATH` in whatever shell runs the dev/build command.
- **Env file:** Copy `.env.example` → `.env.local` before running (it is gitignored). No real secrets are required for local dev.
- **Email dry-run:** In `next dev`, a missing/placeholder `RESEND_API_KEY` (like the one in `.env.example`) makes `/api/contact` and `/api/enquiry` succeed without sending email — the request returns `{ ok: true }` and logs `[email:dry-run] ...`. This is expected; you do not need a real Resend key to exercise the contact/enquiry forms end-to-end.
- **Dev server:** `npm run dev` serves on `http://localhost:3000` (Turbopack).
