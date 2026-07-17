# Searchscope Marketing Site — Content Breakdown (feature-based IA)

**How to use this doc:** This is a page-by-page, section-by-section map of the marketing site's copy and mock UI. Every page is a `##` heading; every numbered section inside it is a `###` heading. When you want to request a change, reference it as **`Page > section number`** (e.g. "Workspaces > section 4", or "Homepage > section 6"). Copy is quoted verbatim so change requests can be exact — British spelling and existing wording are preserved inside quotes. The shared nav and footer are documented once at the top and are not repeated per page.

---

## Shared chrome (nav + footer, on every page)

### Top navigation (`src/components/Nav.astro` + `NAV_LINKS` in `src/consts.ts`)
- Left: the Se
archscope logo (links to `/`).
- Primary nav links (verbatim, in order):
  1. **Platform** → `/platform`
  2. **Future of SEO** → `/search-systems`
  3. **Blog** → `/blog`
- Right: a button **"Join the pilot programme"** → `/contact`.
- Mobile: same three links + the same CTA in a hamburger drawer.
- Note: the light/dark mode toggle is **hidden** (`SHOW_MODE_TOGGLE = false`) — the site is locked to light mode. The nav is intentionally lean; the six feature pages are reached from the Platform hub, the homepage feature index and the footer, not the top bar.

### Footer (`src/components/Footer.astro`)
- **Brand block:** the logo, then blurb: *"The search intelligence co-pilot from Growth Minded Marketing. Searchscope reads your whole search picture and surfaces the moves that matter. Our team turns them into growth."* Below it a button **"Join the pilot programme →"** → `/contact`.
- **Column 1 — "Platform"** (the six feature pages, from `FEATURES`):
  - Data Pipeline → `/platform/data-pipeline`
  - Analyser Workspaces → `/workspaces`
  - Intelligence Hub → `/intelligence`
  - Brand and AI Visibility → `/brand-and-ai`
  - Content Studio → `/content-studio`
  - Reports → `/reports`
- **Column 2 — "Learn":** Platform → `/platform`, Future of SEO → `/search-systems`, Blog → `/blog`, **How it works** → `/how-it-works`.
- **Column 3 — "The agency":** "Growth Minded Marketing ↗" → external `https://growthmindedmarketing.com/`; "Work with us" → `/contact`.
- **Column 4 — "Connect":** "Email" (mailto `ray@growthmindedmarketing.com`), "LinkedIn ↗", "X ↗", "RSS feed" → `/rss.xml`.
- **Bottom bar:** *"© {year} Searchscope. Built by practitioners."* + a "Privacy" link (`/privacy`); right-aligned muted line: *"Searchscope is the intelligence layer behind our work, not a product you buy."*

> Note on the six-feature line copy: the homepage feature index and the footer use the short lines from `FEATURES` in `consts.ts`; the Platform hub overwrites them with richer lines. Both variants are captured on their respective pages below.

---

## 1. Homepage (route `/`, `src/pages/index.astro`)

**Purpose / thesis:** Position Searchscope as an AI search-intelligence co-pilot that reads your whole search picture and drafts the fix, run by a working search team. Establishes the "search is a system" thesis and funnels to the platform + pilot.

### 1. Hero
- Eyebrow: **"Search intelligence"**
- Headline: **"The AI co-pilot for modern search teams."** (breaks as "The AI co-pilot for modern / search teams.")
- Sub copy: *"Searchscope reads your whole search picture (your site, your search data, market demand and how AI answers describe you), pinpoints exactly what is costing you traffic and **drafts the fix, ready to ship.** Ask it anything, run it when you want, and our strategists turn the findings into work that lands."*
- CTAs: **"Join the pilot programme →"** (`/contact`) and text link **"See the platform →"** (`/platform`).
- Footnote (mono): *"Built and run by the search team at Growth Minded Marketing."*
- Visual: the **DemandScatter** product card (`src/components/product/DemandScatter.astro`) — a "Demand vs your position" scatter plot.
  - Window chrome: URL `app.searchscope.io/demand`, tab **"Demand & Trends"**.
  - Title "Demand vs your position", sub "geo UK · 142 clusters". Legend: rising / flat / falling.
  - 40 bubbles (each a query cluster; size = opportunity, colour = trend). A shaded band marks rising demand you rank weakly for.
  - Callout **"LOSING SHARE"** on path **`/tents/4-season`** — "demand ↑ · impr ↓ · 2 competing".
  - Note: *"Shaded = rising demand you rank weakly for, your biggest openings."*
  - Stat tiles: **142** Clusters · **77** Rising demand · **72** Losing share · **104k** Addr. demand.

### 2. "A room you run search from" (the live run strip)
- Eyebrow: **"How you use it"**
- Headline: **"Not a weekly email. A room you run search from."**
- Body: *"Point Searchscope at your site and your search data and it becomes one place to work: ask it a question and get an answer grounded in your numbers, run the whole engine whenever you want a fresh read, then turn any finding into a brief or a draft. Set it to refresh on a cadence if you like, or run it the moment something moves."*
- Stat row: **1,240** pages read per run · **86,000** queries cross-checked · **169** findings scored · **5** critical to act on.
- Interactive element: the **"Analyser engine · on-demand run"** strip — a dark object with a live clock that animates seven analyser rows from "queued" → running (shows its sub-line) → "complete" (shows its result), looping on scroll. Depicts real engine telemetry, not a fake spinner. The seven rows (verbatim name · running sub-line · result):
  1. **Index bloat** · "index coverage · canonicals · thin and orphaned pages" · "18 findings · 2 fixed since last run"
  2. **Internal links** · "graphing 14,600 internal links · starving targets" · "34 placements · 12 source pages"
  3. **Cannibalisation** · "shared-query page pairs · click splits" · "6 conflicts · 1 critical"
  4. **Content decay** · "90-day trends across 412 pages with traffic" · "41 findings · 12,400 clicks at risk"
  5. **Opportunities** · "positions 4 to 20 vs heading coverage" · "58 findings · +8,900 clicks in reach"
  6. **Schema** · "structured data vs rich-result eligibility" · "27 findings · 11 fixable today"
  7. **Cluster volatility** · "142 semantic clusters · trend + coverage" · "15 findings · 4 need an anchor page"
- Caption below: *"The page's one dark object: real engine telemetry, not a fake spinner."*

### 3. "Why search got harder"
- Eyebrow: **"Why search got harder"**
- Headline: **"Modern search is a system. Most SEO tooling still isn't."**
- Body: *"Search engines and AI answers now read your whole site as a system: what connects, what is duplicated, what they can trust and quote. Rank trackers and one-off audits look at pages in isolation, so they miss the patterns that actually move traffic."*
- Element: three "wave" cards depicting SEO's eras:
  - **The first wave — "The algorithm":** "Optimise for what the engine could measure: keyword placement, links, endless page variations."
  - **The second wave — "Write for users":** "Useful content, clear intent, authority and trust. Still right, but no longer enough on its own."
  - **The third wave · now — "Search systems":** "Build a site search engines and AI answers can confidently understand, extract and trust at scale." (highlighted as current)
