import { Readable } from 'node:stream'
import type { SitemapItemLoose } from 'sitemap'
import { Feed } from 'feed'
import { EnumChangefreq, SitemapStream, streamToPromise } from 'sitemap'

async function getPosts() {
  return []
}

/**
 * Creates RSS and Atom feeds for the devMint blog
 *
 * This function generates both RSS and Atom feed formats containing all blog posts
 * and site information. The feed includes metadata like title, author, copyright,
 * and favicon, along with individual entries for each blog post.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const feed = await getFeed()
 *
 * // Generate RSS feed
 * const rss = feed.rss2()
 *
 * // Generate Atom feed
 * const atom = feed.atom1()
 *
 * // Get feed as JSON
 * const json = feed.json1()
 * ```
 *
 * @example
 * ```typescript
 * // In a Remix route handler
 * export async function loader() {
 *   const feed = await getFeed()
 *   return new Response(feed.rss2(), {
 *     headers: {
 *       'Content-Type': 'application/rss+xml',
 *     },
 *   })
 * }
 * ```
 */
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
      rss: `${siteUrl}/rss.xml`,
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

  const posts = await getPosts()
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

/**
 * Creates an XML sitemap for the website.
 *
 * @example
 * ```typescript
 * // In a Remix route handler
 * export async function loader() {
 *   const sitemap = await getSitemap()
 *   return new Response(sitemap, {
 *     headers: {
 *       'Content-Type': 'application/xml',
 *     },
 *   })
 * }
 * ```
 *
 * @example
 * ```xml
 * <!-- Generated sitemap structure -->
 * <?xml version="1.0" encoding="UTF-8"?>
 * <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 *   <url>
 *     <loc>https://devmint.pl/</loc>
 *     <changefreq>weekly</changefreq>
 *   </url>
 *   <url>
 *     <loc>https://devmint.pl/about</loc>
 *     <changefreq>never</changefreq>
 *   </url>
 *   <url>
 *     <loc>https://devmint.pl/posts/2025-06-hidden-cost-of-dependencies</loc>
 *     <changefreq>daily</changefreq>
 *   </url>
 * </urlset>
 * ```
 */
export async function getSitemap() {
  const posts = await getPosts()
  const sitemapItems: SitemapItemLoose[] = [
    { url: '/', changefreq: EnumChangefreq.WEEKLY },
    { url: '/about', changefreq: EnumChangefreq.NEVER },
    ...posts.map((post) => ({
      url: post.href,
      changefreq: EnumChangefreq.DAILY,
    })),
  ]

  const sitemap = new SitemapStream({ hostname: 'https://devmint.pl' })
  const stream = Readable.from(sitemapItems).pipe(sitemap)

  const data = await streamToPromise(stream)
  return data.toString()
}
