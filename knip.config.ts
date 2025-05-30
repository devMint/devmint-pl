import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: ['typecheck'],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