- Pull quote: *"Designing your site so search engines and AI answers can confidently understand, extract and trust your content at scale, not just optimising individual pages to rank."* — cited as **"The search systems thesis"**.
- Link (centered): **"Read the full thesis → The future of SEO"** (`/search-systems`).

### 4. "What it catches"
- Eyebrow: **"What it catches"**
- Headline: **"Great content, stuck rankings? It is usually one of these."**
- Body: *"You can have strong pages and still stall, because your site isn't clear enough for search engines and AI answers to read at scale. Three patterns quietly cap performance, and all three are hard to spot by eye."*
- Three problem cards:
  1. **Internal competition:** "Several pages target one topic, so engines can't tell which is the answer. Rankings swap between URLs and traffic turns unstable."
  2. **Repetitive at scale:** "Hundreds of near-identical product or filter pages blur together in the results. Rankings hold; clicks quietly fall."
  3. **Buried content:** "Strong pages sit deep with few internal links, so the system reads them as unimportant, however good they are."
- Visual: the **DecayTrend** product card (`src/components/product/DecayTrend.astro`) — a "clicks vs demand" line chart:
  - URL `app.searchscope.io/workspaces/content-decay`, tab **"Content decay"**.
  - Title "**/journal/winter-layering** · clicks vs demand", sub "90 days · weekly". Legend: your clicks / topic demand.
  - Falling solid clicks line under a rising dashed demand line; callout **"CONTENT DECAY"** on `/journal/winter-layering` — "clicks ↓ 34% · demand ↑ 12%".
  - Note: *"Caught on Monday's run: demand up 12% while clicks fell 34%. The refresh playbook is already drafted."*
  - Stats: **4,120** Clicks at risk · **12** Queries slipping · **4.2 → 7.8** Position · 90d.
- Link: **"See all three, with the data → The future of SEO"** (`/search-systems`).

### 5. "The platform" (six ways to work)
- Eyebrow: **"The platform"**
- Headline: **"One place. Six ways to work."**
- Body: *"Everything runs off one engine and one set of data. Move from what is wrong, to what to do, to something ready to ship, without leaving the tool or stitching reports together."*
- Element: a numbered index of the six features (short `FEATURES` lines), each linking to its page; "Brand and AI Visibility" carries a **"New"** chip:
  1. **Data Pipeline** — "Sync your search data, crawl your site, run the analysers. Watch the engine work in a live terminal. This is what feeds everything else."
  2. **Analyser Workspaces** — "Seven analysers hand you a queue of findings, each one scored, judged and with the fix drafted. Work top to bottom and clear the week."
  3. **Intelligence Hub** — "Your performance, the competitive gap, rising demand and an AI strategist that has already read your data. The command centre."
  4. **Brand and AI Visibility** *(New)* — "See how AI answers describe you, who they recommend instead, and which sources they trust. Then move the numbers with digital PR and a dedicated strategist."
  5. **Content Studio** — "Turn a finding into research, a brief and a draft, with the exact spot on the page it belongs. The execution layer."
  6. **Reports** — "A client-ready report that writes itself, in the voice of whoever is reading it. Export to PDF, a slide deck or a workbook."
- Link: **"Explore the platform in full →"** (`/platform`).

### 6. "The Strategic Advisor"
- Eyebrow: **"The Strategic Advisor"**
- Headline: **"Ask it what you'd ask an analyst."**
- Body: *"Not a generic chatbot. The Strategic Advisor is grounded in your search reality. Ask where you're losing ground, what's behind a drop, or what to brief next, and it answers with the data and the move, then hands the work straight to Content Studio."*
- Link: **"Meet the advisor → Intelligence Hub"** (`/intelligence`).
- Visual: a chat mock UI (URL `app.searchscope.io/intelligence/strategic-advisor`, tab "Strategic Advisor"):
  - Question: *"Which pages are quietly losing traffic that I haven't noticed?"*
  - Reasoning pulls: "✓ read 90 days of search performance · 1,240 pages" and "✓ cross-checked the decay analyser's latest run".
  - Answer: **"Three pages are sliding behind a stable overall number:"** with a table:
    - `/guides/how-to-choose-a-waterproof-jacket` — **−28%**
    - `/collections/down-jackets` — **−17%**
    - `/guides/best-hiking-trails-uk` — **−12%**
    - Closing line: *"The waterproof jacket guide is the one to act on first: demand is up 14% while you slipped from 4.2 to 7.8. I have drafted the refresh."*
  - Action chips: **"Create brief"** (active), "Open decay workspace", "Add objective".

### 7. "Built by practitioners"
- Eyebrow: **"Built by practitioners"**
- Headline: **"Built and run by a working search team, not a lab."**
- Body: *"We're a search team first. Searchscope is the co-pilot we built to do our own client work better, sharpened on real sites every day. Work with us and you get both: the intelligence, and the people who wield it."*
- CTA (ghost button, external): **"Meet the team at Growth Minded Marketing ↗"** → `https://growthmindedmarketing.com/`.

### 8. Final CTA band
- Eyebrow: **"Join the pilot"**
- Title: **"See it read your site."**
- Sub: *"We are onboarding a small group of teams who want to run search this way. Bring your site and your search data; we will show you the findings on your own numbers in the first session."*
- Buttons: **"Join the pilot programme →"** (`/contact`) + secondary **"See the platform"** (`/platform`).

---

## 2. Platform overview hub (route `/platform`, `src/pages/platform.astro`)

**Purpose / thesis:** The tour hub. One crawl + one set of search data power six surfaces; each earns its place and links out to its own page.

### 1. Page hero
- Eyebrow: **"The platform"**
- Headline: **"Your whole search picture, in one place."**
- Lede: *"Searchscope crawls your site, reads your search data, and runs the analysis once. Everything downstream, the findings, the competitive view, the AI-visibility read, the advisor, the drafts and the reports, works off that single source. Here is the tour."*
- Element: a horizontal pipeline chip row: **Data Pipeline → Analyser Workspaces → Intelligence Hub → Brand and AI → Content Studio → Reports**.

