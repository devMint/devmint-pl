import { href, redirect } from 'react-router'
import type { Route } from './+types/teksty.$slug'
import { getMetaFromPost } from '../contents/posts.schema'
import { Post } from '../components/post'
import { posts } from '../contents'
import { MDXProvider } from '@mdx-js/react'
import { runSync } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return data ? getMetaFromPost(data.meta) : []
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = posts[href('/teksty/:slug', { slug: params.slug })]
  if (!post) return redirect('/')

  return post
}

export default function Teksty({ loaderData }: Route.ComponentProps) {
  const { default: Content } = runSync(loaderData.content, { ...runtime, baseUrl: import.meta.url })

  return (
    <Post className="enter-page m-auto max-w-[768px] pl-4 pr-4" {...loaderData.meta}>
      <Content />
    </Post>
  )
}
