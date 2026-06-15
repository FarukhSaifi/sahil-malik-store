# Security Policy

This policy applies to the **Sahil Malik** portfolio website ([sahilmalik.com](https://sahilmalik.com)) and its source repository.

## Supported Versions

Security fixes are applied to the **currently deployed production build** and the **`main` branch**. Older deployments and unmaintained branches are not supported.

| Version / branch      | Supported |
| --------------------- | --------- |
| Production (latest)   | Yes       |
| `main`                | Yes       |
| Other branches / tags | No        |

We do not publish semver releases for this site. When a fix is merged to `main`, it is expected to ship to production promptly after review.

## Scope

**In scope**

- Vulnerabilities in this repository (Next.js app, components, API routes, configuration)
- Issues that affect visitors or operators of the live site (e.g. XSS, open redirects, unsafe form handling, sensitive data exposure)
- Dependency vulnerabilities that are exploitable in this project’s usage

**Out of scope**

- Social media or third-party sites linked from the footer
- Vulnerabilities in hosting platforms (Vercel, DNS, CDN) — report those to the provider
- Issues that require physical access to a device or social engineering
- Denial-of-service or load-testing against production without prior written approval
- Missing security headers or best-practice hardening with no demonstrated exploit (still welcome as a low-priority suggestion via a normal issue)

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security problems.**

### Preferred: GitHub Private Vulnerability Reporting

1. Open the repository on GitHub.
2. Go to **Security** → **Report a vulnerability** (or use **Advisories** → **Report a vulnerability**).
3. Describe the issue, steps to reproduce, and impact. Include proof-of-concept only if needed to demonstrate the flaw.

If private reporting is disabled, enable it under **Settings** → **Security** → **Code security** → **Private vulnerability reporting**.

### Alternative: Email

If you cannot use GitHub’s private reporting, email the maintainers with the subject line **“Security — Sahil Malik site”** and include:

- Description of the vulnerability
- Affected URL or file path
- Steps to reproduce
- Your assessment of impact
- Optional: suggested fix or CVE reference

Use the contact address configured for the site (`CONTACT_EMAIL` in deployment environment), and mark the message as confidential.

## What to Expect

| Stage                                | Typical timeline                                 |
| ------------------------------------ | ------------------------------------------------ |
| Initial acknowledgment               | Within **3 business days**                       |
| Triage (valid / invalid / duplicate) | Within **7 business days**                       |
| Fix or mitigation plan               | Depends on severity; critical issues prioritized |
| Disclosure coordination              | After a fix is deployed, or by mutual agreement  |

We may ask for clarification or a retest. We will keep you informed of meaningful status changes.

### If the report is accepted

- We will work on a fix on a private branch or via a coordinated security advisory when appropriate.
- We will credit reporters in the advisory or release notes if you wish (anonymous reporting is fine).
- We ask that you **do not disclose** the issue publicly until we have deployed a fix or agreed on a disclosure date.

### If the report is declined or deferred

- We will explain why (e.g. out of scope, not reproducible, duplicate, or acceptable risk).
- You may still disclose after **90 days** if no agreement was reached, provided you act in good faith and avoid unnecessary harm to users.

## Safe Harbor

We support good-faith security research on **this codebase and your own local/staging instances**. Do not access data that is not yours, modify production data, or disrupt the live site. Research that stays within this policy will not be treated as unauthorized access.

## Automated Dependency Updates

Dependency updates are monitored via [Dependabot](https://docs.github.com/en/code-security/dependabot). Critical npm advisories should still be reported here if you believe the project is exposed in a way Dependabot does not address.

## Questions

For non-security bugs or general feedback, use [GitHub Issues](https://github.com/FarukhSaifi/sahil-malik-store/issues) or the site [contact page](https://sahilmalik.com/contact).
