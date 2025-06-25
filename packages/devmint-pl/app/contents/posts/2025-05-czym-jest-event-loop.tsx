import { href } from 'react-router'
import { ResponsiveImage } from '@responsive-image/react'
import { twMerge } from 'tailwind-merge'
import opengraph from '../../images/czym-jest-event-loop.webp?w=1200&responsive'
import cover from '../../images/czym-jest-event-loop.webp?w384;768;1536&lqip=inline&responsive'
import { definePost } from '../posts.schema'

export default definePost(
  {
    title: 'Czym jest event loop?',
    description:
      'Jeden z najpopularniejszych języków ostatnich lat, język stosowany i na serwerze, i u klienta. Bardzo szybki przyrost bibliotek, frameworków oraz popularności. Ale jak tak naprawdę on działa w środku?',
    href: href('/teksty/:slug', { slug: 'czym-jest-event-loop' }),
    cover: {
      image: cover,
      alt: 'Czym jest event loop?',
      hover: twMerge('bg-linear-to-br from-[#4c257b]/95 from-55% to-transparent to-100% [&>*]:text-[#f2a193] [&>h1]:hidden'),
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
