import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Stack } from '../../stories/Stack';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Enable dark mode', onChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: {
    label: 'Auto-save',
    description: 'Save changes automatically every 30 seconds.',
    defaultChecked: true,
  },
};

export const States: Story = {
  render: (args) => (
    <Stack gap={12}>
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled" disabled />
      <Switch {...args} label="Disabled on" disabled defaultChecked />
    </Stack>
  ),
};
