import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: ['typecheck'],
  ignoreDependencies: ['tailwindcss', '@tailwindcss/typography', 'tailwindcss-animated', 'eslint-plugin-jsx-a11y', 'sharp'],
  ignoreWorkspaces: [],
} satisfies KnipConfig
