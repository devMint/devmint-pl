import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publicationDate: z.date({ coerce: true }),
      slug: z.string(),
      cover: z.object({
        img: image(),
        alt: z.string().optional(),
      }),
      meta: z.object({
        author: z.object({
          name: z.string(),
          url: z.string().optional(),
        }),
        dateModified: z.date({ coerce: true }).optional(),
        datePublished: z.date({ coerce: true }),
        headline: z.string(),
        image: z.array(z.string()),
      }),
    }),
})

const weeklies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/weeklies' }),
  schema: z.object({
    publicationDate: z.date({ coerce: true }),
  }),
})

export const collections = { posts, weeklies }
