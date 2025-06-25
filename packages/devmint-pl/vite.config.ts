import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import { setupPlugins } from '@responsive-image/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    setupPlugins({
      include: /^[^?]+\.(jpg|png|webp)\?.*responsive.*$/,
      w: [384, 768, 1536],
      format: ['original', 'webp', 'png'],
    }),
  ],
  build: {
    target: 'esnext',
  },
})
