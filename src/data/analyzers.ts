/**
 * The seven analyser story pages: one template, seven fills. Each targets a
 * problem people actually search, named in the visitor's own words, with the
 * machine shown catching it and the fix shown drafted. All mocks use the one
 * fictional client, Northwind Outfitters (northwindoutfitters.com).
 */

export interface Stat { v: string; n?: string; l: string; }
export interface Row { l: string; r: string; } // r may contain severity spans
export interface Play { b: string; rest: string; }

export interface Analyzer {
  slug: string;
  name: string;
  heroTitle: string;
  heroLede: string;
  catchTitle: string;
  catchBody: string;
  /** 'decay' uses the DecayTrend card; everything else uses the rows card */
  viz: 'decay' | 'rows';
  decaySub?: string;
  decayNote?: string;
  cardTab?: string;
  cardTitle?: string;
  cardSub?: string;
  badge?: { t: string; p: string; m: string };
  rows?: Row[];
  note?: string;
  stats?: Stat[];
  play: Play[];
  related: { href: string; label: string };
}

export const analyzers: Analyzer[] = [
  {
    slug: 'index-bloat',
    name: 'Index health',
    heroTitle: 'Pages that should be working aren’t even indexed.',
    heroLede:
      'Index bloat is two problems at once: thousands of thin or duplicate URLs crowd the index and dilute the pages you care about, while a few pages you’d want ranking sit quietly excluded. Either way, engines spend their attention in the wrong place.',
    catchTitle: 'Coverage, canonicals and sitemaps, read together.',
    catchBody:
      'Every Monday the index analyser reconciles what you’ve published, what’s in your sitemaps, and what engines have actually indexed. It flags the URLs crowding the index that shouldn’t be there, and the pages that should be indexed and aren’t, with the reason for each.',
    viz: 'rows',
    cardTab: 'Index health',
    cardTitle: 'Index coverage · northwindoutfitters.com',
    cardSub: 'found Monday 02:07 · needs attention',
    badge: { t: 'INDEX BLOAT', p: '/shop?sort= &colour=', m: '1,240 filter URLs indexed' },
    rows: [
      { l: '/shop?sort= &colour= (filters)', r: '1,240 URLs · <span class="bad">should be canonical</span>' },
      { l: '/tents/4-season', r: '<span class="ok">indexed</span> · canonical ok' },
      { l: '/journal/winter-layering-old', r: '<span class="wn2">duplicate</span> of /journal/winter-layering' },
      { l: '/boots/waterproof-guide', r: '<span class="bad">excluded</span> · crawled, not indexed' },
    ],
    note: '1,240 filter URLs are eating crawl budget while 6 pages you’d want ranking sit excluded. Both fixes are drafted.',
    stats: [
      { v: '1,240', n: '1240', l: 'Bloat URLs' },
      { v: '6', n: '6', l: 'Wrongly excluded' },
      { v: '3', n: '3', l: 'Canonicals to set' },
    ],
    play: [
      { b: 'Canonicalise the filter and sort URLs.', rest: 'Point the 1,240 faceted URLs at their parent category, so engines index one page, not a thousand.' },
      { b: 'Return the six excluded pages to the index.', rest: 'Each was dropped for a fixable reason: a thin intro, a missing canonical, or a stray noindex.' },
      { b: 'Prune what shouldn’t exist.', rest: 'Old campaign URLs and duplicate journal posts get a redirect, not a place in the index.' },
      { b: 'Brief ready in Content Studio.', rest: 'Where an excluded page is thin, the refresh that earns it back is already outlined.' },
    ],
    related: { href: '/search-systems', label: 'The thinking behind it → The future of SEO' },
  },
  {
    slug: 'internal-links',
    name: 'Internal links',
    heroTitle: 'Your best page is three clicks deep and nothing links to it.',
    heroLede:
      'Internal links are how you tell engines which pages matter. When strong pages sit deep with few links in, the system reads them as unimportant, however good they are, and they never rank to their potential.',
    catchTitle: 'The whole link graph, mapped and weighed.',
    catchBody:
      'Searchscope graphs every internal link on your site, then finds the mismatches: high-value pages with too few links in, orphan pages with none, and link equity pooling where it isn’t needed. For each weak page it suggests the exact hubs to link from, with anchor text.',
    viz: 'rows',
    cardTab: 'Internal links',
    cardTitle: 'Link graph · 9,812 internal links',
    cardSub: 'found Monday 02:22 · 1 critical',
    badge: { t: 'ORPHAN', p: '/boots/waterproof-care', m: '0 internal links in' },
    rows: [
      { l: '/boots/waterproof-care', r: '<span class="bad">0 links in</span> · earns 2,400 clicks/mo' },
      { l: '/tents/4-season', r: '<span class="wn2">2 links in</span> · suggest 4 more' },
      { l: '/base-layers/merino', r: '<span class="wn2">1 link in</span> · 3 clicks deep' },
      { l: '/shop (hub)', r: '<span class="ok">96 links out</span> · equity to redistribute' },
    ],
    note: '12 strong pages carry fewer than three internal links. Anchors are suggested per link, ready to place.',
    stats: [
      { v: '12', n: '12', l: 'Under-linked' },
      { v: '1', n: '1', l: 'Orphan page' },
      { v: '34', n: '34', l: 'Anchors suggested' },
    ],
    play: [
      { b: 'Link the orphan back in.', rest: '/boots/waterproof-care earns clicks with zero internal links; three hub pages should point to it.' },
      { b: 'Feed your money pages from the hubs.', rest: '/tents/4-season needs four more links from the tents category and two journal posts.' },
      { b: 'Shorten the click depth.', rest: 'Pages three clicks deep get promoted into the relevant hub, so they sit two clicks from home.' },
      { b: 'Use the suggested anchors.', rest: 'Each link comes with anchor text drawn from the page’s own ranking queries.' },
    ],
    related: { href: '/search-systems', label: 'The thinking behind it → The future of SEO' },
  },
  {
    slug: 'cannibalisation',
    name: 'Cannibalisation',
    heroTitle: 'Two of your pages are fighting over one search, and both are losing.',
    heroLede:
      'Keyword cannibalisation is when several pages target one intent. Engines can’t tell which is the answer, so rankings swap between URLs, clicks split, and neither page wins. It looks like bad luck. It’s a structure problem.',
    catchTitle: 'Shared-query pairs, and who’s actually winning.',
    catchBody:
      'Every Monday the cannibalisation analyser finds page pairs competing for the same queries, measures how the clicks split, and counts how often the ranking URL swaps. Then it drafts the fix: consolidate, redirect, or differentiate, with the winner chosen from the data.',
    viz: 'rows',
    cardTab: 'Cannibalisation',
    cardTitle: '/boots/waterproof vs /shop/waterproof-boots',
    cardSub: 'found Monday 02:31 · critical',
    badge: { t: 'SPLIT 61 / 39', p: '/boots/waterproof ↔ /shop/waterproof-boots', m: 'positions swapping ×9' },
    rows: [
      { l: '/boots/waterproof', r: '<span class="ok">wins 61%</span> · 130 of 214 queries' },
      { l: '/shop/waterproof-boots', r: '39% · 84 of 214 queries' },
      { l: 'position swaps', r: '<span class="bad">×9 in 90 days</span>' },
    ],
    note: 'The two pages have swapped the top spot nine times in 90 days. The plan keeps /boots/waterproof and redirects the other.',
    stats: [
      { v: '214', n: '214', l: 'Shared queries' },
      { v: '9', n: '9', l: 'Position swaps' },
      { v: '1', n: '1', l: 'Pair like this' },
    ],
    play: [
      { b: 'Pick the winner from the data.', rest: '/boots/waterproof already takes 61% of the shared queries, so it’s the page to keep.' },
      { b: 'Redirect the loser into it.', rest: '/shop/waterproof-boots 301s to the winner, and its useful sections merge in.' },
      { b: 'Differentiate anything worth keeping.', rest: 'If a page targets a genuinely different intent, retitle and re-scope it instead of merging.' },
      { b: 'Brief ready in Content Studio.', rest: 'The merged outline and the redirect map are drafted, ready to ship.' },
    ],
    related: { href: '/blog/cannibalisation-is-a-data-problem', label: 'The data behind it → Cannibalisation is a data problem' },
  },
  {
    slug: 'content-decay',
    name: 'Content decay',
    heroTitle: 'Your best pages are quietly dying.',
    heroLede:
      'Content decay is traffic loss without an event: no penalty, no drop to point at, just pages that earned their rankings slowly losing them to fresher, fuller answers. Because the totals stay smooth, most teams find out quarters late.',
    catchTitle: 'Trend, demand and intent, cross-examined weekly.',
    catchBody:
      'Every Monday the decay analyser reads 90-day trends across every page with traffic, then cross-checks each decline against market demand and the queries’ current intent. A page losing clicks while its topic grows is decay; a page losing clicks because demand left is a different decision. The analyser tells you which is which.',
    viz: 'decay',
    decaySub: 'found Monday 02:14 · critical',
    decayNote: 'Clicks down 34% over 90 days while the topic’s demand grew 12%. Position slipped 4.2 → 7.8 on 12 queries.',
    play: [
      { b: 'Refresh the intro for the dominant intent.', rest: 'The queries moved from "winter hiking checklist" to "how to layer"; the page still answers last year’s question.' },
      { b: 'Add the two missing H2s', rest: 'competitors now cover: a base-to-shell breakdown, and the common layering mistakes people make.' },
      { b: 'Re-link from three hub pages.', rest: 'The page lost internal links in a nav change; the internal-links analyser flags the exact three to restore.' },
      { b: 'Brief ready in Content Studio.', rest: 'Outline, entities and target queries drafted; your writer starts at 80%.' },
    ],
    related: { href: '/blog/reading-demand-vs-your-share', label: 'The demand read behind it → Reading demand vs your share' },
  },
  {
    slug: 'opportunities',
    name: 'Opportunities',
    heroTitle: 'You’re on page one for searches you never actually targeted.',
    heroLede:
      'Some of your biggest wins are pages already ranking 4th to 15th for queries they only half-answer. A little focus, one heading, one section, and they move onto the podium. The trouble is spotting them among thousands of queries.',
    catchTitle: 'Near-miss rankings, matched to missing headings.',
    catchBody:
      'Searchscope finds pages sitting in positions 4 to 15, then checks each against the queries it could own with a bit more coverage. Where a page ranks for a query it barely addresses, it flags the exact heading to add, with the clicks that are within reach.',
    viz: 'rows',
    cardTab: 'Opportunities',
    cardTitle: '/tents/4-season · near-miss queries',
    cardSub: 'found Monday 02:41 · quick win',
    badge: { t: 'QUICK WIN', p: '/tents/4-season', m: 'one H2 covers 9 queries' },
    rows: [
      { l: 'how to choose a 4 season tent', r: 'pos <span class="wn2">6</span> · <span class="ok">+3,100 clicks in reach</span>' },
      { l: '4 season vs 3 season tent', r: 'pos <span class="wn2">9</span> · no section on the page' },
      { l: 'best 4 season tent uk', r: 'pos <span class="wn2">11</span> · thin match' },
    ],
    note: 'One page, nine buying-intent queries, one missing H2. The brief is ready in Content Studio.',
    stats: [
      { v: '49', n: '49', l: 'Opportunities' },
      { v: '+8,900', n: '8900', l: 'Clicks in reach' },
      { v: '12', n: '12', l: 'Quick wins' },
    ],
    play: [
      { b: 'Add the heading that covers the cluster.', rest: 'Nine queries share one intent /tents/4-season doesn’t answer; one H2 closes the gap.' },
      { b: 'Match the intent that’s actually searched.', rest: 'The queries moved from "best" to "how to choose"; the section should answer the newer one.' },
      { b: 'Fill the gaps the top three cover.', rest: 'Content Studio maps the headings the ranking pages have that you don’t.' },
      { b: 'Brief ready in Content Studio.', rest: 'Outline, entities and target queries drafted; your writer starts at 80%.' },
    ],
    related: { href: '/blog/reading-demand-vs-your-share', label: 'The demand read behind it → Reading demand vs your share' },
  },
  {
    slug: 'schema',
    name: 'Schema',
    heroTitle: 'Competitors get stars and prices in the results. You get a blue link.',
    heroLede:
      'Structured data is how you earn the rich results that win the click: review stars, prices, FAQs, breadcrumbs. When your schema is missing or broken, engines fall back to a plain link, and you lose the click before anyone reads the page.',
    catchTitle: 'Schema checked against what each page could earn.',
    catchBody:
      'Searchscope reads the structured data on every page and compares it to the rich results the page is eligible for. It flags missing, invalid and incomplete schema, and drafts the exact JSON-LD to add, page type by page type.',
    viz: 'rows',
    cardTab: 'Schema',
    cardTitle: 'Rich-result eligibility · 239 pages',
    cardSub: 'found Monday 02:49 · 11 fixable today',
    badge: { t: 'MISSING', p: '/tents/4-season', m: 'Product schema eligible, absent' },
    rows: [
      { l: '/tents/4-season', r: '<span class="bad">Product: missing</span> · price + stock eligible' },
      { l: '11 article pages', r: '<span class="wn2">Article: incomplete</span> · no author or date' },
      { l: '/boots/waterproof', r: '<span class="ok">Product: valid</span> · stars showing' },
    ],
    note: '11 article pages lost their rich results after a template change. The corrected JSON-LD is drafted for each.',
    stats: [
      { v: '24', n: '24', l: 'Schema findings' },
      { v: '11', n: '11', l: 'Fixable today' },
      { v: '3', n: '3', l: 'Result types eligible' },
    ],
    play: [
      { b: 'Add Product schema to the shop pages.', rest: 'Price and stock are eligible; the JSON-LD is drafted, ready to paste.' },
      { b: 'Repair the article schema.', rest: 'Eleven posts lost author and date fields in a template change; rich results return once they’re back.' },
      { b: 'Validate before you ship.', rest: 'Each fix is checked against the eligibility rules, so you’re not guessing.' },
      { b: 'Watch the results reappear.', rest: 'Impact tracking confirms when the rich results come back in the SERP.' },
    ],
    related: { href: '/search-systems', label: 'The thinking behind it → The future of SEO' },
  },
  {
    slug: 'cluster-volatility',
    name: 'Cluster volatility',
    heroTitle: 'A whole topic is slipping, and no single page shows it.',
    heroLede:
      'Cluster volatility is decay you can’t see one URL at a time. A group of related queries drifts, rankings wobble across several pages, and because no single page falls off a cliff, nothing triggers an alert. The topic quietly leaves you.',
    catchTitle: 'Topics tracked as clusters, not scattered keywords.',
    catchBody:
      'Searchscope groups your queries into semantic clusters, then watches each cluster’s position stability and whether a single page owns it. When a cluster turns volatile, or its demand rises with no clear home, it flags the topic and the page that should own it.',
    viz: 'rows',
    cardTab: 'Cluster volatility',
    cardTitle: "'winter hiking gear' cluster",
    cardSub: 'found Monday 02:56 · no dominant page',
    badge: { t: 'NO HOME', p: 'winter hiking gear', m: 'demand ↑ 18% · 18 queries adrift' },
    rows: [
      { l: 'winter hiking gear (cluster)', r: '<span class="bad">no dominant page</span> · 18 queries' },
      { l: 'cluster demand', r: '<span class="wn2">↑ 18%</span> this quarter' },
      { l: 'ranking pages', r: 'spread across <span class="wn2">4 URLs</span>, none owning it' },
    ],
    note: 'Eighteen queries in a rising cluster have no page that owns them. A hub at /winter would consolidate them.',
    stats: [
      { v: '214', n: '214', l: 'Clusters' },
      { v: '12', n: '12', l: 'Volatile' },
      { v: '3', n: '3', l: 'Need a home' },
    ],
    play: [
      { b: 'Give the cluster a home.', rest: 'Eighteen queries drift across four pages; a hub at /winter gives them one owner.' },
      { b: 'Fold the scattered pages in.', rest: 'The strongest existing page becomes the hub; the rest link up to it or merge.' },
      { b: 'Move before demand peaks.', rest: 'The cluster’s demand is up 18% this quarter, so the window to own it is now.' },
      { b: 'Brief ready in Content Studio.', rest: 'The hub outline and the four supporting briefs are drafted.' },
    ],
    related: { href: '/blog/reading-demand-vs-your-share', label: 'The demand read behind it → Reading demand vs your share' },
  },
];
