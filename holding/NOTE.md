# searchscope.io — Holding page (TEMPORARY)

`index.html` in this folder is the **temporary holding page** for `searchscope.io`
during the private pilot.

## Deploy
Drag this **`holding/`** folder into the searchscope.io **Netlify** site
(Deploys → drag-and-drop) to make it the live homepage. It is a standalone,
self-contained page (inlined fonts, styles and one logo — no external requests,
no build step).

- Hero: Demand-scatter animation.
- Headline: **"The Operating System for Modern Search Teams"**.
- CTA: **"Join the pilot programme"**.
- Feature section: the numbered six-room ledger (Data Pipeline → Reports).

## This is NOT the full site — the redesign goes live at launch
The real, multi-page marketing site lives in this repo (Astro: `src/`, built to
`dist/`). Its complete information architecture + verbatim copy is mapped in:

> [`../IA_CONTENT_BREAKDOWN.md`](../IA_CONTENT_BREAKDOWN.md)

That full site — homepage thesis, the six feature pages (Data Pipeline, Analyser
Workspaces, Intelligence Hub, Brand & AI Visibility, Content Studio, Reports),
the Platform hub, Future of SEO, Blog, How it works, and Contact — **replaces
this holding page when we launch**. Until then, `searchscope.io` serves only this
one page; the product itself lives at `app.searchscope.io`.
