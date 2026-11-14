import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../FormField';
import { MailIcon, SearchIcon } from '../../stories/icons';
import { Stack } from '../../stories/Stack';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Type something…', 'aria-label': 'Example input' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel', 'date'] },
    startAdornment: { control: false },
    endAdornment: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </Stack>
  ),
};

export const WithAdornments: Story = {
  render: (args) => (
    <Stack>
      <Input {...args} type="search" placeholder="Search" startAdornment={<SearchIcon />} />
      <Input {...args} type="email" placeholder="you@example.com" startAdornment={<MailIcon />} />
      <Input {...args} type="number" placeholder="0.00" startAdornment="$" endAdornment="USD" />
    </Stack>
  ),
};

export const InFormField: Story = {
  render: (args) => (
    <Stack gap={24}>
      <FormField label="Full name" hint="As it appears on your ID." required>
        <Input {...args} aria-label={undefined} placeholder="Ada Lovelace" />
      </FormField>
      <FormField label="Email" error="Enter a valid email address.">
        <Input {...args} aria-label={undefined} type="email" defaultValue="ada@" />
      </FormField>
      <FormField label="Username" disabled>
        <Input {...args} aria-label={undefined} defaultValue="ada" />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack>
      <Input {...args} placeholder="Default" />
      <Input {...args} invalid defaultValue="Invalid value" />
      <Input {...args} disabled placeholder="Disabled" />
      <Input {...args} readOnly defaultValue="Read only" />
    </Stack>
  ),
};