### 2. "Six surfaces" index
- Eyebrow: **"Six surfaces"**
- Headline: **"Each one earns its place, and links to its own page."**
- Body: *"Everything runs off one engine and one set of data. Move from what is wrong, to what to do, to something ready to ship, without leaving the tool or stitching reports together."*
- Element: the six-feature index again, but with **richer product-marketing lines** (overriding the short `FEATURES` copy). Each row has an "open →" link; Brand and AI carries a **"New"** chip:
  1. **Data Pipeline** — "Sync your search data, crawl the site, run the engine. A live terminal shows every page fetched and every analyser as it lands."
  2. **Analyser Workspaces** — "Index bloat, internal links, cannibalisation, content decay, opportunities, schema, cluster volatility. A queue per analyser, scored and drafted."
  3. **Intelligence Hub** — "KPI band with period comparison, competitor keyword gaps, demand and trends, objectives, and the Strategic Advisor."
  4. **Brand and AI Visibility** *(New)* — "Share of AI answers, how the engines describe you, who they cite, and the PR strategist who turns that into a pitch list."
  5. **Content Studio** — "From finding to research to brief to draft, with the placement picker showing exactly where the new section goes."
  6. **Reports** — "Compose a report by audience and watch the paper fill in. Export to PDF, a slide deck, or a styled Excel workbook."
- Footnote: *"Tools also carries Page Experience (Core Web Vitals and accessibility), marked 'Soon' in the app and left out of the site until it ships."*

### 3. CTA band
- Title: **"See the engine read your site."**
- Sub: *"Join the pilot programme and we will point Searchscope at your own site and search data, then walk you through all six surfaces on your numbers."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See how it works"** (`/how-it-works`).

---

## 3. Data Pipeline (route `/platform/data-pipeline`, `src/pages/platform/data-pipeline.astro`)

**Purpose / thesis:** The engine that feeds everything. Sync → crawl → run, in that order, so every finding reflects the current site; watch it happen in a live terminal rather than a spinner.

### 1. Page hero
- Eyebrow: **"Data Pipeline"**
- Headline: **"Fresh data in. Confident findings out."**
- Lede: *"Sync your search data, crawl your site, run the analysers. It runs in that order so every finding reflects how your site looks right now, not a snapshot from last quarter. When it is running, you are not staring at a spinner: you are reading the engine."*

### 2. "Pipeline overview" (control room)
- Eyebrow: **"Pipeline overview"**
- Headline: **"One control room drives the whole engine."**
- Stat tiles (5):
  - **Search data** — 486 — "days · 12.4M rows · synced 2h ago"
  - **Site crawl** — 1,240 — "pages · crawled 2h ago · 6m 12s"
  - **Findings** — 169 — "open · 7 analysers · last run 2h ago"
  - **Critical** — 5 — "need action this run"
  - **This run's triage** — 38% (progress meter) — "64 of 169 handled"
- Mock UI (URL `app.searchscope.io/settings?tab=data`, tab **"Data Pipeline"**): a "Data pipeline" panel, sub "runs in order · sync → crawl → analyse", with a **"Run all analysers ▶"** chip and three step rows:
  - "01 · Search data" — "synced 2h ago · 486 days of coverage" — status "fresh" — chip "Sync"
  - "02 · Site crawl" — "crawled 2h ago · 1,240 pages · 3 changes since" — "3 new" — chip "Crawl"
  - "03 · Analysers" (open/running) — "running · reading the crawl from 2h ago" — "4 / 7" — chip "Stop"
  - Footer note: "● Everything is fresh. The analysers are reading current data."
- Caption: *"Three inputs, one order. The sync, the crawl and the run each carry their own receipts."*

### 3. "Telemetry bay" (the one dark object)
- Eyebrow: **"Telemetry bay"**
- Headline: **"Real engine telemetry, not a fake spinner."**
- Body: *"Open the terminal under any running step and watch it work: each page fetched with its status and timing, schema and entity notes as they land, warnings the moment they appear. The stage strip walks crawling, processing, intelligence and indexing. Colour means the same thing it means everywhere in Searchscope: emerald good, amber watch, rose problem."*
- Aside link (non-clickable): "This is the signature moment of the pipeline".
- Interactive element: a **live "Telemetry bay · live"** terminal (counter "1,081 / 1,240 pages"), stage strip "crawling (done) · processing (live) · intelligence · indexing", streaming fetch lines that cycle (Northwind Outfitters sample crawl feed):
  - `GET /collections/waterproof-jackets` · 200 · "318ms · 42 products · CollectionPage"
  - `GET /guides/how-to-layer-for-hiking` · 200 · "291ms · 1,640 words · Article"
  - `GET /collections/hiking-boots` · 200 · "355ms · 68 products · schema ok"
  - `GET /products/summit-3-season-tent` · 200 · "402ms · 5 new entities"
  - `GET /guides/waterproof-ratings-explained` · 200 · "288ms · schema none ⚠"
  - `GET /collections/base-layers` · 200 · "271ms · re-indexed ✓"
  - `GET /blog/best-uk-hiking-trails` · 200 · "461ms · low inlinks ⚠"
  - `GET /products/merino-crew-190` · 200 · "333ms · 3 new entities"
- Caption: *"The page's one dark object: real engine telemetry, not a fake spinner."*

### 4. "The analysers" fleet
- Eyebrow: **"The analysers"**
- Headline: **"Seven analysers, each configured to your site."**
- Body: *"Turn analysers on or off, decide which get AI recommendations and how many draft per run, and set the thresholds that matter, the decay drop, the volatility band, the pages to exclude. Then run them all with one button, or one at a time."*
- Element: a fleet table titled **"The fleet · 169 findings this run"** — columns Analyser / Reads / Catches / This run:
  - **Index bloat** — reads "crawl + search data" — "Thin, zero-traffic, orphaned and duplicate pages worth pruning or merging." — **18 findings**
  - **Internal links** — "crawl" — "Where to add internal links, with the anchor text and the page to point at." — **34 placements**
  - **Cannibalisation** — "search data" — "Pages competing for the same queries: merge, redirect or differentiate." — **1 critical**
  - **Content decay** — "search data" — "Pages losing impressions and clicks over time, with a refresh playbook." — **41 findings**
  - **Opportunities** — "search data" — "Striking-distance keywords and the content gaps between you and page one." — **58 findings**
  - **Schema** — "crawl" — "Structured-data errors and missing types, with the fix written in JSON-LD." — **27 findings**
  - **Cluster volatility** — "search data" — "Topic clusters going volatile or declining, and which ones lack an anchor page." — **15 findings**
- Footnote: *"Mirrors the real Settings · Data Pipeline tab: the three inputs and their receipts, the live Telemetry Bay, and the seven-analyser fleet. Model names in the config drawers are deliberately not shown."*

### 5. CTA band
- Eyebrow: **"See it read your site"**
- Title: **"Point the pipeline at your own data."**
- Sub: *"Join the pilot programme and we will sync your search data, crawl your site and run the engine in the first session, live, on your numbers."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See the analyser workspaces"** (`/workspaces`).

---

## 4. Analyser Workspaces (route `/workspaces`, `src/pages/workspaces.astro`)

**Purpose / thesis:** The single page that replaces the seven analyser story pages. All seven analysers share one shape — a severity-banded queue of scored findings with the fix pre-drafted. Two workspaces (Opportunities, Cannibalisation) stand in for the set.

