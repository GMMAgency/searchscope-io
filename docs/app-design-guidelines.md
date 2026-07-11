# Search Scope: App Visual Guidelines

> A design-language handoff for the **Search Scope product app**, derived from the marketing site
> (searchscope.io). The app already exists; treat this as an **alignment + best-practice guide** to
> bring its visual language into line with the brand.
>
> The brand name is **Search Scope** (two words) in prose; the **logotype is the compact one-word
> lowercase `searchscope`** set in Geist Mono. The domain stays `searchscope.io`.
>
> The marketing repo already contains **reference implementations** of the core app patterns as
> Astro mocks, look at these first, they encode most of what follows:
> `src/components/mocks/MockAnalyzer.astro` (findings table), `MockGapCards.astro` (opportunity
> cards + sparklines), `MockCrawler.astro` (stat dashboard), `MockContentStudio.astro` (brief),
> `MockAdvisor.astro` (chat), `MockWeekly.astro` (digest), and `src/components/ScatterHero.astro`
> (Demand & Trends scatter). Design tokens live in `src/styles/tokens.css`. **Ready-made logo assets
> live in `public/brand/`** (see §5).

---

## 1. The one-paragraph brief

Search Scope is a **precise instrument**, not a generic SaaS dashboard. The app is **monochrome**
(black / white / grey) on a soft off-white, with **bold dark "inverted" metric cards**, **black pill
tabs and buttons**, and a clean type system for dense data. The **only colour anywhere is in the data
itself**: the signal: rising / falling / at-risk. There is no brand accent colour; the "accent" is
simply ink (black on light, white on dark). The brand has a quiet "scope / instrument" character:
a geometric **viewfinder** logomark, monospaced labels, and the occasional corner-tick or faint
coordinate grid. If a screen looks like a generic Bootstrap admin panel, it's wrong. If it looks like
a precise instrument someone trusts, it's right. (This mirrors the marketing site at searchscope.io:
monochrome, Geist headlines, Geist Mono labels, colour only in the data viz.)

---

## 2. Principles

1. **Colour only where it means something.** The UI chrome is monochrome. The *only* colour is in the
   data: **green = rising / up / good**, **red = falling / down / critical**, **amber = weak /
   warning**, **blue = brand / impressions**, **grey = flat**. No coloured brand accent.
2. **One type system: Geist + Inter (the "mono-spine").** The whole brand is the **Geist superfamily**
   (Geist Sans + Geist Mono), with **Inter** carrying sustained reading. Geist **Mono** is the
   "instrument" layer: nav items, button/pill labels, eyebrows, table headers, file paths, IDs, badges
   and **all tabular numbers**. Geist **Sans** is for big display titles and hero metric numbers.
   **Inter** is for anything read in sentences: descriptions, body, table *text* cells, chat prose.
   (Rule of thumb: mono for labels and numbers, Inter for sentences. Don't set whole tables of prose in
   mono, it fatigues.)
3. **Inverted metric cards are the signature.** Key metrics live in **dark cards** (near-black on
   light; they invert to light cards on dark): a big number, a small uppercase label, and a coloured
   delta (`↘ 27.3%` red, `↗ 36.2%` green). This is the most recognisable Search Scope pattern.
4. **Black pill UI.** Active tabs and primary buttons are **solid black pills** (white on dark);
   inactive tabs and secondary buttons are light / hairline-ghost. Toggles are black-on / grey-off.
   Pill/button labels are **Geist Mono**.
5. **Quiet "scope" character.** The viewfinder logomark, mono labels, and the optional **corner-ticks /
   faint coordinate-grid** motifs (§5) give the app an instrument feel. Use the motifs **sparingly, as
   accents** (one framed element per view, a faint grid behind a hero or empty state), never as wallpaper.
6. **Density with air.** It's a data tool, so it's information-dense, but every view has breathing
   room, hairline dividers instead of heavy borders, and a clear hierarchy. Dense ≠ cramped.
