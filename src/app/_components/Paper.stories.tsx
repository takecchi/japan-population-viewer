import type { Meta, StoryObj } from '@storybook/react';
import Paper from './Paper';
import Title from './Title';

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    children: <Title title="都道府県" summary="都道府県を選択してください" />,
  },
};
