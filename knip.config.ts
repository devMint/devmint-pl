import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: [],
  ignoreDependencies: ['@tsconfig/.*'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
