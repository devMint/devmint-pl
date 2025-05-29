import { NavLink } from 'react-router'
import { Picture } from '../components/picture'
import { posts } from '../contents'

export default function Index() {
  return (
    <div className="m-auto w-full max-w-[768px] p-4">
      <h1 className="text-theme-black mb-8 text-5xl lowercase">Posts</h1>

      {posts.map((post) => (
        <article key={post.href}>
          <Picture className="rounded-lg" alt={post.title} fallback={post.cover.fallback} image={post.cover.image} />
          <NavLink className="text-theme-black hover:text-primary" to={post.href}>
            <h2 className="pt-4 lowercase">{post.title}</h2>
          </NavLink>
        </article>
      ))}
    </div>
  )
}
