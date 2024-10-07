import type { KnipConfig } from 'knip'

export default {
  ignore: [],
  ignoreBinaries: [],
  ignoreDependencies: ['@tsconfig/.*'],
  ignoreWorkspaces: [],
  workspaces: {
    'applications/ui-storybook': {
      entry: ['.storybook/{main,preview}.{ts,tsx}', '**/*.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))'],
      project: ['.storybook/**/*.{js,jsx,ts,tsx}'],
      ignoreDependencies: ['@storybook/blocks', '@storybook/preview-api'],
    },
  },
} satisfies KnipConfig
