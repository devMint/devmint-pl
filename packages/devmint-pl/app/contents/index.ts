import { href } from 'react-router'
import { definePost } from './posts.schema'
import opengraph from '../images/hidden-dependencies.png?w=1200&responsive'
import { compile } from '@mdx-js/mdx'

export const posts = {
  [href('/teksty/:slug', { slug: 'hidden-cost-of-dependencies' })]: {
    meta: definePost({
      title: 'Hidden cost of dependencies',
      description: 'Wielu programistów ciągnie do pisania aplikacji serwerowych w Node.js z',
      href: href('/teksty/:slug', { slug: 'hidden-cost-of-dependencies' }),
      meta: {
        dateModified: new Date(Date.parse('2025-06-25')),
        datePublished: new Date(Date.parse('2025-06-25')),
        headline: 'Hidden cost of dependencies',
        image: [opengraph.imageUrlFor(1200, 'png') ?? ''],
      },
    }),
    content: String(
      await compile({ path: './posts/2025-06-hidden-cost-of-dependencies.mdx' }, { outputFormat: 'function-body' }),
    ),
  },
}
