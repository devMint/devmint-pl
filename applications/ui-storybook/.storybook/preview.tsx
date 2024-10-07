import type { Preview } from '@storybook/react'
import { viewports } from './viewports'

export default {
  parameters: {
    layout: 'centered',
    viewport: {
      viewports,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [],
  tags: [],
} satisfies Preview
