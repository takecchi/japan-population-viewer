import type { Meta, StoryObj } from '@storybook/react';
import StyleTestButton from './StyleTestButton';

const meta: Meta<typeof StyleTestButton> = {
  component: StyleTestButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStyleTestButton: Story = {
  args: {},
};
