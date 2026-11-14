import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../FormField';
import { Stack } from '../../stories/Stack';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: { placeholder: 'Write a few sentences…', 'aria-label': 'Example textarea' },
  argTypes: {
    resize: { control: 'inline-radio', options: ['none', 'vertical', 'both'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InFormField: Story = {
  render: (args) => (
    <Stack gap={24}>
      <FormField label="Bio" hint="Up to 280 characters.">
        <TextArea {...args} aria-label={undefined} maxLength={280} />
      </FormField>
      <FormField label="Feedback" error="Please tell us a bit more." required>
        <TextArea {...args} aria-label={undefined} defaultValue="Meh" />
      </FormField>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack>
      <TextArea {...args} rows={3} placeholder="Default" />
      <TextArea {...args} rows={3} invalid defaultValue="Invalid" />
      <TextArea {...args} rows={3} disabled placeholder="Disabled" />
      <TextArea {...args} rows={3} resize="none" placeholder="Not resizable" />
    </Stack>
  ),
};
