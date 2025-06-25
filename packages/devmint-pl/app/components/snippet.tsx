import { NavLink } from 'react-router'
import type { Post } from '../contents/posts.schema'
import { ResponsiveImage } from '@responsive-image/react'
import { twMerge } from 'tailwind-merge'

type SnippetProps = {
  className?: string
  size: 'sm' | 'md' | 'lg'
  post: Post
}

export function Snippet({ className, size = 'lg', post }: SnippetProps) {
  const classNames = twMerge(
    'absolute left-0 top-0 rounded-lg p-4 opacity-0 hover:opacity-100',
    'absolute inset-0 transition-opacity duration-300',
    post.cover.hover,
    className,
  )
  const sizes: Record<SnippetProps['size'], number> = {
    sm: 384,
    md: 384,
    lg: 768,
  }

  return (
    <article className="relative rounded-lg">
      <NavLink to={post.href}>
        <ResponsiveImage
          className="rounded-lg hover:cursor-pointer"
          alt={post.cover?.alt || post.title}
          src={post.cover.image}
          width={sizes[size]}
        />
        <div className={classNames}>
          <h1 className="text-shadow-sm text-xl font-bold uppercase text-white">{post.title}</h1>
          <span className="text-md text-shadow-sm lowercase text-white">{post.description}</span>
          <span className="text-shadow-sm absolute bottom-2 right-2 text-sm text-white">
            {post.meta.datePublished.toDateString()}
          </span>
        </div>
      </NavLink>
    </article>
  )
}
