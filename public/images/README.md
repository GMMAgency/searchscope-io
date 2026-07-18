# Images

General image assets for the site. Anything in this folder is served at
`/images/<filename>` on every deploy (staging and production).

Conventions:
- Kebab-case filenames: `team-photo-2026.jpg`, `platform-overview.png`
- Prefer SVG for graphics, WebP/JPEG for photos; keep files under ~300 KB
- Brand marks live in `/public/brand`, social/OG images in `/public/og`;
  this folder is for page content images (blog, features, screenshots)
