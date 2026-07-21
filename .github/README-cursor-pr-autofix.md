# Cursor PR autofix + readiness gate (apply per-repo)

This repo includes a workflow setup that:

1. **Automatically runs a Cursor Cloud Agent** when the **CI workflow fails** on a PR, and fixes issues directly on that PR branch.
2. **Keeps PRs in draft** until **all CI/deployment checks** (including Vercel) are green, then marks the PR ready for review.

## 1) Required secret (every repo)

In each GitHub repo, add a repository secret:

- `CURSOR_API_KEY` = your Cursor API key

Cursor uses this to start/communicate with the Cloud Agent.

## 2) Copy these files into each repo

Add the following workflow files to the target repo’s `.github/workflows/`:

- `cursor-pr-autofix.yml`
- `pr-readiness-gate.yml`

## 3) Create the Cursor Automation (one-time per repo)

Cursor Automations are account/dashboard objects (not committed to git).

Create a **Custom Automation** at: https://cursor.com/agents → **Automations** tab

Use the prompt/spec in:

- `.github/automations/pr-ci-autofix.md`

This prompt complements `cursor-pr-autofix.yml`.

## 4) Notes

- The readiness gate uses `gh pr view ... statusCheckRollup` to determine whether checks are **pending / failing / successful**.
- If you have different check names across repos, the gate still works because it evaluates conclusions/pending states rather than hardcoding specific workflows.
