import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import favicons from 'astro-favicons'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://devmint.pl',
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-macchiato',
    },
  },
  integrations: [
    mdx(),
    sitemap({}),
    favicons({
      name: 'devMint',
      short_name: 'devMint',
      background: '#FFFFFF',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: true,
  },
})
