import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ArrowRightIcon, PlusIcon, TrashIcon } from '../../stories/icons';
import { Stack } from '../../stories/Stack';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" align="center">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" align="center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Stack direction="row" align="center">
      <Button {...args} startIcon={<PlusIcon />}>New project</Button>
      <Button {...args} variant="secondary" endIcon={<ArrowRightIcon />}>Continue</Button>
      <Button {...args} variant="danger" startIcon={<TrashIcon />}>Delete</Button>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack direction="row" align="center">
      <Button {...args} disabled>Disabled</Button>
      <Button {...args} variant="secondary" disabled>Disabled</Button>
      <Button {...args} loading>Saving…</Button>
      <Button {...args} variant="secondary" loading>Loading</Button>
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Sign in' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};
