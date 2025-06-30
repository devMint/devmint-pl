import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(155, '155 is limit by SEO Meta Tags for <meta name="description" />'),
      slug: z.string(),
      href: z.string(),
      meta: z.object({
        author: z
          .object({
            name: z.string(),
            url: z.string().url().optional(),
          })
          .optional()
          .default({ name: 'Greg Gajda', url: 'https://devmint.pl' }),
        dateModified: z.coerce.date(),
        datePublished: z.coerce.date(),
        headline: z.string(),
        image: image(),
      }),
      language: z.enum(['pl', 'en']).optional().default('pl'),
    }),
})

export const collections = { posts }
