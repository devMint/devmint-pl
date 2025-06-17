import { href, redirect } from 'react-router'
import type { Route } from './+types/teksty.$slug'
import { Post } from '../components/post'
import { getMetaFromPost, posts } from '../contents'

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return data ? getMetaFromPost(data) : []
}

export async function loader({ params }: Route.LoaderArgs) {
  return findPostByHref(href('/teksty/:slug', { slug: params.slug ?? '' }))
}

export default function Teksty({ loaderData }: Route.ComponentProps) {
  const post = findPostByHref(loaderData.href)
  return <Post {...loaderData}>{post.content()}</Post>
}

function findPostByHref(postHref: string) {
  const post = posts.find((post) => {
    return post.href === postHref && post.language === 'pl'
  })

  if (!post) throw redirect(href('/'), { status: 404 })
  return post
}
