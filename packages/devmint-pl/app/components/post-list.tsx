import { Link } from 'react-router'
import type { PostType } from '../contents/posts.schema'
import { twMerge } from 'tailwind-merge'

type PostListProps = {
  posts: PostType[]
  groupBy?: (post: PostType) => string
}

export function PostList({ posts, groupBy }: PostListProps) {
  const defaultGroupBy = () => ''
  const groups = posts.reduce(
    (acc, next) => {
      const key = groupBy ? groupBy(next) : defaultGroupBy()
      return { ...acc, [key]: [...(acc[key] ?? []), next] }
    },
    {} as Record<string, PostType[]>,
  )

  const linkClassNames = twMerge(
    'w-full flex flex-row p-4 [&+&]:border-t-1 transition-all duration-300',
    'hover:bg-secondary-light/25 border-secondary-light text-theme-black',
    'dark:text-theme-white dark:hover:bg-secondary-dark/25 dark:border-secondary-dark',
  )

  return (
    <div className="w-full flex flex-col">
      {Object.entries(groups).map(([id, posts]) => (
        <div key={id} className="w-full flex flex-col">
          {posts.map((post, index) => (
            <Link key={post.href} className={linkClassNames} to={post.href}>
              <span className="font-light w-[15%] content-end">{index === 0 ? id : ''}</span>
              <span className="text-xl w-[85%]">{post.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
