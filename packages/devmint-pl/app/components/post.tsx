import type { Post } from '../contents'
import { twMerge } from 'tailwind-merge'

type PostProps = React.PropsWithChildren<Omit<Post, 'cover' | 'content'>> & {
  className?: string
}

export function Post({ children, className, ...post }: PostProps) {
  const classNames = twMerge(
    'prose m-auto w-full max-w-full',
    'dark:prose-invert',
    'prose-headings:m-auto prose-headings:w-full prose-headings:max-w-[760px] prose-headings:font-logo',
    'prose-h1:font-bold prose-h1:text-xl',
    'prose-p:m-auto prose-p:my-8 prose-p:max-w-[760px] prose-p:text-justify prose-p:font-light',
    'prose-a:text-secondary',
    'prose-img:mx-auto prose-img:my-8 prose-img:w-full prose-img:max-w-[960px] prose-img:rounded-xl',
    'prose-ul:m-auto prose-ul:w-full prose-ul:max-w-[760px]',
    'prose-table:m-auto prose-table:w-full prose-table:max-w-[760px]',
    'prose-code:m-auto prose-code:w-full prose-code:max-w-[760px]',
    'prose-pre:m-auto prose-pre:w-full prose-pre:max-w-[760px]',
    className,
  )
  const meta = JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'Article',
    ...post.meta,
  })

  return (
    <article className={classNames}>
      {children}
      <script type="application/ld+json">{meta}</script>
    </article>
  )
}