7. **Hairlines over shadows; warm, never flat.** Warm near-black (dark) and a soft off-white (light),
   1px hairline borders, a faint grain so large surfaces never feel dead. No pure `#000`, no harsh
   black lines, no drop-shadow soup. (Cards may sit at pure `#fff` on light; metric cards at near-black.)
8. **Disciplined motion.** Purposeful only: a number ticking, a row revealing, a scan on a live crawl.
   Fast (160–280ms), eased, respects `prefers-reduced-motion`.
9. **Light and dark are equal citizens.** Both first-class. The inverted cards flip, the data hues
   shift to their legible variants. Design and test both.

---

## 3. Colour

Monochrome neutrals, an inverted (ink) accent, and a data palette. Use **semantic tokens**, not raw hex, in components.

### Neutrals

> **Light mode = clean white.** White cards on a near-white section, separated by hairlines (not by
> a warm tint). No cream/beige. The dark mode stays warm near-black.

| Token | Dark mode | Light mode (White) | Use |
|---|---|---|---|
| `--bg` | `#121113` | `#FBFBFB` | App background / overscroll |
| `--surface` | `#1C1A1B` | `#FFFFFF` | Cards, panels, table surface |
| `--surface-2` | `#232021` | `#F1F1F0` | Inset / nested / hover surface |
| `--border` | `#2E2B2C` | `rgba(22,20,15,0.11)` | Hairlines, dividers, card borders |
| `--text` | `#F4F1EC` | `#16150F` | Primary text |
| `--text-dim` | `rgba(244,241,236,.64)` | `rgba(22,20,15,.62)` | Secondary text, descriptions |
| `--text-faint` | `rgba(244,241,236,.40)` | `rgba(22,20,15,.42)` | Labels, meta, axis ticks |

### Accent (MONOCHROME, there is no brand colour)

The "accent" is just ink: black-on-light, white-on-dark. Primary buttons and active pills **invert**
(black pill + white label on light; white pill + black label on dark). Colour never lives in chrome.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#F4F1EC` | `#1B1A17` | Primary button fill, active pill, key value |
| `--accent-hover` | `#FFFFFF` | `#000000` | Hover / pressed |
| `--on-accent` | `#16140F` | `#FFFFFF` | Text/icon **on** the accent fill (inverted) |
| `--accent-soft` | `rgba(244,241,236,.10)` | `rgba(22,20,15,.07)` | Tints, active-row wash, ghost hover |

### Data palette (the ONLY colour in the app)

Colour appears exclusively in the data, and it carries meaning. Use the **bright hue** for dots,
bubbles, bars, sparklines and deltas; use the **text variant** when the hue is small badge/label text
(the bright hues fail contrast as small text, especially amber and blue on light).

| Meaning | Token | Dot / fill / line | Text on light | Text on dark |
|---|---|---|---|---|
| Rising · up · winning · positive delta | `--sev-emerald` (green) | `#34D399` | `#15937A` | `#34D399` |
| Falling · down · critical · losing share | `--sev-rose` (red) | `#FB7185` | `#E11D48` | `#FB7185` |
| Weak · at-risk · warning | `--sev-amber` | `#FBBF24` | `#B45309` | `#FBBF24` |
| Brand · impressions (chart series) | `--sev-blue` | `#60A5FA` | `#2563EB` | `#60A5FA` |
| Flat · no change / neutral data | `--sev-flat` | `#9AA0A6` | `#6B7280` | `#9AA0A6` |

Score badges (e.g. a `93` cluster score) use **red-tinted** when the cluster is losing share, neutral
grey otherwise. Position bars are a **green → amber → red** gradient with an ink dot.

---

## 4. Typography

The brand is the **Geist superfamily** (Geist Sans + Geist Mono), with **Inter** for sustained reading
and **Fraunces** for rare editorial moments. Each has a clear job, the "mono-spine" split (Principle 2)
is the load-bearing idea: **mono for labels & numbers, Inter for sentences, Geist Sans for big titles.**

