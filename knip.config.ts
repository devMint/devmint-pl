import type { KnipConfig } from 'knip'

export default {
  ignore: ['packages/**/build'],
  ignoreBinaries: [],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
