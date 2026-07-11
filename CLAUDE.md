# Searchscope (searchscope.io): project guide

**Status: LIVE (launched 2026-07-02).** Hand-coded Astro 5 static site; replaced the old WordPress site.
Deployed to **Netlify** (GMM account) by drag-and-drop of `dist/`. DNS stays at **Namecheap** (external
DNS): apex `A @ -> 75.2.60.5`, `CNAME www -> apex-loadbalancer.netlify.com`; email forwarding + SPF/DKIM/
DMARC left intact; the product app stays on `app`/`api` -> 161.35.167.82. Let's Encrypt SSL auto-issued.
**To redeploy:** `npm run build`, then drag `dist/` onto the Netlify site's Deploys tab. WordPress kept
short-term as a fallback. Follow-up: the contact form has no Web3Forms key yet, so it opens the visitor's
email client instead of submitting silently (set `web3formsKey` in `src/consts.ts` to fix).

## What this is
A marketing / authority site and **lead funnel for Growth Minded Marketing (GMM)**. Searchscope is
GMM's search-intelligence co-pilot plus a sharp point of view.

> **Positioning guardrail (do not break):** Searchscope is NOT a product you can buy. No sign-up,
> trial, pricing, or checkout. Every CTA ends at `/contact` ("Talk to the team") → GMM. Do not add
> buy/pricing/self-serve flows.

## Stack
- **Astro 5** (pinned; Node 20.19 here cannot run Astro 7). Static output, no SSR adapter.
- Self-hosted fonts via Fontsource. `@astrojs/sitemap` + `@astrojs/rss`. No page builder; all hand-coded.
- CSS custom-property design system (`src/styles/tokens.css` + `global.css`).

## Live routes
`/` · `/platform` · `/search-systems` (manifesto) · `/blog` · `/contact` · `404` · `/rss.xml`.
Sitemap is at **`/sitemap-index.xml`** (auto; robots.txt points to it; draft posts excluded). `/grid` +
`/type` were removed 2026-06-28.

Blog posts live in `src/content/blog/*.md`. **Unpublish a post with `draft: true`** in its frontmatter
(both `/blog` and the `[...slug]` builder filter `!data.draft`, so it drops from the list, RSS and
sitemap, and the page stops building). Currently **2 live**: `seo-is-now-an-operating-system`,
`the-co-pilot-model-for-search-teams`. **3 unpublished 2026-07-02** (kept as drafts; old URLs 301 to
`/blog` via `public/_redirects`): `what-ai-overviews-change-about-visibility`,
`cannibalisation-is-a-data-problem`, `reading-demand-vs-your-share`.

## Hard conventions (do not break)
- **No em dashes** anywhere: copy, docs, code comments. Use commas, colons, semicolons, or parentheses.
  (Standing user rule.)
- Brand name is **"Searchscope" (one word, capital S)** in prose (renamed from "Search Scope"
  2026-07-08); the **logotype is the compact lowercase `searchscope`** (Geist Mono). The **domain is
  `searchscope.io`**. Screen-reader/aria name is "Searchscope".
- Brand framing says **"search data"**, not "Search Console" / "GSC" (exception: literal Google product
  names inside technical blog posts).
- **Position for organic search AND AI/LLM search (2026-07-02).** Where copy says "search engines", say
  "search engines and AI systems" (or "and LLMs" in punchy lines); AI search / AI Overviews / LLMs are
  first-class, not an afterthought. Leave the one historical Wave-1 "early days" line as-is.
- British English, practitioner voice, no hype, no emoji in product copy.
- Keep GMM "powered by" presence but don't plaster it: footer, home "built by", contact band, blog
  author card only. Use "our team" / "we" elsewhere.
- The Three Waves narrative is authoritative: **Wave 1 The Algorithm → Wave 2 Write for Users →
  Wave 3 Search Systems** (structural clarity so engines can understand/extract/trust a site at scale).
  Lives in `WaveTimeline` (home) + the full `/search-systems` manifesto. Do not revert to older drafts.

## Brand & design system
- **Monochrome.** White / black / grey on clean white (light) and warm near-black (dark). No brand
  colour; the "accent" is ink, and CTAs invert (black-on-light / white-on-dark).
- **Colour only in product data** (severity): green = rising/up/good, red = falling/down/critical,
  amber = weak, blue = brand/impressions, grey = flat. Never colour in chrome.
- **Type = the Geist superfamily + Inter ("mono-spine").** Geist Sans = display headlines + big metric
  numbers; **Geist Mono** = the interface/label layer (nav, buttons, eyebrows, labels, all tabular
  data, footer chrome); **Inter** = all multi-line reading (ledes, body, blog, manifesto, hero deck);
  Fraunces = rare editorial pull-quotes. Rule of thumb: mono for labels & numbers, Inter for sentences.
  Type scale was tightened 2026-06-28 (calmer headlines).
