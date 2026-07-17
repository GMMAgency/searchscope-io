/**
 * Site-wide constants. Single source of truth for brand, URLs and nav.
 */

export const SITE = {
  name: 'Searchscope',
  domain: 'searchscope.io',
  url: 'https://searchscope.io',
  /** Used in the <title> tail and OG site_name */
  title: 'AI SEO Co-Pilot & Search Intelligence Platform | Searchscope',
  tagline: 'Your search co-pilot for the AI era.',
  description:
    'Searchscope is an AI search intelligence co-pilot for SEO and growth teams. It reads your whole search picture, tells you what to fix and why, and our strategists turn it into growth.',
  /** Default social share image (1200×630) served from /public */
  ogImage: '/og/searchscope-og.png',
  locale: 'en_GB',
  themeColor: '#121113',
} as const;

/** Typography template.
 *  'dark'  = Funnel Display grotesque headlines + Fraunces serif accents (CHOSEN);
 *            "dark" is a legacy name, it does NOT force dark mode (mode = data-mode).
 *  'mono'  = monospace "code" headlines (Geist Mono).
 *  'paper' = Funnel Display with lighter weights.
 *  Geist Mono is always used for labels/eyebrows/data regardless. */
export const SKIN: 'dark' | 'paper' | 'mono' = 'dark';

/** Default colour mode used for the first paint / no-JS / no saved choice. */
export const DEFAULT_MODE: 'light' | 'dark' = 'light';

/** Light-mode "paper" (background). Only affects light mode.
 *  'white' = clean neutral white (CHOSEN) · '' = soft off-white ·
 *  'warm' = warm white with a faint peach hint · 'cream' = the original beige. */
export const PAPER: '' | 'white' | 'warm' | 'cream' = 'white';

/** If true, a first-time visitor with no saved choice follows their OS
 *  light/dark setting. If false, everyone starts on DEFAULT_MODE. Either
 *  way, the in-page toggle always wins and is remembered. */
export const RESPECT_SYSTEM_MODE = true;

/** Show the light/dark toggle in the nav. When false the site is LOCKED to
 *  DEFAULT_MODE (light): the toggle is hidden, system dark preference is
 *  ignored, and any saved choice is cleared. All the dark-mode tokens,
 *  `.theme-*` styles and ModeToggle component stay in the codebase, just
 *  unused. Flip back to true to bring dark mode back. */
export const SHOW_MODE_TOGGLE = false;

/** Dev-only template switcher (Dark/Paper/Mono). Off for the live site. */
export const SHOW_SKIN_SWITCHER = false;

/** Temporary live tester for the light-mode background (White/Soft/Warm/Cream).
 *  Soft is locked in, so this is off. */
export const SHOW_PAPER_SWITCHER = false;

/** Brand accent. '' = signal-green (locked) · 'orange' = Mistral-style
 *  red-orange · 'tangerine' = brighter orange · 'coral' = pink-orange.
 *  Decision: staying green. */
export const ACCENT: '' | 'orange' | 'tangerine' | 'coral' = '';

/** Temporary live tester for the accent colour. Off once you've picked one. */
export const SHOW_ACCENT_SWITCHER = false;

/** The agency behind Searchscope, every funnel ends here. */
export const GMM = {
  name: 'Growth Minded Marketing',
  url: 'https://growthmindedmarketing.com/',
} as const;

/** Where the contact form should be processed.
 *  Drop in your Web3Forms access key (free, no backend) or swap for
 *  Formspree / Netlify Forms. Until set, the form runs in demo mode
 *  (opens a pre-filled email to FORM.inbox instead of posting).
 *
 *  TODO: paste the real Web3Forms access key below to make the contact
 *  form submit in-app. Get a free key at https://web3forms.com. */
export const FORM = {
  /** https://web3forms.com, paste your access key here (TODO: real key) */
  web3formsKey: '',
  /** Inbox the enquiries should reach */
  inbox: 'ray@growthmindedmarketing.com',
} as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/growth-minded-marketing/' },
  { label: 'X', href: 'https://x.com/olaibi_ray' },
] as const;

/** Lean top nav. The six feature pages are reached from the Platform
 *  overview and the footer, so the top bar stays calm (concept IA). */
export const NAV_LINKS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Future of SEO', href: '/search-systems' },
  { label: 'Blog', href: '/blog' },
] as const;

/** The six feature areas, in product order. One page each, reached from
 *  the Platform overview index, the homepage feature index and the footer.
 *  This replaces the old seven near-identical analyser story pages. */
export const FEATURES = [
  {
    no: '01',
    name: 'Data Pipeline',
    href: '/platform/data-pipeline',
    line: 'Sync your search data, crawl your site, run the analysers. Watch the engine work in a live terminal. This is what feeds everything else.',
  },
  {
    no: '02',
    name: 'Analyser Workspaces',
    href: '/workspaces',
    line: 'Seven analysers hand you a queue of findings, each one scored, judged and with the fix drafted. Work top to bottom and clear the week.',
  },
  {
    no: '03',
    name: 'Intelligence Hub',
    href: '/intelligence',
    line: 'Your performance, the competitive gap, rising demand and an AI strategist that has already read your data. The command centre.',
  },
  {
    no: '04',
    name: 'Brand and AI Visibility',
    href: '/brand-and-ai',
    neu: true,
    line: 'See how AI answers describe you, who they recommend instead, and which sources they trust. Then move the numbers with digital PR and a dedicated strategist.',
  },
  {
    no: '05',
    name: 'Content Studio',
    href: '/content-studio',
    line: 'Turn a finding into research, a brief and a draft, with the exact spot on the page it belongs. The execution layer.',
  },
  {
    no: '06',
    name: 'Reports',
    href: '/reports',
    line: 'A client-ready report that writes itself, in the voice of whoever is reading it. Export to PDF, a slide deck or a workbook.',
  },
] as const;

/** The canonical seven analysers, in order. Named as a set on the Data
 *  Pipeline fleet table and the Analyser Workspaces page (no longer a
 *  page each). */
export const ANALYZERS = [
  { slug: 'index-bloat', name: 'Index bloat' },
  { slug: 'internal-links', name: 'Internal links' },
  { slug: 'cannibalisation', name: 'Cannibalisation' },
  { slug: 'content-decay', name: 'Content decay' },
  { slug: 'opportunities', name: 'Opportunities' },
  { slug: 'schema', name: 'Schema' },
  { slug: 'cluster-volatility', name: 'Cluster volatility' },
] as const;

/** Blog taxonomy, the filter rail on /blog */
export const BLOG_TAGS = [
  'Algorithm Updates',
  'Search Systems',
  'AI Search',
  'Search data',
  'Experiments',
  'Agency',
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];