### 1. Page hero
- Eyebrow: **"Analyser Workspaces"**
- Headline: **"A working queue, not a wall of issues."**
- Lede: *"Seven analysers, one shape. Each opens on the numbers that matter, then a queue banded by severity: the critical few first, the rest below. Every row carries the metrics and a judgement. Open one and the fix is already written, ready to apply, brief or ignore."*
- Element: a chip row naming the seven analysers (from `ANALYZERS`): **Index bloat · Internal links · Cannibalisation · Content decay · Opportunities · Schema · Cluster volatility**.

### 2. Opportunities workspace (the standard shape)
- Eyebrow: **"Opportunities workspace"**
- Headline: **"The striking-distance queue."**
- Body: *"One shape stands in for all seven. The stat tiles open on what is in reach, the filter pills band the queue by type, and the top finding is expanded to show what every row carries: the plan, the position, the queries and the gaps."*
- Stat tiles (5):
  - **Clicks within reach** — +8,900 — "est. if opportunities land"
  - **Opportunities** — 58 — "positions 4 to 20"
  - **Striking distance** — 23 — "page one within a push"
  - **Avg position** — 9.1 — "across the queue"
  - **This week's triage** — 41% (meter) — "24 of 58 handled"
- Filter pills (with counts): **All 58** · Quick win 14 · Striking distance 23 · Content gap 12 · Low CTR 9 · **AI only 21**; keyboard legend **J K E**.
- Queue (severity-banded ledger, "Page / Pos / Impr / Est. clicks"):
  - Band: **"High priority · 3"**
  - **Expanded top row — "Down jackets"** — "Striking distance · cannibalisation conflict · `/collections/down-jackets`" — Pos 6.2 · 41.2K impr · **+1,300** est. clicks. Expansion contains:
    - "AI optimisation plan" · "focus · fill-power depth and comparison"
    - Quick-win tile: "Quick win · +1,300 clicks" — *"Answer 'fill power' and 'down vs synthetic' on the page and you move the head term from #6.2 → #3 for 'down jackets'."*
    - Action chips: **"Rebuild in Studio →"**, "View page", "Copy queries"
    - Position scale: page-one boundary at 10; "you · 6.2"; markers "better · 1 / you · 6.2 / 20"
    - Top-queries table (Query / Impr / Clicks / Pos):
      - "down jackets" — 18,400 — 610 — 6.1
      - "lightweight down jacket" — 9,900 — 280 — 7.4
      - "packable down jacket" — 6,200 — 150 — 9.0
      - "down vs synthetic jacket" — 4,100 — 40 — 14.2
    - "Missing H2 topics the top results cover" (coverage 62%) chips: "Fill power explained", "Down vs synthetic", "Care and washing", "Packability and weight", "Ethical down (RDS)"
  - Collapsed rows in High priority band:
    - **"3-season tents"** — "Content gap · `/collections/3-season-tents`" — 8.4 · 22.6K · **+740**
    - **"Merino base layers"** — "Low CTR · title and meta · `/collections/base-layers`" — 4.9 · 33.1K · **+680**
  - Band: **"Medium · 12"**
    - **"Insulated flasks"** — "Striking distance · `/collections/flasks`" — 11.2 · 18.4K · **+420**
    - **"Walking poles buying guide"** — "Quick win · `/guides/walking-poles`" — 7.8 · 9.7K · **+260**
- Footnote: *"Showing 5 of 58 opportunities · positions 4 to 20 over the last 28 days · the ink primary action opens the fix in Content Studio."*

### 3. Cannibalisation workspace
- Eyebrow: **"Cannibalisation workspace"**
- Headline: **"Stop your pages fighting each other."**
- Body: *"When two pages chase one query, engines split the clicks and both stall. The workspace pairs them, shows who is winning, and recommends whether to consolidate, differentiate or redirect."*
- Mock UI (URL `app.searchscope.io/workspaces/cannibalization`, tab **"Cannibalization"**):
  - Header: "Hiking boots · a duel over 64% shared queries", sub "strategy · differentiate · +1,180 clicks in reach", chip **"Create brief"**.
  - "Duel" comparison:
    - **Winner / "Keep": "Hiking boots"** — `/collections/hiking-boots` — "1,240 clicks · 96K impr · #4.1"
    - vs **"Best hiking boots UK"** — `/guides/best-hiking-boots-uk` — "380 clicks · 44K impr · #9.6"
  - Shared-query verdict table (Shared query / Collection / Guide / Verdict):
    - "hiking boots" — #4 / #11 — "keep collection"
    - "waterproof hiking boots" — #5 / #12 — "keep collection"
    - "best hiking boots uk" — #14 / #7 — "keep guide"
    - "womens hiking boots" — #6 / #13 — "keep collection"
  - Note: *"The plan: keep both, but point the guide at buying advice and hand the transactional queries to the collection. Internal links and canonicals drafted."*
- Footnote: *"Reproduces the real workspace shell: five stat tiles with one inverted focal tile and a triage meter, a severity-banded ledger with type and 'AI only' filter pills and a J K E keyboard legend, the expanded finding with its plan, position scale, top-queries table and missing-H2 chips, and the cannibalisation duel with a per-query verdict. The analysers are named as a set; none gets its own page."*

### 4. CTA band
- Eyebrow: **"Clear your own queue"**
- Title: **"See what the analysers surface on your site."**
- Sub: *"Join the pilot programme and we will run the seven analysers on your own pages, scored and with the fixes drafted, in the first session."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See the Intelligence Hub"** (`/intelligence`).

---

## 5. Intelligence Hub (route `/intelligence`, `src/pages/intelligence.astro`)

**Purpose / thesis:** The command centre. Executive performance reporting with period comparison, competitor keyword gaps, demand, and a Strategic Advisor that already knows your numbers.

### 1. Page hero
- Eyebrow: **"Intelligence Hub"**
- Headline: **"Know where you stand, and what to do about it."**
- Lede: *"The command centre reads your performance with proper period comparison, shows exactly where rivals outrank you, points at demand rising faster than your visibility, and puts a strategist beside it that already knows your numbers. Command centre, competitive landscape, demand, and the advisor."*

### 2. Command centre (KPIs + performance chart)
- Eyebrow: **"Command centre"**
- Headline: **"Executive-grade reporting, automatically."**
- Tab pills: **Overview** (active) · Queries · Pages · Page + Queries · Impact Tracking; range legend "Last 28 days / vs previous".
- Mock UI (URL `app.searchscope.io/intelligence/command-centre`, tab **"Overview"**):
  - Four-KPI band (Total clicks is the inverted focal tile):
    - **Total clicks** — 128,400 — "↗ +9,200 (7.7%)" — "119,200 vs previous period"
    - **Impressions** — 3.10M — "↗ +214K (7.4%)" — "2.89M vs previous"
    - **Avg CTR** — 4.1% — "±0.0pt" — "4.1% vs previous"
    - **Avg position** — 18.6 — "↗ improved 0.8" — "19.4 vs previous"
  - "Performance over time" chart, sub "clicks · last 28 days vs previous"; legend "this period / previous". An SVG line chart rising above the previous period's dashed line.
  - Note: *"Change markers sit on the timeline so you can see traffic move after each fix ships. Queries, Pages and Page + Queries tabs drill the same period."*

