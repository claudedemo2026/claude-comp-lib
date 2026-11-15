import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Stack } from '../../stories/Stack';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: 'Cards accept any content as children.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outlined', 'elevated', 'filled'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside', 'li'] },
    children: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 'none' }}><Story /></div>],
  render: (args) => (
    <Stack direction="row" align="stretch">
      {(['outlined', 'elevated', 'filled'] as const).map((variant) => (
        <Card {...args} key={variant} variant={variant} style={{ width: 220 }}>
          <strong style={{ textTransform: 'capitalize' }}>{variant}</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--ds-color-text-secondary)' }}>Card content goes here.</p>
        </Card>
      ))}
    </Stack>
  ),
};

/** Compose any content inside. The card only provides the surface and padding. */
export const Composed: Story = {
  render: (args) => (
    <Card {...args} as="article" aria-labelledby="plan-title" padding="lg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <h3 id="plan-title" style={{ margin: 0, fontSize: 'var(--ds-font-size-lg)', lineHeight: 'var(--ds-line-height-lg)' }}>
          Pro plan
        </h3>
        <Badge color="green" dot>Active</Badge>
      </div>
      <p
        style={{
          margin: '8px 0 16px',
          fontFamily: 'var(--ds-font-family-financials)',
          fontSize: 'var(--ds-font-size-2xl)',
          lineHeight: 'var(--ds-line-height-2xl)',
        }}
      >
        $24.00<span style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-text-secondary)' }}>/mo</span>
      </p>
      <p style={{ margin: '0 0 16px', color: 'var(--ds-color-text-secondary)' }}>
        Unlimited projects, priority support and advanced reporting.
      </p>
      <Stack direction="row" gap={8}>
        <Button>Manage plan</Button>
        <Button variant="ghost">View invoices</Button>
      </Stack>
    </Card>
  ),
};

/** `padding="none"` lets media or lists run edge to edge. */
export const EdgeToEdge: Story = {
  render: (args) => (
    <Card {...args} padding="none">
      <div style={{ height: 140, background: 'var(--ds-color-accent-light-blue)' }} />
      <div style={{ padding: 'var(--ds-space-4)' }}>Content padded by the consumer.</div>
    </Card>
  ),
};
