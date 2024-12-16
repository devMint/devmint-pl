import { href } from 'react-router'
import { build } from '../../../assets/hidden-cost-of-dependencies'
import { Picture } from '../../../components/picture'
import { definePost } from '../schema'

export default definePost(
  {
    title: 'Hidden cost of dependencies',
    description: 'Hidden cost of dependencies',
    href: href('/teksty/:slug', { slug: 'hidden-cost-of-dependencies' }),
    cover: {
      ...build('cover-sm', 'cover-md', 'cover-lg'),
      alt: 'Hidden cost of dependencies',
    },
    meta: {
      dateModified: new Date(),
      datePublished: new Date(),
      headline: 'Hidden cost of dependencies',
      image: [build('opengraph')],
    },
  },
  function HiddenCostOfDependencies({ title }) {
    return (
      <div>
        <h1>{title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

        <Picture {...build('cover-sm', 'cover-md', 'cover-lg')} alt={title} />
      </div>
    )
  },
)