### 3. Competitive landscape (keyword gap)
- Eyebrow: **"Competitive landscape"**
- Headline: **"Exactly where rivals outrank you."**
- Body: *"Track up to three competitors with monthly ranking data, then read the keyword gap: what they rank for that you do not, where they are ahead, and where you already lead. Sorted by opportunity, so the pitch list writes itself."*
- Stat tiles (4):
  - **Your keywords** — 9,840 — "est. · UK market"
  - **Your est. traffic** — 128k — "organic / month"
  - **Competitors tracked** — 3 — "ranking data synced monthly"
  - **Keyword coverage** — 61% — "vs best competitor"
- Mock UI (URL `app.searchscope.io/intelligence/competitive-landscape`, tab **"Keyword Gap"**):
  - Header "Keyword gap analysis", sub "3 competitors · 1,180 keywords"; sub-tabs "Keywords / Clusters".
  - Gap-type filter pills (with counts): **Missing 214 · Weak 388 · Strong 512 · Untapped 96**.
  - Keyword-gap table (Keyword / Volume / Your pos / **alpinetrail** / **summitandsky** / Score / Gap):
    - "gore-tex jacket womens" — 4,400 — (—) — #4 — #9 — 88 — **Missing**
    - "waterproof hiking boots" — 8,100 — #14 — #3 — #7 — 79 — **Weak**
    - "3 season tent" — 3,300 — (—) — — — — 71 — **Untapped**
    - "insulated flask" — 5,400 — #9 — #6 — #12 — 66 — **Weak**
    - "merino base layer" — 6,600 — #5 — #11 — #8 — 41 — **Strong** (you win)
  - Note: *"Open a row for the ranking pages on both sides, then send it straight to the advisor or Content Studio."*

### 4. Strategic Advisor + objectives
- Eyebrow: **"Strategic Advisor · objectives"**
- Headline: **"A strategist that already read your data."**
- Body: *"Ask it a real question and it answers from your live performance, your findings, your competitors and the web, then shows its working in a reasoning trail. Set objectives beside it and it tracks them run to run."*
- Aside line: "Context: search data · analysers · competitors · brand and AI".
- Mock UI (URL `app.searchscope.io/intelligence/strategic-advisor`, tab **"Advisor"**):
  - "Connected to" chips: ● Search data · Analysers · Competitors.
  - Question: *"Where am I losing to competitors this month?"*
  - Pull: "✓ compared your gap table across 1,180 keywords".
  - Answer: **"Alpine Trail is taking two clusters you should own:"** *"'gore-tex jacket womens' (they are #4, you do not rank) and 'waterproof hiking boots' (they are #3, you are #14). Both have rising demand. Fastest route: one strong buying guide plus the collection fixes from the opportunity queue. Estimated reach, **+2,600 clicks a month**."*
  - Objective chip: **"Own 'waterproof boots' top 5 · 42%"**.
  - Action chips: **"Create brief"** (active), "Open gap analysis", "Trace".
- Footnote: *"Uses the real Command Centre tab set (Overview, Queries, Pages, Page + Queries, Impact Tracking), the four-KPI band with Total Clicks as the inverted tile, the Competitive Landscape keyword-gap table with Missing / Weak / Strong / Untapped badges, and the Strategic Advisor with its context chips, objectives and a reasoning trace."*

### 5. CTA band
- Eyebrow: **"Your command centre"**
- Title: **"See your own numbers in the hub."**
- Sub: *"Join the pilot programme and we will load your search data and competitors into the Intelligence Hub, then ask the advisor your first real question, live."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See Brand and AI Visibility"** (`/brand-and-ai`).

---

## 6. Brand and AI Visibility (route `/brand-and-ai`, `src/pages/brand-and-ai.astro`)

**Purpose / thesis:** The reputation layer. AI answers favour brands that are talked about, cited and trusted; Searchscope measures your share of AI answers and pairs a PR strategist (plus Campaign Radar) to move it. Thesis: content alone is not enough — being covered is what earns the citation.

### 1. Dark hero
- Eyebrow: **"Brand and AI Visibility"**
- Headline: **"See how AI describes your brand. Then change the answer."**
- Lede: *"When a buyer asks an AI engine for the best waterproof jackets, does it name you or your rivals? Searchscope interviews the AI answer engines every run, measures your share of those answers, finds the sources they trust, and hands a PR strategist the exact pitch list that will move it. Brand plays a big role in visibility. This is where you work it."*

### 2. Overview — the AI-visibility scoreboard (the one dark object)
- Eyebrow: **"Overview · the headline"**
- Element: an inverted dark scoreboard object — header "AI visibility benchmark · geo UK", sub "24 answers · 3 engines · sampled twice per prompt".
  - Two gauges: **AI visibility 34/100** — "mentioned in 8 of 24 topics"; **Brand strength 58/100** — "vs 4 AI-named competitors".
  - Body: *"AI engines answered **24** buyer questions in your market. You appeared in **8**. Meanwhile they already cite **19** other domains as sources in your space. That is your PR target list."*
  - KPI strip (4): **Share of voice 22%** — "of brands named in non-brand answers"; **Cited by AI 6** — "answers citing your site"; **Prompts won 8/24** — "topics where you appear"; **PR targets 19** — "pitchable AI-trusted domains".
- Caption: *"The one dark object on this page: the AI-visibility scoreboard, the module's flagship read."*

### 3. Share of voice + the actual AI answer
- Eyebrow (right column): **"The actual answer"**
- Headline: **"Read what the engines really say about you."**
- Body: *"Every tracked question, every engine, sampled twice because AI answers vary. When you are missing, you see the answer that replaced you, and the rivals it named instead."*
- Left mock UI (URL `app.searchscope.io/intelligence/brand-ai`, tab **"Share of voice"**): "Share of voice by engine", sub "questions that don't name your brand"; header row "who the engines name · non-brand answers"; bars:
  - **Northwind Outfitters** (you) — 22%
  - Alpine Trail Co — 41%
  - Summit & Sky — 28%
  - Ridgeline Gear — 18%
  - Basecamp Supply — 11%
- Right "actual answer" card: engine label "AI Overview", verdict "doesn't mention you"; question *"'Best waterproof jackets for UK hiking?'"*; answer body: *"For wet British hills, most guides point to Alpine Trail Co and Summit & Sky for their Gore-Tex range, with OutdoorsMagic rating both highly for breathability [1][2]."* (Alpine Trail Co and Summit & Sky highlighted); source chips: outdoorsmagic.com · alpinetrail.co.uk · reddit.com.

