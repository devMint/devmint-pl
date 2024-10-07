import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from '@devmint/ui-components'

export default {
  title: 'ui-components / Components / Button',
  component: Button,
  args: {
    onClick: fn(),
    children: 'Click me',
  },
} satisfies Meta<typeof Button>

export const Default: StoryObj<typeof Button> = {
  args: {},
}
