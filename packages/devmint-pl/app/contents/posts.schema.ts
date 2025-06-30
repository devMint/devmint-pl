import type { MetaDescriptor } from 'react-router'
import * as v from 'valibot'

const PostSchema = v.object({
  title: v.string(),
  description: v.pipe(v.string(), v.maxLength(155, '155 is limit by SEO Meta Tags for <meta name="description" />')),
  href: v.string(),
  meta: v.object({
    author: v.optional(
      v.object({
        name: v.string(),
        url: v.optional(v.pipe(v.string(), v.url())),
      }),
      { name: 'Greg Gajda', url: 'https://devmint.pl' },
    ),
    dateModified: v.date(),
    datePublished: v.date(),
    headline: v.string(),
    image: v.array(v.string()),
  }),
  language: v.optional(v.picklist(['pl', 'en']), 'pl'),
})

export function definePost(schema: v.InferInput<typeof PostSchema>) {
  try {
    const post = v.parse(PostSchema, schema)
    return post
  } catch (e) {
    console.error(`Failed to parse post schema for '${schema.title}'`)
    console.error('========= SCHEMA =========')
    console.error(JSON.stringify(schema, null, 2))
    if (e instanceof v.ValiError) {
      console.error('========= VALIDATION ERROR =========')
      console.error('Error:', e.message)
      console.error('Issues:', e.issues)
    }

    throw e
  }
}

/**
 * Creates OpenGraph meta tags for SEO using post data.
 * Generates meta descriptors for title, description, URL, locale and images.
 * Images are taken either from post.meta.image array or from post.cover if available.
 *
 * @param post - Post data to generate meta tags from
 * @returns Array of meta descriptors for SEO
 */
export function getMetaFromPost(post: PostType): MetaDescriptor[] {
  const ogImage =
    Array.isArray(post.meta.image) && post.meta.image.length > 0
      ? post.meta.image.map((img) => ({ property: 'og:image', content: img }))
      : []

  return [
    { title: `${post.title} - devMint` },
    { name: 'description', content: post.description },
    { name: 'author', content: post.meta.author.name },

    /**
     * X/Twitter
     */
    { property: 'twitter:card', content: post.description },
    { property: 'twitter:site', content: '@GrzegorzGajda' },
    { property: 'twitter:1title', content: post.title },
    { property: 'twitter:description', content: post.description },
    { property: 'twitter:creator', content: post.meta.author.name },

    /**
     * OpenGraph
     */
    { property: 'og:title', content: post.title },
    { property: 'og:type', content: 'article' },
    { property: 'og:description', content: post.description },
    { property: 'og:url', content: post.href },
    { property: 'og:site_name', content: 'devMint' },
    { property: 'og:locale', content: post.language === 'pl' ? 'pl_PL' : 'en_US' },
    ...ogImage,
  ]
}

export type PostType = v.InferOutput<typeof PostSchema>
