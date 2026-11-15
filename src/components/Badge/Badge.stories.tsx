import type { Meta, StoryObj } from '@storybook/react';
import { MailIcon } from '../../stories/icons';
import { Stack } from '../../stories/Stack';
import { Badge, BADGE_HUES } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  argTypes: {
    color: { control: 'select', options: ['neutral', ...BADGE_HUES] },
    variant: { control: 'inline-radio', options: ['subtle', 'solid'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <Stack gap={12}>
      {(['subtle', 'solid'] as const).map((variant) => (
        <Stack key={variant} direction="row" gap={8}>
          {(['neutral', ...BADGE_HUES] as const).map((color) => (
            <Badge {...args} key={color} color={color} variant={variant}>
              {color}
            </Badge>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Status: Story = {
  render: (args) => (
    <Stack direction="row" gap={8}>
      <Badge {...args} color="green" dot>Active</Badge>
      <Badge {...args} color="orange" dot>Pending</Badge>
      <Badge {...args} color="red" dot>Failed</Badge>
      <Badge {...args} color="blue" dot>In review</Badge>
      <Badge {...args} color="neutral" dot>Draft</Badge>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" align="center" gap={8}>
      <Badge {...args} size="sm" color="blue">Small</Badge>
      <Badge {...args} size="md" color="blue">Medium</Badge>
      <Badge {...args} size="md" color="blue" icon={<MailIcon />}>With icon</Badge>
      <Badge {...args} size="sm" color="red" variant="solid">12</Badge>
    </Stack>
  ),
};
