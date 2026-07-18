# Search Scope

The search‑intelligence co‑pilot site for **Growth Minded Marketing**, built as a fast,
SEO‑immaculate static site with [Astro](https://astro.build).

> Positioning guardrail (baked into every page): Search Scope is the *intelligence layer behind
> GMM's work* + a sharp point of view → **"Talk to the team."** It is **not** a product you can
> buy. No sign‑up, trial, pricing or checkout. Every path ends at `/contact` → GMM.

---

## Quick start

```bash
npm install          # first time only
npm run dev          # local dev at http://localhost:4321
npm run build        # production build → ./dist
npm run preview      # preview the built site locally
```

Node 20.19+ is fine (the project is pinned to Astro 5 for that reason).

---

## Project structure

```
src/
├─ pages/                 # one file = one route
│  ├─ index.astro          /            Home
│  ├─ platform.astro       /platform    The Co‑Pilot
│  ├─ search-systems.astro /search-systems  The Future of SEO (manifesto)
│  ├─ contact.astro        /contact     Work With Us → GMM
│  ├─ blog/index.astro     /blog        Blog index
│  ├─ blog/[...slug].astro /blog/*      Individual posts
│  ├─ rss.xml.ts           /rss.xml     RSS feed
│  └─ 404.astro
├─ content/blog/          # ← blog posts live here (Markdown)
├─ components/            # Nav, Footer, ScatterHero, WaveTimeline, cards, mocks…
├─ layouts/              # BaseLayout (SEO head) + PostLayout
├─ styles/               # tokens.css (design system) + global.css
├─ consts.ts             # ← site config: brand, nav, form key, socials
└─ content.config.ts     # blog schema
public/                  # favicons, og image, robots.txt, fonts are bundled
```

---

## The three things you'll want to change

### 1. Make the contact form send to your inbox
Right now the form opens a **pre‑filled email** to `clients@growthmindedmarketing.com`
(works with zero setup). To receive enquiries in‑app instead:

1. Get a free access key at <https://web3forms.com> (uses your inbox, no backend).
2. Paste it into `src/consts.ts`:
   ```ts
   export const FORM = {
     web3formsKey: 'YOUR-KEY-HERE',
     inbox: 'clients@growthmindedmarketing.com',
   };
   ```
That's it: the form auto‑switches to AJAX submit with a success message.

### 2. Write a blog post
Drop a new Markdown file in `src/content/blog/`, e.g. `my-post.md`:

```markdown
---
title: Your headline
description: One‑line summary for cards, search and social.
pubDate: 2026-07-01
author: Ray
tags: ['Search Systems']        # from the taxonomy in src/consts.ts (BLOG_TAGS)
---

Your writing here. Markdown supported: headings, lists, **bold**, `code`, > quotes, images.
```
It appears automatically on `/blog`, in the RSS feed and the sitemap. Set `draft: true` to hide it.

### 3. Swap in real product screenshots
The product UI is currently rendered as **on‑brand code mocks** (in `src/components/mocks/`).
When you have real screenshots, replace a mock with an `<img>` inside the same `<AppFrame>`,
e.g. in `src/pages/platform.astro`:
```astro
<AppFrame slot="visual" label="searchscope.app/analyzer" tab="Analyzer Engine">
  <img src="/screens/analyzer.png" alt="The Analyzer Engine" />
</AppFrame>
```

Other quick edits: nav links / socials / GMM URL → `src/consts.ts`; colours & type →
`src/styles/tokens.css`; the OG share image → `public/og/searchscope-og.svg`
(then `node scripts/gen-images.mjs` to re‑export the PNG).

---

## Launch: deploy + point the domain (currently on WordPress)

The `dist/` build is plain static files, so any static host works. **Vercel** is the path below.
Netlify and Cloudflare Pages are drop-in equivalents (same settings: build `npm run build`, output `dist`).

### Before you flip DNS (pre-launch checklist)
- Set the **Web3Forms key** in `src/consts.ts` (see "Make the contact form send to your inbox" above)
  so enquiries arrive in your inbox; without it the form falls back to opening an email.
- Confirm `site` in `astro.config.mjs` is `https://searchscope.io`.
- `npm run build` is clean and `npm run preview` looks right (test the form and a blog post).

### Step 1: get the code on Vercel
**A. GitHub + Vercel (recommended, auto-deploys on every push)**
1. This folder is not a git repo yet. Initialise it and push to a new GitHub repo
   (`git init`, commit, create the repo, push).
2. On vercel.com: Add New, then Project, then import the repo.
3. Vercel auto-detects Astro. Confirm Framework = Astro, Build = `npm run build`, Output = `dist`. Deploy.

**B. Vercel CLI (fastest, no GitHub)**
```bash
npm i -g vercel
vercel          # first run links/creates the project and deploys a preview
vercel --prod   # promote to production
```

Either way you get a live `*.vercel.app` URL. Open it and check every page **before** touching DNS.

### Step 2: add the domain in Vercel
Project, then Settings, then Domains. Add `searchscope.io` and `www.searchscope.io`. Vercel shows the
exact records to set and marks them invalid until DNS points at it. Leave that tab open.

### Step 3: point the DNS (the WordPress cutover)
Log in wherever `searchscope.io`'s DNS is managed (your domain registrar, e.g. GoDaddy / Namecheap, or
your current WordPress host). **Change the web records** to Vercel's:

| Type | Name / Host | Value |
|---|---|---|
| `A` | `@` (apex `searchscope.io`) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

- This **replaces** the old `A` record that points at the WordPress server. That swap is the cutover:
  once it propagates, `searchscope.io` serves the new site instead of WordPress.
- The canonical URL is the apex `https://searchscope.io`; Vercel 301-redirects `www` to it automatically.
- **Leave `MX` and any email / TXT records untouched** so email keeps working. Change only the `A`/`CNAME`
  web records. (Do not switch the whole domain to Vercel nameservers unless you intend to move all DNS,
  in which case you must re-create your MX/email records there.)
- Tip: a day ahead, lower the existing `A` record's TTL (to 300s) so the switch is near-instant.
  Propagation is usually minutes, occasionally a few hours.

### Step 4: verify, then retire WordPress
1. Wait for Vercel to mark the domain valid. SSL is auto-provisioned, so HTTPS just works.
2. Hard-refresh `https://searchscope.io`, click every page, submit the form, open a post.
3. Once happy, cancel or archive the WordPress hosting. **Keep it until you have verified**, as a fallback.

If the domain ever changes, set it in `astro.config.mjs` (`site`); canonical URLs, sitemap and RSS all
derive from it.

---

## SEO notes (this site is the showcase)
- Self‑hosted fonts, minimal JS → fast LCP.
- Per‑page title/description/canonical, Open Graph + Twitter cards, one OG image.
- JSON‑LD: Organization + WebSite sitewide, Article + BreadcrumbList on posts.
- Auto `sitemap-index.xml`, `/rss.xml`, `robots.txt` (AI crawlers explicitly allowed).
- Semantic HTML, one `<h1>` per page, internal links between manifesto ↔ Blog.

Built and run by Growth Minded Marketing.
