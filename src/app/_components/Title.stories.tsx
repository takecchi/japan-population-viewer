import type { Meta, StoryObj } from '@storybook/react';
import Title from './Title';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    title: '都道府県',
    summary: '都道府県を選択してください。',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('都道府県');
    await expect(title).not.toBeNull();

    const summary = canvas.getByText('都道府県を選択してください。');
    await expect(summary).not.toBeNull();
  },
};
