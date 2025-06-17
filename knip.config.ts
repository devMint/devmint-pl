import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: ['typecheck'],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography', '@responsive-image/core'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
