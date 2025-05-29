import type { MetaDescriptor } from 'react-router'
import * as v from 'valibot'
import { PictureSchema } from '../../components/picture'

const PostSchema = v.object({
  title: v.string(),
  description: v.string(),
  href: v.string(),
  cover: v.object({
    ...PictureSchema.entries,
    alt: v.optional(v.string()),
  }),
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
    image: v.array(v.omit(PictureSchema, ['fallback'])),
  }),
  language: v.optional(v.picklist(['pl', 'en']), 'pl'),
})

export function definePost(
  schema: v.InferInput<typeof PostSchema>,
  content?: (props: v.InferOutput<typeof PostSchema>) => React.ReactNode,
) {
  try {
    const post = v.parse(PostSchema, schema)
    return {
      ...post,
      content: () => content ? content(post) : null,
    }
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

export function getMeta(post: Omit<v.InferOutput<typeof PostSchema>, 'content'>): MetaDescriptor[] {
  const ogImage =
    Array.isArray(post.meta.image) && post.meta.image.length > 0
      ? post.meta.image.map((img) => ({ property: 'og:image', content: img }))
      : [{ property: 'og:image', content: post.cover.image.img.src }]

  return [
    { title: `${post.title} - devMint` },
    { name: 'description', content: post.description },
    { property: 'og:title', content: `${post.title} - devMint` },
    { property: 'og:description', content: post.description },
    { property: 'og:url', content: post.href },
    { property: 'og:locale', content: post.language === 'pl' ? 'pl_PL' : 'en_US' },
    ...ogImage,
  ]
}

export type Post = ReturnType<typeof definePost> & {
  content: () => React.ReactNode
}
