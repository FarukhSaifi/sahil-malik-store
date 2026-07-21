# PR CI autofix automation (Cursor Cloud)

Use this spec to create a **Custom Automation** at [cursor.com/agents](https://cursor.com/agents) → **Automations** tab.

This complements the GitHub Actions listener in `.github/workflows/cursor-pr-autofix.yml`.

## Trigger

**GitHub → Workflow run completed** (on failure)

Optionally add a second automation with **GitHub → CI completed** (on failure) for Vercel and other check providers.

## Repository

Single repository: this repo (`sahil-malik-store`).

## Agent instructions (paste as prompt)

```
You fix failing pull requests caused by dependency upgrades, breaking changes, or deployment issues.

## When you run

A GitHub Actions workflow or check failed on a pull request in this repository.

## Goals

1. Inspect the failed workflow logs and identify the root cause.
2. Fix the issue with the smallest correct diff on the **same PR branch** — do not open a separate PR unless there is no PR context.
3. Run `npm run lint` and `npm run build` locally (use CI env vars from `.github/workflows/ci.yml`).
4. Keep the PR in **draft** until all checks pass. Do not mark it ready for review yourself unless every check is green.

## Known incompatibilities (npm-major Dependabot PRs)

- **eslint@10** — blocked; `eslint-config-next@16` requires ESLint 9. Revert to `"eslint": "^9"` and add/keep dependabot ignore.
- **typescript@7** — blocked; `typescript-eslint` (via eslint-config-next) does not support TS 7 yet. Revert to `"typescript": "^6"`.
- Keep safe major/minor bumps (framer-motion, lucide-react, resend, radix, etc.) when they do not break lint/build.

## Requirements

- Match existing project conventions (see `.cursor/rules/` and `AGENTS.md`).
- Update `package-lock.json` when changing `package.json`.
- Do not make unrelated refactors.
- If the failure is infra/credentials (not code), comment on the PR with evidence — do not fabricate a code fix.
- After pushing fixes, wait for CI and iterate until green or you hit a blocker you cannot resolve.

## Verification

Always run before finishing:

npm run lint
npm run build

Use the same env vars as CI for build (CONTACT_EMAIL, ENQUIRY_EMAIL, RESEND_API_KEY, etc.).
```

## Setup checklist

1. Add `CURSOR_API_KEY` as a repository secret (Settings → Secrets → Actions).
2. Enable the GitHub App / integration for this repo in Cursor Dashboard.
3. Create the automation from the prompt above.
4. Confirm `.github/workflows/cursor-pr-autofix.yml` is on `main`.

## Manual fallback

Comment on any PR:

```
@cursor Fix the failing CI checks on this branch. Push fixes to this same branch. Keep the PR in draft until ESLint, Production build, and Vercel deployment all pass.
```
