import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../FormField';
import { Stack } from '../../stories/Stack';
import { Select } from './Select';

const countries = (
  <>
    <option value="au">Australia</option>
    <option value="ca">Canada</option>
    <option value="de">Germany</option>
    <option value="jp">Japan</option>
    <option value="uk">United Kingdom</option>
    <option value="us">United States</option>
  </>
);

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { placeholder: 'Choose a country', 'aria-label': 'Country', children: countries },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      <Select {...args} size="sm" />
      <Select {...args} size="md" />
      <Select {...args} size="lg" />
    </Stack>
  ),
};

export const WithGroups: Story = {
  args: {
    placeholder: 'Pick a framework',
    children: (
      <>
        <optgroup label="Frontend">
          <option>React</option>
          <option>Vue</option>
          <option>Svelte</option>
        </optgroup>
        <optgroup label="Backend">
          <option>Express</option>
          <option>Django</option>
          <option>Rails</option>
        </optgroup>
      </>
    ),
  },
};

export const InFormField: Story = {
  render: (args) => (
    <Stack gap={24}>
      <FormField label="Country" hint="Used to calculate shipping." required>
        <Select {...args} aria-label={undefined} />
      </FormField>
      <FormField label="Country" error="Select a country to continue.">
        <Select {...args} aria-label={undefined} />
      </FormField>
      <FormField label="Country" disabled>
        <Select {...args} aria-label={undefined} defaultValue="ca" placeholder={undefined} />
      </FormField>
    </Stack>
  ),
};
