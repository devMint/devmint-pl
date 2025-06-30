import { href } from 'react-router'
import type { Route } from './+types/_index'
import { PostList } from '../components/post-list'
import { posts } from '../contents'

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'devMint' },
    { name: 'description', content: 'a mint of creativity' },
    { property: 'og:title', content: `devMint` },
    { property: 'og:description', content: 'a mint of creativity' },
    { property: 'og:url', content: href('/') },
    { property: 'og:locale', content: 'en_US' },
  ]
}

export async function loader() {
  return Object.values(posts).map((post) => post.meta)
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <div className="enter-page w-full m-auto p-4 max-w-[768px]">
      <PostList groupBy={(post) => post.meta.datePublished.getFullYear().toString()} posts={loaderData} />
    </div>
  )
}
