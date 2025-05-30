import { href } from 'react-router'
import type { Route } from './+types/about'
import { Post } from '../components/post'
import { getMetaFromPost, type Post as PostType } from '../contents'

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return data ? getMetaFromPost(data) : []
}

export async function loader() {
  return {
    title: 'About',
    description:
      'I&apos;m Greg, a self-taught software developer with a love for building clean code and breaking speed limits—both in projects and on the road.',
    language: 'en',
    href: href('/about'),
    meta: {
      author: { name: 'Greg Gajda', url: 'https://devmint.pl' },
      datePublished: new Date(Date.parse('2025-05-30')),
      dateModified: new Date(Date.parse('2025-05-30')),
      headline: 'About',
      image: [],
    },
  } satisfies Omit<PostType, 'content'>
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <Post className="m-auto max-w-[768px] pl-4 pr-4" {...loaderData}>
      <header className="text-theme-black not-prose font-black">
        <h1 className="text-9xl">Hi</h1>
        <h2 className="text-6xl">My name&apos;s Greg</h2>
      </header>

      <p>
        I&apos;m Greg, a self-taught software developer with a love for building clean code and breaking speed limits—both in
        projects and on the road. From fine-tuning backend systems to binge-reading manga and cheering during F1 weekends, I live
        at the intersection of logic and passion. This blog is my digital garage for experiments, notes, and ideas worth sharing.
      </p>
    </Post>
  )
}
