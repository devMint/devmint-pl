import { href } from 'react-router'
import type { Route } from './+types/about'
import { ResponsiveImage } from '@responsive-image/react'
import { Post } from '../components/post'
import { getMetaFromPost, type Post as PostType } from '../contents'
import opengraph from '../images/about.png?w=1200&format=png&responsive'
import about from '../images/about.png?w=384;768;1536&lqip=inline&responsive'

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
      image: [opengraph.imageUrlFor(1200, 'png') ?? ''],
    },
  } satisfies Omit<PostType, 'cover' | 'content'>
}

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <Post className="enter-page m-auto max-w-[768px] pl-4 pr-4" {...loaderData}>
      <header className="text-theme-black dark:text-theme-white not-prose font-black">
        <h1 className="text-9xl">Hi</h1>
        <h2 className="text-6xl">My name&apos;s Greg</h2>
      </header>

      <ResponsiveImage className="transition-all duration-500 ease-in-out hover:scale-105" alt="Hi, my names Greg" src={about} />

      <p>
        I&apos;m Greg, a self-taught software developer with a love for building clean code and breaking speed limits—both in
        projects and on the road. From fine-tuning backend systems to binge-reading manga and cheering during F1 weekends, I live
        at the intersection of logic and passion. This blog is my digital garage for experiments, notes, and ideas worth sharing.
      </p>

      <p>
        I started out building simple websites with Drupal and WordPress—tweaking themes, wrangling plugins, and learning the hard
        way that “just one more module” rarely solves the problem. From there, I stepped into the world of object-oriented PHP,
        where I got serious about architecture, patterns, and writing code that didn’t collapse under its own weight.
      </p>
      <p>
        Over time, curiosity (and frustration) led me to the Node.js ecosystem. I re-learned how to think about the backend,
        embraced JavaScript fully, and—after years of PHP templates and jQuery hacks—taught myself how to build modern frontends
        from scratch. That’s when I met React, and everything changed. Fast forward a few years and one Go talk at a tech
        conference later, I fell in love with the simplicity and raw speed of Golang. Today, I work as a full-stack developer
        fluent in Node, Go, and React—with just enough DevOps to ship things without breaking production (most of the time).
      </p>
    </Post>
  )
}
