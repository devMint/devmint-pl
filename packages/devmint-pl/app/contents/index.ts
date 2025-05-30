import { Feed } from 'feed'
import { getMetaFromPost, type Post } from './posts/schema'

export const posts = [(await import('./posts/hidden-cost-of-dependencies/hidden-cost-of-dependecies')).default]

export type { Post }
export { getMetaFromPost }

export async function getFeed() {
  const siteUrl = 'https://devmint.pl'
  const feed = new Feed({
    title: 'devMint',
    id: siteUrl,
    link: siteUrl,
    copyright: 'All rights reserved 2025, devMint',
    favicon: `${siteUrl}/favicon.svg`,
    feedLinks: {
      atom: `${siteUrl}/atom.xml`,
      rss: 'https://devmint.pl/rss.xml',
    },
    author: {
      name: 'Greg Gajda',
      email: 'grzegorz.gajda@devmint.pl',
      link: 'https://devmint.pl/about',
    },
  })

  feed.addItem({
    link: 'https://devmint.pl',
    title: 'devMint',
    description: 'devMint',
    date: new Date(Date.parse('2025-05-30')),
  })

  posts.forEach((post) => {
    feed.addItem({
      id: `https://devmint.pl/${post.href}`,
      link: `https://devmint.pl/${post.href}`,
      title: post.title,
      date: post.meta.datePublished,
      description: post.description,
    })
  })

  return feed
}