### 4. "The thesis, plotted" (brand strength vs AI visibility)
- Eyebrow: **"The thesis, plotted"**
- Headline: **"Stronger brands get recommended by AI."**
- Body: *"Plot brand strength against how often AI mentions each name. The pattern is consistent: the brands buyers search for by name are the brands the engines quote. The amber zone is unclaimed territory, strong demand that AI is not yet crediting to you."*
- Mock UI (URL `app.searchscope.io/intelligence/brand-ai`, tab **"Brand strength vs AI"**): "Brand strength vs AI visibility", sub "bubble = branded searches / month"; legend "you / rivals". A scatter with an amber dashed "UNCLAIMED" zone; the "you" bubble (emerald) sits low-AI / mid-brand. Callout: **"UNCLAIMED — Northwind Outfitters — strong demand · low AI mentions"**. Axes "weak brand ← / → strong brand", "AI mentions ↑".
  - Note: *"You have the searches. The engines have not caught up. That gap is exactly what PR closes."*

### 5. Citations + PR activity (paired panels)
- Left mock UI (tab **"Citations"**): "The sources AI trusts in your space", sub "24 answers · you appear on 6". Rows (domain · kind · cites · cites you / not you):
  - outdoorsmagic.com · publisher · 14 cites · **not you**
  - reddit.com · platform · 11 cites · **not you**
  - trailrunning.co.uk · publisher · 7 cites · **cites you**
  - alpinetrail.co.uk · competitor · 6 cites · **not you**
  - walkhighlands.co.uk · publisher · 5 cites · **not you**
  - Note: *"19 high-frequency sources do not reference you yet. Each one is a pitch."*
- Right mock UI (tab **"PR & Mentions"**): "PR activity", sub "new referring domains per month"; a 12-month bar chart of "mentions · last 12 months" with a highlighted "◆ = campaign burst" column; three PR rows:
  - **"Alpine Trail Co is running a PR campaign right now"** — status "burst" — "+12 referring domains this month vs a baseline of 4 · digital PR"
  - **"Northwind cited by Trail Running UK"** — status "secured" — "gear round-up · now feeding the AI answers"
  - **"Waterproofs explainer pitched to OutdoorsMagic"** — status "drafted" — "by the PR strategist · awaiting send"

### 6. Campaign radar (interactive "Investigate")
- Eyebrow: **"Campaign radar · the proof"**
- Headline: **"Content alone won't get you cited. Being covered will."**
- Body: *"The timeline flags when a rival's PR spikes. The radar opens the spike up. Searchscope pulls the actual links they earned that month, groups them by the asset that won them, and names the campaign behind the burst. This is the lever moving the numbers above: AI answers name the brands the press talks about, and this is where you see exactly how they earned it, and how you take it back."*
- Interactive mock (URL `app.searchscope.io/intelligence/brand-ai`, tab **"Campaign radar"**): a pending state — *"Alpine Trail Co · burst in June 2026 — +12 new referring domains vs a baseline of 4 · someone ran a campaign"* — with an **"Investigate"** button that (on scroll / click) reveals the campaign card:
  - Header: "Alpine Trail Co · June 2026" — "Winter jackets round-up, pitched to the outdoor press" — "12 new domains · 3 assets · earned links only" — tag **"Digital PR"**.
  - Summary: *"Alpine Trail published one strong seasonal round-up and pitched it hard. It earned **12 new editorial domains in four weeks**, nearly all pointing at that single guide. This is why they now lead the AI answers you are missing from: the exact publishers feeding those answers were freshly linked to them, not you."*
  - "The content that earned the links":
    - Asset **`alpinetrail.co.uk/guides/best-winter-jackets-2026`** — "8 earned · 2 boilerplate":
      - "The best winter jackets we tested this year" — outdoorsmagic.com · linked as "Alpine Trail's guide"
      - "Winter kit list 2026" — walkhighlands.co.uk · linked as "the full round-up"
      - "Cold-weather layering, explained" — trailrunning.co.uk · linked as "Alpine Trail Co"
      - "2 boilerplate or product links not shown (privacy pages, footers, naked-URL anchors)"
    - Asset **`alpinetrail.co.uk/blog/gore-tex-explained`** — "3 earned"
    - Asset **`alpinetrail.co.uk/tents/4-season-guide`** — "1 earned · 4 boilerplate"
  - "Counter angle": *"**You already rank for these queries on thinner pages.** Rebuild your winter-layering guide into the better-tested version, then pitch the same three publishers who covered Alpine Trail. The citation follows the stronger asset, and the AI answer follows the citation."* — CTA chip **"✦ Counter this campaign → PR strategist"**.
  - Note: *"Fifteen brands publish this guide every year. The one AI names is the one the press linked to. That is a PR outcome, not a content one, and it is the play this module hands you."*
- Caption: *"The radar turns a spike in a rival's backlinks into a named campaign, its winning asset and a counter-pitch, so brand PR becomes a measured, repeatable move rather than a guess."*

### 7. The PR strategist (chat handoff)
- Eyebrow (right column): **"The PR strategist"**
- Headline: **"Tracking is half of it. This closes the gap."**
- Body: *"Reach the module's PR mode and the advisor changes job: it reads your AI visibility, your brand benchmark and the citation gaps, then proposes who to pitch, in what order, and drafts the asset. Digital PR is the mechanism that moves the share of answers, so the strategist is built in, not bolted on."*
- Aside line: "PR starters: diagnose my AI visibility · who should I pitch this month?"
- Left dark chat object (header "PR Strategist · grounded in your AI visibility", context "AI Visibility · Brand · PR · Web"):
  - Question: *"Why does AI recommend my competitors instead of me?"*
  - Pulls: "✓ read 24 answers across 3 engines · scored share of voice"; "✓ cross-checked the 19 sources AI cites in your space".
  - Answer: **"Because the sources feeding the answers do not mention you yet."** *"Alpine Trail is cited by OutdoorsMagic and Walkhighlands; you are on neither. They also ran a digital-PR burst last month (+12 referring domains). Three moves, in order:"* with a table:
    - "Pitch OutdoorsMagic waterproofs explainer" — 14 cites
    - "Get listed on Walkhighlands gear guide" — 5 cites
    - "Reddit r/CampingUK founder AMA" — 11 cites
    - Closing: *"Land these and your share of voice should move from 22% toward the mid-thirties by the next benchmark."*
  - Chips: **"Build the pitch list"** (active), "Draft the explainer", "Set a brand objective".
- Footnote: *"Reproduces the real Brand and AI views: the inverted score-gauge overview, share of voice by engine, the actual AI answer with highlighted rivals and cited sources, the brand-strength-vs-AI-visibility scatter with its unclaimed-territory zone, citations with a PR-target read, the monthly PR-activity timeline with a burst call-out, the Campaign Radar, and the PR Strategist handoff. The answer engines are shown without model names."*

