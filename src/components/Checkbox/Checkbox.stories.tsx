import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Stack } from '../../stories/Stack';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Accept terms and conditions', onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Get an email when someone mentions you or replies to your thread.',
    defaultChecked: true,
  },
};

export const States: Story = {
  render: (args) => (
    <Stack gap={12}>
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Invalid" invalid />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled checked" disabled defaultChecked />
    </Stack>
  ),
};

const toppings = ['Cheese', 'Mushrooms', 'Olives', 'Peppers'];

export const SelectAll: Story = {
  render: function SelectAllStory() {
    const [checked, setChecked] = useState<string[]>(['Cheese']);
    const all = checked.length === toppings.length;
    const some = checked.length > 0 && !all;
    return (
      <Stack gap={12}>
        <Checkbox
          label="All toppings"
          checked={all}
          indeterminate={some}
          onChange={() => setChecked(all ? [] : toppings)}
        />
        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {toppings.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={checked.includes(t)}
              onChange={(e) =>
                setChecked((prev) => (e.target.checked ? [...prev, t] : prev.filter((x) => x !== t)))
              }
            />
          ))}
        </div>
      </Stack>
    );
  },
};
