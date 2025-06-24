import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: ['typecheck'],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography', 'tailwindcss-animated', '@responsive-image/core'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
