import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import favicons from 'astro-favicons'

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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  cacheDir: './.cache',
})