### 8. CTA band
- Eyebrow: **"The other half of visibility"**
- Title: **"Find out what the answers say about you."**
- Sub: *"Join the pilot programme and the first interview of the AI engines is on us: your brand, your buyers' questions, the real answers, and the PR targets that move them."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See the Intelligence Hub"** (`/intelligence`).

---

## 7. Content Studio (route `/content-studio`, `src/pages/content-studio.astro`)

**Purpose / thesis:** The execution layer. Turn a finding (or a URL/prompt) into research → brief → draft, with a placement picker that shows the exact spot on the page the new section belongs. Every workspace's "Create brief" lands here prefilled.

### 1. Page hero
- Eyebrow: **"Content Studio"**
- Headline: **"From finding to draft, without the blank page."**
- Lede: *"Paste a URL to improve it, or describe the piece, and the studio gets up to speed first: it reads your page, finds the top-ranking competitors, reads them too. Then it writes the brief and the draft, and tells you the exact spot on the page it belongs. Every workspace has a 'Create brief' button that lands you here, prefilled."*

### 2. Studio landing (command bar)
- Eyebrow: **"Studio landing"**
- Headline: **"Describe the piece. It knows the intent."**
- Mock UI (URL `app.searchscope.io/content-studio`, tab **"Content Studio"**): a command bar with placeholder *"Paste a URL to improve it, or describe the piece…"* and a **"Start"** button; preset chips:
  - "Fix: waterproof jacket guide is decaying"
  - "New: base layers +18% demand"
  - **"Start from a finding"** (active)
- Caption: *"The preset chips are live: the top unresolved finding, the hottest rising cluster, and a jump into the findings list."*

### 3. "It researches before it writes"
- Eyebrow (right column): **"It researches before it writes"**
- Headline: **"Live results research, then a brief you trust."**
- Body: *"No hallucinated outline. The studio scrapes the pages actually ranking for your target, reads what they cover, and briefs against the real competition. You watch it happen in a streaming run-log, then it hands you a document."*
- Aside line: "Prefilled from the decay workspace: page, target queries, the gap".
- Left mock UI (URL `app.searchscope.io/content-studio/session`, tab **"Getting up to speed"**): "Getting up to speed on this page" for `/guides/how-to-choose-a-waterproof-jacket`, "about 0:40 left"; a four-step checklist:
  1. "Reading the page" — done — "1,640 words read"
  2. "Finding top-ranking competitors" — done — "5 results found"
  3. "Reading the competitor pages" — live — "reading 3 of 5…"
  4. "Ready" — queued
  - Streaming run-log lines:
    - `14:22:07` — "✓ scraped target · 1,640 words"
    - `14:22:12` — "✓ SERP top 5 · alpinetrail, summitandsky, outdoorsmagic…"
    - `14:22:19` — "· reading competitor 3 of 5…"

### 4. Compose — brief + placement
- Eyebrow: **"Compose"**
- Headline: **"Brief, draft and the exact placement, end to end."**
- Mock UI (URL `app.searchscope.io/content-studio/session`, tab **"Brief"**):
  - Source tag: "from · Content decay · `/guides/how-to-choose-a-waterproof-jacket`"
  - Brief title: **"How to choose a waterproof jacket for UK hiking"**; meta "refresh brief · target 'waterproof jacket' · #7.8 → #3 in reach".
  - H2 outline (with gap tags):
    - H2 "Waterproof ratings explained: what the numbers mean" — **covers gap**
    - H2 "Breathability vs waterproofing: the trade-off" — **covers gap**
    - H2 "2 layer vs 3 layer construction" — new
    - H2 "How to care for a waterproof jacket" — new
    - H2 "Our pick by activity and budget" — keep
  - Placement row: label "Placement" — **"Insert after 'Breathability' section"** (active) · "Show on page".
  - Action chips: **"Write the draft"** (ink primary) · "Copy brief" · "Export .md".
- Footnote: *"The placement picker mirrors the improvement it came from: insert, expand or replace, drawn on the page's real heading outline so a writer knows precisely where the section lands. Matches the real Content Studio: the command bar with live preset chips, the four-step 'getting up to speed' checklist with a streaming run-log, and the compose view's brief-to-draft document."*

### 5. CTA band
- Eyebrow: **"From finding to shipped"**
- Title: **"Turn your first finding into a draft."**
- Sub: *"Join the pilot programme and we will take a live finding from your site through research, brief and placement, so you see the whole arc on your own page."*
- Buttons: "Join the pilot programme →" (`/contact`) + secondary **"See Reports"** (`/reports`).

---

## 8. Reports (route `/reports`, `src/pages/reports.astro`)

**Purpose / thesis:** The reporting layer. One report from live search data, recomposed for whoever opens it (client / board / marketing / technical), exportable to PDF, slide deck or workbook. Built around an interactive audience-switching composer. (This page uses a bespoke light "Instrument" layout, not the shared PageHero/CTABand components.)

