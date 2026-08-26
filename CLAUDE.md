# Searchscope website (searchscope.io): agent guide

You are editing the marketing website for Searchscope. This file is the rulebook; follow it on every change, whichever Claude surface you are (Claude Code, Claude Cowork, or the Website CMS agent).

## What this repo is

- `holding/`: hand-coded static HTML, **LIVE on searchscope.io right now**. No build step. A merge to `main` that touches `holding/` deploys to production within seconds: say so clearly before any merge, and never merge without explicit approval.
- `src/`: the full Astro 5 site, staged for launch, not public yet. Merging `src/` changes does NOT affect production (Netlify publishes `holding/` only), but still needs approval.
- Config `src/consts.ts` · design tokens `src/styles/tokens.css` · pages `src/pages/*.astro` · blog `src/content/blog/*.md` (unpublish with `draft: true`) · redirects `public/_redirects` · content images `public/images/` (served at `/images/*`) · brand marks `public/brand/` · OG images `public/og/`.
- Staging for the full site: the `launch` branch builds to https://launch--searchscope.netlify.app (noindexed). Refresh it by merging `main` into `launch` and pushing.

## Hard brand rules: never break these

1. **No em dashes anywhere** in site copy. Use commas, colons, semicolons, or parentheses.
2. **Voice:** **US English** (Stu, 2026-08-19: was British, changed so the site matches the app UI
   and the email program). So: color, center, analyze, cannibalization, labeled, judgment.
   Practitioner, no hype, no emoji in product copy.
   **Use contractions.** Write don't, can't, you're, it's, we'll, isn't, doesn't. Never do not,
   cannot, you are, it is, will not, is not, does not. This is how the brand sounds: a person
   talking, not a policy document. The only exception is deliberate emphasis, and it should be
   rare enough that you notice it.
   **Workspace names are proper nouns:** Index Bloat, Links, Cannibalization, Content Decay,
   Opportunities, Cluster Volatility, Schema. Lowercase only when the words are used normally,
   as in "six pages have no internal links in".
   Brand name is "Searchscope" (one word); the logotype is lowercase mono `searchscope`. Say "search data", not "GSC" or "Search Console" (except literal Google product names in technical posts). Position for organic AND AI/LLM search.
3. **Monochrome brand:** white, black, grey, warm near-black in dark mode. No brand color; color appears only in product data. Calls to action invert.
4. **Type:** Geist superfamily plus an Inter mono-spine (mono for labels and numbers, Inter for sentences, Fraunces rarely). Reuse the tokens in `src/styles/tokens.css`; never invent new styles.
5. **Forms** (static site, no backend), in order of preference: Netlify Forms (`data-netlify="true"`) > a Typeform/Tally embed snippet > the existing Web3Forms contact pattern. Forms are for contact and pilot enquiries only.

## Workflow: every change, no exceptions

1. Start from up-to-date `main`: `git checkout main && git pull`.
2. Create a branch named `cms/<surface>/<kebab-slug>` (surface = `holding` or `site`).
3. Make the smallest change that satisfies the request.
4. Do NOT run `npm install` or builds to verify: CI builds every pull request. Verify by reading the code.
5. Commit, push the branch, open a pull request into `main` (`gh pr create`).
6. Report: what changed, the files, the PR link, and the preview URL `https://deploy-preview-<PR#>--searchscope.netlify.app` (Netlify attaches it about a minute after the PR opens).
7. Three required checks must pass: "No em dashes", "Site builds".
8. **Merge only when a human explicitly approves.** Never push to `main` directly. Rollback is `git revert` plus a new PR.

## Cautions

- This repo is public with a deliberately clean history. Never commit `CLAUDE.local.md`, `docs/`, `holding/NOTE.md`, or any file containing infrastructure details, credentials, or internal plans.
- If git ever reports a branch has "no history in common with main", do not merge it: rebuild the change on a fresh branch from current `main` and delete the stray branch.
- Do not change `netlify.toml` without being asked to.
