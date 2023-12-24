import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    options: [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
  },
};

export const TEST: Story = {
  args: {
    options: [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
    value: 'A',
  },
  argTypes: {
    options: { control: false },
    value: { control: false },
    onChange: { control: false },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>(args.value ?? 'A');
    return (
      <Select
        {...args}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('A');
    await expect(title).not.toBeNull();
  },
};
