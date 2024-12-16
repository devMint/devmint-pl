import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import favicons from 'astro-favicons'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://devmint.pl',
  integrations: [
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
})
