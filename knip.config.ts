import type { KnipConfig } from 'knip'

export default {
  compilers: {},
  ignore: [],
  ignoreBinaries: [],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
