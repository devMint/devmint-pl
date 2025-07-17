import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import favicons from 'astro-favicons'
import og from 'astro-og'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://devmint.pl',
  integrations: [
    mdx(),
    sitemap(),
    favicons({
      name: 'devMint',
      short_name: 'devMint',
      background: '#28a282',
      input: {
        appleIcon: 'public/logo.png',
        appleStartup: 'public/logo.png',
        windows: 'public/logo.png',
        android: 'public/logo.png',
        favicon: 'public/favicon.svg',
      },
    }),
    og(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  cacheDir: './.cache',
})
