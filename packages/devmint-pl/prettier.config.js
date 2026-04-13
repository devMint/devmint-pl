import defineConfig from '@devmint/config-prettier'
import astroConfig from '@devmint/config-prettier/astro'
import baseConfig from '@devmint/config-prettier/base'
import tailwindConfig from '@devmint/config-prettier/tailwind'

export default defineConfig(baseConfig, tailwindConfig('./src/root.css'), astroConfig())