| Family | Token | Role |
|---|---|---|
| **Geist Sans** | `--font-display` | **Big titles + hero metric numbers**: page headers ("Intelligence Hub"), section titles, empty-state / onboarding headlines, the large numbers in inverted metric cards. Weight ~600, `letter-spacing` ~ -0.02em. |
| **Geist Mono** | `--font-mono` | **The instrument layer**: nav items, button/pill/tab labels, eyebrows (`SURFACED FOR YOU`), table headers, badges/chips, file paths (`/blog/...`), URLs, IDs, code, and **every tabular number** (scores, deltas, counters, table numerics). Always `tabular-nums`. |
| **Inter** | `--font-body` | **Reading.** Descriptions, body copy, table *text* cells, form values, chat prose, long-form, anything multi-sentence. |
| **Fraunces** *(optional)* | `--font-serif` | Editorial only, if ever: a large pull-quote in a report/digest. Not part of the core UI. |

### Scale (app, fixed, denser than the fluid marketing scale)

| Token | Size / line | Use |
|---|---|---|
| `--text-2xl` | 28 / 32 | Page title (sparingly) |
| `--text-xl` | 22 / 28 | Section title |
| `--text-lg` | 18 / 26 | Card title, big stat label |
| `--text-md` | 15 / 22 | Default body |
| `--text-sm` | 13 / 20 | Table cells, secondary |
| `--text-xs` | 12 / 16 | Labels, meta, chips (mono + uppercase + `letter-spacing: .06em`) |
| `--metric` | 24–32 | Hero metric numbers (Geist Sans or Mono, `tabular-nums`, `letter-spacing: -.02em`) |

**Rules**
- Headings airier, not heavy: display titles at **weight ~600** (not 700), `letter-spacing` -0.02em
  to -0.03em. Eyebrow/label chips: `+0.06em–0.12em` + `text-transform: uppercase`, mono.
- **Always use `font-variant-numeric: tabular-nums`** for any column of numbers, deltas, scores, or
  live counters so they align and don't jitter when animating.
- Mono uppercase labels are the signature "techy" texture, use them for eyebrows, table headers,
  stat captions (`OPPORTUNITY SCORE`, `INTERNAL LINKS`, `P1`).
- Don't set whole paragraphs or prose-heavy tables in mono, mono reads dense at sentence length.

---

## 5. Logo, mark & instrument motifs

The app and login page should carry the brand mark. **Ready-made assets live in the marketing repo at
`public/brand/`** (and a copy in `~/Downloads/searchscope-brand/`). The wordmark is **outlined to vector
paths**, so the files render identically with no font installed.

