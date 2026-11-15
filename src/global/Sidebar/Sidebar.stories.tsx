import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { sampleSections } from '../navData';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Global/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { sections: sampleSections, open: true },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click any leaf item to make it active. */
export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeId);
    return <Sidebar {...args} activeId={active} onSelect={(item) => setActive(item.id)} />;
  },
};

/** Parents of the active item start expanded. */
export const WithActiveNestedItem: Story = {
  ...Default,
  args: { activeId: 'site-inspections' },
};

export const CollapsedSection: Story = {
  ...Default,
  args: {
    sections: sampleSections.map((s) => (s.id === 'organization' ? { ...s, defaultExpanded: false } : s)),
  },
};

export const WithFooter: Story = {
  ...Default,
  args: { footer: 'v2.4.0 · Need help? support@example.com' },
};
