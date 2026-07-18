# Launch staging branch

Do not merge. This branch exists so Netlify builds the full Astro site
(netlify.toml [context.launch]) at a stable URL while production keeps
serving holding/. The Website CMS preview rail points at it. See cms.md.
