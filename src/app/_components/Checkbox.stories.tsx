import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: 'Label',
  },
};

export const TEST: Story = {
  args: {
    label: 'TEST',
    checked: false,
  },
  argTypes: {
    checked: { control: false },
    onChange: { control: false },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(args.checked);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByLabelText('TEST');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await userEvent.click(checkbox);

    // チェックボックスがチェックされていることを確認
    await expect(checkbox).toBeChecked();
  },
};
