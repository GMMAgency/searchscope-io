import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { BLOG_TAGS } from './consts';

/**
 * Field Notes — the blog. Markdown files in src/content/blog/.
 * Add a post = drop in a new .md file with this frontmatter.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Growth Minded Marketing'),
    // tags should come from the shared taxonomy (BLOG_TAGS) but free tags allowed
    tags: z.array(z.string()).default(['Search Systems']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

export { BLOG_TAGS };
