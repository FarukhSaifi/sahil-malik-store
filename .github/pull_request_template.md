## Summary

<!-- What does this PR change and why? -->

## Checklist

- [ ] `npm run lint` passes locally
- [ ] `npm run build` passes locally
- [ ] Content-only changes update `constants/` (no hardcoded copy in components)
- [ ] New routes or env vars are documented in README / `.env.example`

## Dependency PRs (Dependabot)

<!-- Delete this section if not a dependency update. -->

### Minor / patch (`npm-minor-patch` or `github-actions`)

- [ ] CI is green (ESLint, Dependency audit, Production build)
- [ ] Quick smoke test in the browser

### Major (`npm-major`) — extra review

- [ ] Read changelogs for **next**, **react**, **tailwind**, and any other major bumps
- [ ] **next** and **eslint-config-next** bumped together (same release line)
- [ ] **react**, **react-dom**, **@types/react**, **@types/react-dom** stay aligned
- [ ] Ran **Actions → Major dependency preview** workflow (optional dry run)
- [ ] Tested homepage, collections filters, contact form, header menus (desktop + mobile)

## Screenshots (if UI changed)

<!-- Optional -->
