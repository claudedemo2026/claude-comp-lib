import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  args: {
    label: 'Notification frequency',
    defaultValue: 'daily',
    onValueChange: fn(),
    children: (
      <>
        <Radio value="realtime" label="Real time" />
        <Radio value="daily" label="Daily digest" />
        <Radio value="weekly" label="Weekly digest" />
        <Radio value="never" label="Never" />
      </>
    ),
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    children: { control: false },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: {
    label: 'Size',
    defaultValue: 'm',
    orientation: 'horizontal',
    children: (
      <>
        <Radio value="s" label="Small" />
        <Radio value="m" label="Medium" />
        <Radio value="l" label="Large" />
      </>
    ),
  },
};

export const WithDescriptions: Story = {
  args: {
    label: 'Plan',
    hint: 'You can change plans at any time.',
    defaultValue: 'pro',
    children: (
      <>
        <Radio value="free" label="Free" description="Up to 3 projects and 1 GB storage." />
        <Radio value="pro" label="Pro" description="Unlimited projects, 100 GB storage." />
        <Radio value="team" label="Team" description="Everything in Pro plus shared workspaces." />
      </>
    ),
  },
};

export const WithError: Story = {
  args: { defaultValue: undefined, required: true, error: 'Choose how often we should notify you.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState('weekly');
    return (
      <div>
        <RadioGroup {...args} defaultValue={undefined} value={value} onValueChange={setValue} />
        <p style={{ marginTop: 16, fontSize: 14 }}>
          Selected: <code>{value}</code>
        </p>
      </div>
    );
  },
};
