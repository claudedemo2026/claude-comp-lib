import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Switch } from '../Switch';
import { SearchIcon } from '../../stories/icons';
import { PageLayout } from './PageLayout';

const Header = () => (
  <>
    <strong style={{ fontSize: 16, marginRight: 'auto' }}>◆ Acme</strong>
    <nav aria-label="Primary" style={{ display: 'flex', gap: 4 }}>
      <Button variant="ghost" size="sm">Dashboard</Button>
      <Button variant="ghost" size="sm">Projects</Button>
      <Button variant="ghost" size="sm">Settings</Button>
    </nav>
    <Button size="sm">New</Button>
  </>
);

const Body = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h1 style={{ margin: 0, fontSize: 'var(--ds-font-size-2xl)', lineHeight: 'var(--ds-line-height-2xl)' }}>Settings</h1>
      <p style={{ margin: '4px 0 0', color: 'var(--ds-color-text-secondary)' }}>
        Manage your workspace preferences.
      </p>
    </div>
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 24,
        background: 'var(--ds-color-surface-default)',
        border: 'var(--ds-border-width-default) solid var(--ds-color-border-default)',
        borderRadius: 'var(--ds-radius-lg)',
      }}
    >
      <FormField label="Workspace name">
        <Input defaultValue="Acme Inc." />
      </FormField>
      <FormField label="Search index">
        <Input placeholder="Search…" startAdornment={<SearchIcon />} />
      </FormField>
      <Switch label="Allow guests" description="Guests can view but not edit projects." />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </section>
    {Array.from({ length: 6 }, (_, i) => (
      <p key={i} style={{ margin: 0, color: 'var(--ds-color-text-secondary)' }}>
        Filler paragraph {i + 1} so you can scroll and see the sticky header in action.
      </p>
    ))}
  </div>
);

const meta = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    header: <Header />,
    children: <Body />,
    stickyHeader: true,
    maxWidth: 'lg',
  },
  argTypes: {
    maxWidth: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    header: { control: false },
    children: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFooter: Story = {
  args: { footer: <span>© 2026 Acme Inc. All rights reserved.</span> },
};

export const Narrow: Story = {
  args: { maxWidth: 'sm' },
};

export const BodyOnly: Story = {
  args: { header: undefined },
};
