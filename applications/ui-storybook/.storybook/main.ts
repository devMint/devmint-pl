import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [`${__dirname}/../stories/**/*.mdx`, `${__dirname}/../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-measure',
    '@storybook/addon-themes',
    '@storybook/addon-viewport',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
