import type { Config } from '@react-router/dev/config'

export default {
  ssr: true,
  future: {
    /**
     * @see https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/#react-router-v7
     */
    unstable_viteEnvironmentApi: true,
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
  },
  prerender: true,
} satisfies Config
