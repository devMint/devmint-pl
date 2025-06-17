import { href } from 'react-router'
import { ResponsiveImage } from '@responsive-image/react'
import { twMerge } from 'tailwind-merge'
import opengraph from '../../images/hidden-cost-of-dependencies.webp?w=1200&responsive'
import cover from '../../images/hidden-cost-of-dependencies.webp?w384;768;1536&lqip=inline&responsive'
import { definePost } from '../posts.schema'

export default definePost(
  {
    title: 'Hidden cost of dependencies',
    description:
      'Wielu programistów ciągnie do pisania aplikacji serwerowych w Node.js z powodu jego asynchroniczności. Czym jest jednak ta asynchroniczność i czy na pewno z niej korzystamy? ',
    href: href('/teksty/:slug', { slug: 'hidden-cost-of-dependencies' }),
    cover: {
      image: cover,
      alt: 'Hidden cost of dependencies',
      hover: twMerge(
        '[&>*]:text-shadow-white bg-linear-to-br from-[#f0e6ce]/95 from-55% to-transparent to-100% [&>*]:text-[#ee847e] [&>h1]:hidden',
      ),
    },
    meta: {
      dateModified: new Date(Date.parse('2025-06-10')),
      datePublished: new Date(Date.parse('2025-06-10')),
      headline: 'Hidden cost of dependencies',
      image: [opengraph.imageUrlFor(1200, 'png') ?? ''],
    },
  },
  function () {
    return (
      <>
        <h1>Hidden cost of dependencies</h1>
        <ResponsiveImage className="rounded-lg" alt="Hidden cost of dependencies" src={cover} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </>
    )
  },
)