### The mark & logotype
- **Mark = a geometric viewfinder**: four corner brackets framing a bright **signal node** plus a faint
  secondary point, "the scope finding the signal." All straight lines, no curves. (This replaced an
  older circle/scope; don't reintroduce rings.)
- **Logotype = lowercase `searchscope`** in Geist Mono 500, compact, one word, even though the product
  is written **Search Scope** in prose. Screen-reader/`aria-label` name is "Search Scope".

### Assets (use these, don't redraw)
| File | Use |
|---|---|
| `searchscope-logo.svg` | Full lockup, **recolorable** (uses `currentColor`, defaults to ink). Tint with CSS `color`. |
| `searchscope-logo-on-dark.svg` / `.png` | Off-white lockup for **dark backgrounds** (e.g. a dark login screen). |
| `searchscope-mark.svg` / `-on-dark.svg` | Mark only, square, for favicons, avatars, the **collapsed sidebar**. |
| `searchscope-appicon.svg` / `-512.png` | Mark on a dark rounded tile, for **PWA / favicon / app launcher**. |

**Usage**: sidebar header shows the full lockup, collapsing to the mark when the nav collapses. The
**login / auth screen** centres the lockup (use `-on-dark` if that screen is dark). Keep clear space ≈
the mark's height around the lockup. Prefer the SVG; recolour `searchscope-logo.svg` via CSS `color` so
it adapts to light/dark. Don't recolour it into a data hue, don't add shadows/gradients, don't stretch.

### Instrument motifs (use sparingly, accents only)
- **Viewfinder corner-ticks**: four small corner brackets that echo the mark, used to **frame one
  focal element per view**: a hero/empty-state illustration, the primary onboarding card, a featured
  chart. Faint (`--text` at ~30%), thin. Never on every card, it loses meaning if repeated.
- **Faint coordinate-grid field**: a barely-there square grid (lines from `--text` at ~5%, masked so it
  fades at the edges) behind large open areas: the **login screen**, **empty states**, a dashboard hero
  band. It evokes the Demand scatter field. It must read as texture, not as a table grid.

(Reference implementations on the marketing site: `src/components/Ticks.astro` for the corner-ticks and
the `.bg-grid` utility in `src/styles/global.css` for the grid field.)

---

## 6. Spacing, radius, elevation, texture

- **Spacing:** 4px base, 8px rhythm. Scale: `4, 8, 12, 16, 24, 32, 48, 64`. Component padding 12–24px;
  page gutters 24–32px. Tables can go tighter (row padding 8–12px) but keep ≥8px.
- **Radius:** `--radius-xs 6 · --radius-s 10 · --radius-m 16 · --radius-l 24 · --radius-pill 999`.
  Cards/panels = `m`; inputs/buttons = `s`/pill; chips/badges = pill.
- **Borders:** prefer **1px hairlines** (`--border`) over shadows. A single hairline + a warm surface
  reads more premium than a drop shadow. Reserve elevation for true overlays (menus, modals, toasts).
- **Elevation (overlays only):** `0 18px 40px -24px rgba(0,0,0,.55)` (dark) / softer on light.
- **Grain:** a very faint fractal-noise overlay (opacity ~0.02–0.05, `mix-blend: overlay`) on large
  surfaces so they never feel flat. Subtle, you should barely notice it.

---

## 7. App shell & layout

- **Left sidebar nav** (collapsible) grouped by the product pipeline: **Crawler → Analyzer → Demand &
  Trends → Strategic Advisor → Content Studio → Weekly Intelligence**, plus project/site switcher at
  top and account at the bottom. Active item: `--accent-soft` wash + 2px accent left-edge + accent
  text. The **logo lockup sits at the top** (collapses to the mark, §5). Nav labels are mono.
- **Top bar:** current site/domain (mono), date range / crawl freshness ("Crawled 2h ago"), global
  search, the **light/dark toggle** (sun/moon, mirrors the marketing site), notifications.
- **Page header pattern:** mono eyebrow (section name) → title (Geist Sans) → a one-line description
  (Inter, dim) → primary action top-right.
- **Density:** default to a comfortable-but-dense grid; offer a "compact" table density toggle for
  power users. Max content width for reading views ~1200px; data tables can go full-width.
- **Login / auth:** centred logo lockup (use `-on-dark` on a dark screen), a faint coordinate-grid
  field behind it, a single clean card with the form. Quiet and instrument-like, not a marketing splash.

---

## 8. Core components

### Signature patterns (match these, they ARE the Search Scope app)

**Inverted metric card**: *the* hero pattern. A near-black card (`--text` background, `--surface`
text in light mode; it flips to a light card on dark) containing a small uppercase mono label
(`TOTAL CLICKS`), a big number (Geist Sans ~28px / 600, tabular), a coloured delta (`↘ 27.3%` red /
`↗ 36.2%` green), and a faint `5.8K prev` line. Used in **rows of 4** across the top of dashboards.

**Tabs & sub-tabs**: pill tabs, mono labels. Active = **solid black pill** (`--accent` bg +
`--on-accent` text); inactive = transparent, dim text. (Command Centre / Competitive Landscape /
Strategic Advisor; Overview / Queries / Pages.)

**Toggle**: a rounded switch, **black when on**, grey track when off. One per analyser row.

**Filter chips**: light hairline pills, icon + label, optional count badge (`Brand Keywords 3`).
`Save Filter` / primary actions are **solid black buttons** with mono labels.

**Analyzer row**: name + small `AI` badge, right-aligned `N findings`, `N critical` in **red**, and
a toggle. Grouped under mono section labels (`WORKSPACES`, `INTELLIGENCE`).

**Demand & Trends scatter**: x = your position (1 → 80, better → worse), y = demand/mo on a **log**
scale; bubble **size = demand**, **colour = trend** (green rising / grey flat / red falling). A shaded
amber **opportunity zone** rectangle = rising demand you rank weakly for. Legend top-right; four stat
tiles below (Clusters / Rising demand / Losing share / Addressable demand). This is the one chart that
may wear the **viewfinder corner-ticks** as the page's framed focal element.

**Cluster / opportunity card**: a red-tinted **score badge** (`93`), title + intent tag + `⚠ Losing
share` flag, two QoQ metrics with **sparklines** (demand green-up, visibility red-down), a **position
gradient bar** (green → amber → red with an ink dot), a `Ranks via /path · 5,222 impr · 0 clicks ·
⚠ 2 competing` line, and `Create Brief` / `Ask Advisor` actions.

**Strategic Advisor**: central "Your AI Strategy Partner" prompt, `SURFACED FOR YOU` insight cards
(each with an icon + `Dig into this`), quick-prompt chips, a right rail (Objectives / Quick Prompts /
Recent Conversations), and a chat input with a model selector (`GPT-5.1 · Balanced`) and a
grounding line ("Live access to your search data, analyzer findings, competitors and the web").

**AI credits**: a small floating `AI CREDITS · 659 left this week` badge (lightning glyph + thin
progress bar), bottom-right.

### Standard components

**Buttons**
- Primary: `--accent` fill, `--on-accent` text, pill radius, `padding: .7em 1.2em`, weight 500,
  **mono label**. Hover → `--accent-hover` + slight lift. One primary per view.
- Secondary/ghost: transparent, `--border`, `--text`; hover → `--surface-2` + accent-tinted border.
- Tertiary: text-only link with a sliding arrow (mono), `→`, for low-emphasis actions.
- Destructive: rose text/border; solid rose only for confirm-in-modal.

**Inputs / forms**
- `--surface` bg, `--border`, `--radius-s`, 12–14px padding. Focus: accent border + `0 0 0 3px
  var(--accent-soft)`. Labels: mono uppercase `--text-xs` `--text-dim`. Mono inputs for anything
  data-ish (URLs, keywords, numbers); Inter for prose fields.

**Cards / panels**: `--surface`, 1px `--border`, `--radius-m`. Header row: mono uppercase label left,
meta right. Hover (if interactive): border → accent-tinted.

**Tables (the workhorse, most of the app is lists of findings/pages/queries)**
- Header: mono uppercase `--text-xs` `--text-faint`, hairline bottom border, sticky on scroll.
- Rows: hairline dividers, `--surface` / hover `--surface-2`. **Numeric cells mono + tabular-nums,
  right-aligned.** **Text cells Inter.**
- First cell of a finding row: **severity dot + P-label** (see below). Page/URL cells: mono accent
  (`/pricing`).
- Support: sort, filter chips, density toggle, bulk-select, pagination ("6 of 23" in mono),
  row-expand for detail. Sticky header + first column for wide tables.

**Severity & criticality**: the app flags importance with **red**, never a brand colour. Analyser
rows show `N findings` with `N critical` in red; clusters/findings use a coloured flag (`⚠ Losing
share`) and a red-tinted score badge. Always pair the hue with a label or count, never colour alone.
Example: `Cannibalization · AI · 8 findings (2 critical)`.

**Chips / pills**: pill radius, `--border`, mono `--text-xs`. Filter chips, intent tags, issue pills
(`Losing share 72 · Cannibalized 42`). Active filter chip: **black fill** + `--on-accent`.

**Stat tile**: a big number (Geist Sans ~`--metric`, `--text`, tabular) over a small uppercase mono
label, optional sparkline or coloured delta. Light tiles (Crawler) and inverted dark cards (Command Centre).

**Delta**: `↗`/`↘` + value, mono `tabular-nums`, **green (up/good) / red (down/bad)**. Colour by
*meaning*, not direction: a falling position number is good, so it's green.

**Progress / live state**: slim pill bar, `--accent` fill on `--surface-2` track; live operations
(crawl) get a mono counter (`3,000 / 3,000 pages`) and a subtle scan animation.

**Empty / loading / error**
- Empty: centred, mono label + one Inter line + a primary action. Optional Geist Sans headline, and a
  faint grid field / a single corner-ticked illustration (§5) for character.
- Loading: **skeletons** in `--surface-2` (not spinners) for tables/cards; mono live status for jobs.
- Error: rose accent, plain-English message, a retry.

**Toasts / alerts**: top-right, `--surface`, hairline, severity left-edge, mono title + Inter detail,
auto-dismiss with a thin accent timer bar.

**Strategic Advisor (chat)**: user bubbles: `--accent-soft` + accent-tinted border, right-aligned.
Assistant: `--surface-2`, left-aligned, with an inline **data block** (mono, severity-tinted) and
action chips (`Draft the brief`, `Show the data`). Show a grounding line in mono
(`live search data · crawl · demand · competitors`). Typing indicator = three pulsing dots.

**Modal / drawer**: overlay with elevation; drawer (right) for finding detail, modal (centre) for
confirm/create. Backdrop: warm dark scrim.

---

## 9. Data visualisation (the heart of the product)

General rules:
- **Plot surface:** a hair lighter/darker than the page (`color-mix(--bg, --surface)`), 1px `--border`
  frame, faint hairline gridlines (~60% opacity).
- **Axis labels & ticks:** mono, `--text-faint`, ~11px, uppercase where short (`HIGH DEMAND →`).
- **Always pair a chart with its numbers** in mono nearby, the chart shows the shape, the mono number
  is the truth.
- **Colour = the data signal, not decoration.** Green = rising/up/good · red = falling/down/critical ·
  amber = weak · blue = brand/impressions · grey = flat. Never a sixth colour, and never colour in
  chrome. For categorical series, use neutral greys + one data hue, not a rainbow.
- **Motion:** entrance only (points fade/scale in with a small stagger; numbers count up once). No
  perpetual animation except a slow "live" pulse/scan on actively-updating views. Respect reduced-motion.

Per chart type:
- **Demand & Trends scatter** (the signature viz): x = **your position** (1 → 80, better → worse),
  y = **demand/mo on a log scale**; **bubble size = demand**, **bubble colour = trend** (green rising
  / grey flat / red falling). A shaded **amber opportunity zone** rectangle marks rising demand you
  rank weakly for. Legend top-right; four stat tiles below (Clusters / Rising demand / Losing share /
  Addressable demand). See `ScatterHero.astro`.
- **Sparklines:** ~1.6px stroke, `vector-effect: non-scaling-stroke`, data-hue (green up / red down),
  no axes/labels, inline in cards/rows.
- **Position bar:** a **green → amber → red** gradient track with an ink dot at the position.
- **Bars / distributions:** `--surface-2` track, ink or data-hue fill, mono value labels, tabular.
- **Scores:** 0–100, in a badge (red-tinted when losing share, neutral grey otherwise).

---

## 10. Iconography

- Line icons, **1.6px stroke**, `currentColor`, rounded caps/joins, 24px grid (render 16–22px).
- Match the marketing set in `src/components/Icon.astro` (scatter, analyzer, advisor, pulse, crawl,
  studio, connect, prioritise, recommend, execute, …). One consistent line weight everywhere, the same
  weight/feel as the viewfinder mark.
- No filled/duotone icon packs, no emoji as UI icons.

---

## 11. Per-surface cues

| Surface | What it looks like | Notes |
|---|---|---|
| **Command Centre** | **Row of 4 inverted dark metric cards** (Total Clicks / Impressions / Avg CTR / Avg Position with coloured deltas) over a performance line chart (clicks black, impressions blue), Brand vs Non-brand below. | The dashboard home. The inverted cards are the signature. |
| **Crawler** | Crawl-stats dashboard: progress + counter, grid of stat tiles (`Internal links 1,802`, `Entities 10,580`), technical-issues chips. | "We read your whole site" proof. A completed crawl reads **green** (success). |
| **Analyzer Engine** | **Analyser rows** (Indexation, Internal Links, Cannibalization, Content Decay, Schema, Opportunities, Cluster Intelligence) with an `AI` badge, `N findings`, `N critical` in red, and a toggle. Grouped under `WORKSPACES` / `INTELLIGENCE`. | Filter by analyser + severity. |
| **Demand & Trends** | The **position × demand** scatter + **cluster cards** (red score badge, intent tag, `⚠ Losing share`, demand/visibility QoQ sparklines, position gradient bar, ranks-via line). | Lead surface. "Losing share" is the key signal. |
| **Strategic Advisor** | "Your AI Strategy Partner" + `SURFACED FOR YOU` insight cards, quick-prompt chips, grounded chat (search data / Analyzers / Competitors / Objectives / Web), model selector. | Always cite the data; offer "Create Brief". |
| **Content Studio** | The **opportunity detail**: stat tiles, AI Recommendations (`⚡ Quick Win`, suggested title/meta), drafted content improvements (`✓ Drafted`), `Rebuild full page`. | The execution surface, insight → shipped page. |
| **Weekly Intelligence** | Inverted metric cards + a digest of "moves" with ↑/↓, shareable. | `Week of 16 Jun · 6 moves`. Email/share parity. |

---

## 12. Content & microcopy in the UI

- **Analyser names (the suite):** Indexation · Internal Links · Cannibalization · Content Decay ·
  Schema · Opportunities · Cluster Intelligence. **Finding/insight names within them** (use the
  specific insight in findings copy, it's what sells): index bloat, low-value indexed, thin content,
  crawled-not-indexed, duplicate titles, orphan pages, broken internal links, intent fragmentation
  (`overlap 64%`), steady / accelerating / long-term / position decay, striking distance, quick win,
  missing schema / missing properties, volatile cluster / fragmented coverage.
- **The brand is "Search Scope"** (two words) in any product copy; the logotype stays `searchscope`.
  Brand framing says **"search data"**, not "Search Console" / "GSC", except where a technical screen
  genuinely needs the literal Google product name.
- **File paths and URLs are mono**: `/pricing`, `/guides/seo-audit`.
- **Numbers look real and specific**: `412 URLs`, `−34% in 28d`, `pos 6`, `overlap 64%`, `1,802`.
- **Findings are one plain-English sentence** with the *why* and the *move*:
  `Crawled, not indexed. Thin templates diluting the cluster. Consolidate or prune.`
- **Voice:** confident, practitioner, plain-spoken, British English. No hype, no emoji in product
  copy, **no em dashes** (use commas, colons, or full stops).

---

## 13. Accessibility (non-negotiable)

- **Contrast:** body text ≥ 4.5:1, large text/UI ≥ 3:1. The data hues as *small text* must use their
  deeper `-ink` variants on light (§3); the bright hues are for dots, bars and lines, not small text.
- **Never colour alone for meaning.** A data state is always hue **+** a label/value (and/or icon),
  never colour by itself.
- **Focus:** visible `2px solid var(--accent)` outline, `outline-offset: 2–3px`, on every interactive
  element. Full keyboard support for tables, menus, the chat.
- **Targets:** ≥ 40px hit area for controls.
- **Motion:** honour `prefers-reduced-motion` (no count-ups, scans, reveals, or grid/tick animation).
- **Theme:** honour `prefers-color-scheme` for first paint; persist the user's toggle choice.
- **Numbers:** `tabular-nums` everywhere data aligns in columns.
- **Decorative motifs** (corner-ticks, grid field) are `aria-hidden` and never carry meaning.

---

## 14. Do / Don't

**Do**: monochrome chrome · Geist Sans for titles, Geist Mono for labels/numbers, Inter for sentences ·
colour only in data (green/red/amber/blue/grey) · inverted dark metric cards · black pill tabs &
buttons with mono labels · the viewfinder logo on the app + login · corner-ticks/grid **sparingly** ·
hairlines over shadows · `tabular-nums` · real numbers · test light *and* dark.

**Don't**: pure `#000`/`#fff` · any coloured brand accent (no green/orange/etc.) · colour in chrome ·
rainbow chart palettes · whole tables/paragraphs in mono (use Inter for prose) · the viewfinder/grid
motif on every card · a circle/ring logomark · drop-shadow soup · colour-only state (pair with a label) ·
spinners where a skeleton fits · perpetual animation · em dashes · emoji as icons.

---

## 15. Drop-in token reference (CSS custom properties)

```css
:root {
  /* families, the Geist superfamily + Inter for reading */
  --font-display: "Geist Variable", "Geist", system-ui, sans-serif; /* big titles + hero numbers */
  --font-mono:    "Geist Mono", ui-monospace, "SF Mono", "JetBrains Mono", monospace; /* labels + numbers */
  --font-body:    "Inter Variable", "Inter", system-ui, sans-serif;  /* reading */
  --font-serif:   "Fraunces", Georgia, serif;                        /* rare editorial pull-quotes */

  /* data palette, the ONLY colour in the app (mode-independent base hues) */
  --sev-emerald: #34d399; /* rising / up / good      */
  --sev-rose:    #fb7185; /* falling / down / critical */
  --sev-amber:   #fbbf24; /* weak / warning          */
  --sev-blue:    #60a5fa; /* brand / impressions     */
  --sev-flat:    #9aa0a6; /* flat / neutral          */
  /* deeper text variants for small text on light backgrounds */
  --sev-emerald-ink: #15937a;
  --sev-rose-ink:    #e11d48;
  --sev-amber-ink:   #b45309;
  --sev-blue-ink:    #2563eb;
  --sev-flat-ink:    #6b7280;

  /* radius / motion */
  --radius-xs: 6px; --radius-s: 10px; --radius-m: 16px; --radius-l: 24px; --radius-pill: 999px;
  --ease: cubic-bezier(.22, 1, .36, 1);
  --dur-fast: 160ms; --dur: 280ms; --dur-slow: 600ms;
}

/* DARK (default) */
:root, [data-mode="dark"] {
  --bg: #121113;
  --surface: #1c1a1b;
  --surface-2: #232021;
  --border: #2e2b2c;
  --text: #f4f1ec;
  --text-dim: rgba(244, 241, 236, .64);
  --text-faint: rgba(244, 241, 236, .40);
  /* accent = monochrome ink (white on dark); buttons/pills invert */
  --accent: #f4f1ec;
  --accent-hover: #ffffff;
  --on-accent: #16140f;
  --accent-soft: rgba(244, 241, 236, .10);
  color-scheme: dark;
}

/* LIGHT, clean white (white cards on near-white) */
[data-mode="light"] {
  --bg: #fbfbfb;
  --surface: #ffffff;
  --surface-2: #f1f1f0;
  --border: rgba(22, 20, 15, .11);
  --text: #16150f;
  --text-dim: rgba(22, 20, 15, .62);
  --text-faint: rgba(22, 20, 15, .42);
  --accent: #1b1a17;       /* near-black: black pill / button, ink text */
  --accent-hover: #000000;
  --on-accent: #ffffff;
  --accent-soft: rgba(22, 20, 15, .07);
  color-scheme: light;
}
```

---

*Source of truth: searchscope.io marketing site, tokens in `src/styles/tokens.css`, reference UI in
`src/components/mocks/`, logo assets in `public/brand/`. Keep the app and the marketing site visually in
lockstep; when in doubt, match the mocks.*