- **Logo** = a geometric **viewfinder** mark (four corner brackets + a bright signal node + a faint
  point) + the `searchscope` wordmark. Source: `src/components/Logo.astro`, `public/favicon.svg`, OG svg.
  **Portable assets for the product app live in `public/brand/`** (lockup / mark / app-icon, ink +
  `-on-dark`, SVG + PNG; wordmark outlined to vector paths). Regenerate with `node scripts/gen-brand.mjs`.
- **Instrument motifs (use sparingly):** viewfinder corner-ticks (`Ticks.astro`) on ONE signature frame
  per page (currently the home hero only) plus the closing CTA band; a faint coordinate-grid field
  (`.bg-grid` in `global.css`) behind page heroes and the CTA. Never on every card.
- Light/dark **mode toggle** (sun/moon in nav), persists to `localStorage` key `ss-mode`.

## Where to change things
- Site config (brand, nav, contact form key, socials, GMM url): `src/consts.ts`
- Colours / type / scale / tokens: `src/styles/tokens.css`
- Blog posts: add Markdown to `src/content/blog/` (schema in `content.config.ts`); unpublish with `draft: true`
- Redirects (Netlify): `public/_redirects` (copied to `dist/` on build; non-forced, so a republished page wins over its redirect)
- Product UI mocks: `src/components/mocks/` (swap a mock for an `<img>` inside the same `<AppFrame>`)
- OG share image: `public/og/searchscope-og.svg` then `node scripts/gen-images.mjs`
- Logo / brand assets: `public/brand/` then `node scripts/gen-brand.mjs` (needs python3 + fonttools + sharp)
- App design handoff for the product/app team: `docs/app-design-guidelines.md`

## Commands
`npm run dev` (localhost:4321) · `npm run build` (→ `dist/`, static) · `npm run preview`.

## What's been done (2026-06-28)
- Rebuilt the WordPress site as an Astro static site: Home, Platform, Future of SEO manifesto, Blog
  (+ 5 seed posts), Contact; RSS, sitemap, JSON-LD, OG, robots.
- Locked the brand: **monochrome** (dropped green and cream), clean white; **Geist superfamily** with
  the **mono-spine** typography; tightened type scale.
- **Viewfinder logomark** + favicon + OG; compact lowercase mono logotype.
- **Renamed brand** SearchScope → **Search Scope** (two words) across copy + metadata.
- **Grid/instrument kit** (`Ticks` + `.bg-grid`), applied sparingly; hero cleaned up (Inter deck,
  text-link secondary CTA, smaller mock + primary button, headline "Modern SEO is a system, not a
  project.").
- Renamed the blog section **"Field Notes" → "Blog"**.
- Produced a **portable logo asset kit** in `public/brand/` for the product app / login page.
- Rewrote `docs/app-design-guidelines.md` to the current brand (Geist superfamily, mono-spine,
  viewfinder + motifs, data palette, inverted cards, black pills).
- Removed unused routes `/grid` + `/type`; uninstalled the orphaned comparison fonts.

## Content & positioning repass (2026-07-02)
Product-marketing / SEO pass across the marketing pages (concept + guardrail kept intact):
- **Homepage H1 = "The AI co-pilot for modern search teams."** (eyebrow "Search intelligence"; sub leads
  with what it does + "our strategists turn it into work that ships"). Retires "Modern SEO is a system,
  not a project."
- **SEO title** (`SITE.title`) = "AI SEO Co-Pilot & Search Intelligence Platform | Search Scope";
  `SITE.description` refreshed; a **`SoftwareApplication` JSON-LD** block added on the homepage (no
  price/offer, so it respects the guardrail).
- **Platform** hero = "What the co-pilot actually does."; ledes de-jargoned (dropped "intelligence layer
  between your website and your growth team").
- **Contact** standardised on **"pilot programme"** (dropped the competing "Search Intelligence Session"
  offer name). Section headings across pages rewritten benefit-first.
- **AI/LLM positioning** woven through home, platform, `/search-systems`, `WaveTimeline` (see Hard
  conventions) and the blog.
- **Blog** unpublished 3 posts + 301 redirects (see Live routes).

Outstanding: set `web3formsKey` in `src/consts.ts` so the contact form submits silently (it currently
opens the visitor's email client).

## Redeploy
`npm run build`, then drag `dist/` onto the Netlify site's Deploys tab (the site is a Netlify
drag-and-drop deploy under the GMM account). If the domain ever changes, update `site` in
`astro.config.mjs` (canonical URLs, sitemap and RSS all derive from it).
