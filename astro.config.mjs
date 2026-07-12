// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical production URL. Update if the domain changes.
const SITE = 'https://searchscope.io';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // Keep non-content and noindex routes out of the sitemap
      filter: (page) => !page.includes('/404') && !page.includes('/privacy'),
    }),
  ],
  build: {
    // Emit clean URLs (/platform instead of /platform.html)
    format: 'directory',
  },
  // Self-hosted fonts + minimal JS = fast LCP. No experimental flags needed.
});