### 1. Hero + the interactive composer
- Eyebrow: **"Reporting"**
- Headline: **"The report writes itself. You just decide who reads it."**
- Alternate straplines (shown as mono "or ·" lines): *"Every finding, told the way each stakeholder needs to hear it."* / *"The read, reshaped for whoever opens it."*
- Sub copy: *"Compose a report from your live search data whenever you need one. Pick who's reading and it reshapes itself: **the board gets the headline and the decision, the marketing team gets the levers, the technical team gets the issue detail.** One click sends it as a PDF, a slide deck or a workbook."*
- CTAs: **"Join the pilot programme →"** (`/contact`) + **"Try the composer ↓"** (anchor to `#composer`).
- **Interactive composer** (URL `app.searchscope.io/reporting`, tab "Report composer") — a live, audience-switching report builder:
  - **Control rail:** Audience buttons **"Your client" / "The board" / "Marketing team" / "Technical team"**; a "Sections" toggle set (8 composable sections: Executive summary, Performance, Wins shipped, Risks & watch-list, Brand & AI visibility, Workspace detail, Actions done, Action plan); Export buttons **PDF (.pdf) / Slide deck (.pptx) / Workbook (.xlsx)**; a "↻ Regenerate" button; a "Recent reports" list ("Weekly intelligence · w/c 30 Jun", "Weekly intelligence · w/c 23 Jun", "Monthly review · w/c 02 Jun").
  - **Paper preview:** masthead "Weekly intelligence — Northwind Outfitters · w/c 6 July 2026", "Prepared for [audience] by Searchscope". Sections animate in / out as you change audience, each with a "drafting…" status then a "drafted ✓" flag.
  - Sample per-audience straplines (verbatim):
    - Your client: *"Written for your client. Plain English, the wins first, and exactly what happens next."*
    - The board: *"Written for the board. The headline numbers, the one risk that matters, and the decision in front of you."*
    - Marketing team: *"Written for the marketing team. Every lever pulled, with the detail to move on."*
    - Technical team: *"Written for the technical team. Issue-level detail, every fix logged, nothing hand-waved."*
  - Sample section content (Northwind Outfitters data) generated inside the paper:
    - **Executive summary** (varies by audience) — e.g. client: *"Good week. Clicks are up 6.2%, and the winter-layering guide we rebuilt last month is back on page one… people are searching for 4-season tents more than ever right now, but your buyer's guide has slipped and a competitor took the top spot. We've already written the fix…"* (board/marketing/technical variants also present).
    - **Performance** KPIs: Clicks **48,210** (▲6.2%), Impressions **1.42M** (▲4.1%), Avg position **12.8** (▲1.4); "61 pages up, 14 down since last week".
    - **Wins shipped:** rebuilt winter-layering guide; merged men's/women's waterproof boot pages into `/boots/waterproof`; fixed structured data on 14 product pages; wrote two new briefs (4-season tent guide, merino base-layer explainer).
    - **Risks & watch-list:** 4-season tents (searches +18%, guide dropped to page two, Alpine Trail Co took top, ~5,600 clicks/month at stake); `/guides/tent-buying` decaying (clicks −31% over 90 days); "merino base layers" stalled at position 8.
    - **Brand & AI visibility:** share bars Northwind 22% / Alpine Trail Co 41% / Summit & Sky 28%; AI-answer quote for "best waterproof hiking boots for the UK" — verdict *"Stocked, not recommended. Two gear round-ups drafted to earn the citation."*
    - **Workspace detail:** opportunities — "waterproof hiking boots" pos 6 +3,200; "4-season tent" pos 11 +5,600; "merino base layers" pos 8 +2,100. "3 of 41 open opportunities."
    - **Actions done** (mono log): merged boot URLs + redirects live; canonical fixed on 6 boot-filter URLs; product schema patched on 14 pages; flagged `/guides/tent-buying` (lost 9 internal links since May).
    - **Action plan:** refresh the 4-season tent guide this week; publish the merino base-layer guide; chase two gear round-ups for AI citations; point internal links from boot pages into the tent guide.
  - Export confirmations (mono): PDF "prepared · N pages · ready to forward"; deck "prepared · N slides"; workbook "prepared · 214 rows · every finding".
- Caption: *"Client-ready reports that write themselves. Choose the reader; the page rewrites, section by section."*
- Stat row: **4** readers, one report · **3** export formats · **8** composable sections · **0** logins to read it.

### 2. "Who it's for"
- Eyebrow: **"Who it's for"**
- Headline: **"The person who signs off never logs in."**
- Body: *"One composed report, forwarded cold, still lands. Each reader gets the version written for them, and nothing about it looks generated."*
- Three cards:
  - **Your client — "The wins, in plain English":** "What moved, what you shipped and what's next. No jargon, and no dashboard to learn before the good news lands."
  - **The board — "Two numbers and a decision":** "The summary is tight enough to read in the meeting it's forwarded to, with the one risk that actually needs a call."
  - **The team — "Issue-level detail, logged":** "Every fix applied, every opportunity ranked, the briefs attached. Enough to act on before the next standup."

### 3. Pull quote
- Quote: *"Proof the work moved the needle, in the language your stakeholders already speak."* — cited as **"The read, on demand"**.

### 4. Export / formats
- Eyebrow: **"One click out"**
- Headline: **"One report, three ways to send it."**
- Body: *"The same composed report leaves as whatever the moment needs. A doc to forward, a slide deck to present, a workbook with every finding to sort and filter. One click, no copy-paste and no reformatting."*
- Format list: **.pdf — "Portable document" / "The report, ready to forward"**; **.pptx — "Slide deck" / "The five slides that matter"**; **.xlsx — "Workbook" / "Every finding, filterable"**; each "1 click →".
- Caption: *"One click to PDF or a slide deck. The workbook carries every finding the report summarises."*

### 5. Closing CTA band
- Eyebrow: **"Work with us"**
- Headline: **"See what your next report could look like."**
- Body: *"A real strategist points Searchscope at your own site and shows you the first report it composes. No pitch deck, no obligation, just the page your stakeholders would actually read."*
- CTAs: **"Join the pilot programme"** (`/contact`) + **"See the platform"** (`/platform`).

---

## Cross-page notes for the owner

- **Consistent fiction:** Every page uses **Northwind Outfitters** (a UK outdoor-gear retailer) as "you", with rivals **Alpine Trail Co** (domain `alpinetrail.co.uk` / `alpinetrail`), **Summit & Sky** (`summitandsky`), plus **Ridgeline Gear** and **Basecamp Supply** (Brand & AI only). Recurring publisher/source domains: `outdoorsmagic.com`, `walkhighlands.co.uk`, `trailrunning.co.uk`, `reddit.com`. Recurring example pages: waterproof jacket guide, down jackets collection, hiking boots, 4-season tents, merino base layers, winter-layering guide.
- **Recurring stat spine:** 1,240 pages crawled · 169 findings · 5 critical · 486 days / 12.4M rows of search data · 58 opportunities · 41 decay findings — these numbers repeat across Homepage, Data Pipeline, Workspaces and Intelligence, so a change to one may need matching edits elsewhere.
- **Every page closes on the same CTA** — "Join the pilot programme" → `/contact` — with a "secondary" link that hops to the next feature page, forming a tour loop.

### Possible placeholder / TODO / attention items
- **`/contact` form is in demo mode.** In `src/consts.ts`, `FORM.web3formsKey` is empty with a TODO: *"paste the real Web3Forms access key below to make the contact form submit in-app."* Until set, the pilot-programme form (the primary CTA target on every page) opens a pre-filled email to `ray@growthmindedmarketing.com` instead of posting. Worth confirming before launch since every CTA leads there.
- **Two nav/footer links point at pages not in this review set:** "Future of SEO" → `/search-systems` (referenced heavily on the homepage as "the full thesis") and "Blog" → `/blog`, plus the footer's "How it works" → `/how-it-works`. These were not part of this content map — confirm they exist and are finished.
- **Reports masthead date is hard-coded** to "w/c 6 July 2026" (and recent-reports dates to late June 2026); the Campaign Radar is dated "June 2026". These are static sample dates that will age.
- **Contact detail mismatch to note:** the footer brand blurb and "Connect" column expose `ray@growthmindedmarketing.com` (from `FORM.inbox` / `SOCIALS`), while `SITE`/memory reference `clients@growthmindedmarketing.com`. Not a bug, but worth a deliberate decision on which inbox is public.
- **No real screenshots anywhere** — all "app" views are hand-built HTML/SVG mockups with fictional data (by design), not captures of the live product. If the owner expects real UI, that is a gap.
- The Platform hub footnote references a **"Page Experience (Core Web Vitals and accessibility)" tool marked "Soon"** and deliberately omitted from the site until it ships — flagged in case the owner wants it surfaced.
