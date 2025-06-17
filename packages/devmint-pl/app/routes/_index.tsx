import { href } from 'react-router'
import type { Route } from './+types/_index'
import { Snippet } from '../components/snippet'
import { posts } from '../contents'

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'devMint' },
    { name: 'description', content: 'devMint' },
    { property: 'og:title', content: `devMint` },
    { property: 'og:description', content: 'a mint of creativity' },
    { property: 'og:url', content: href('/') },
    { property: 'og:locale', content: 'en_US' },
  ]
}

export default function Index() {
  const [featured1, featured2] = posts

  return (
    <div className="m-auto w-full max-w-[768px] p-4">
      <Snippet post={featured1} size="lg" />
      <div className="mt-4 flex flex-row gap-4">
        <Snippet post={featured2} size="md" />
        <Snippet post={featured1} size="md" />
      </div>
    </div>
  )
}
