import astro from 'eslint-plugin-astro'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  /**
   * Astro Config
   */
  ...astro.configs['jsx-a11y-strict'],
])
