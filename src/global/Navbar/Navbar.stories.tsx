import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../../components/Select';
import { BellIcon, FolderIcon, GlobeIcon, HelpIcon, SettingsIcon } from '../../stories/icons';
import { Sidebar } from '../Sidebar';
import { sampleSections, Wordmark } from '../navData';
import { Navbar, NavbarAvatar, NavbarIconButton } from './Navbar';

const ProjectPicker = () => (
  <>
    <Select size="md" aria-label="Current project" defaultValue="1042" style={{ minWidth: 260 }}>
      <option value="1042">1042 | Harbor View Tower</option>
      <option value="1077">1077 | Riverside Clinic</option>
      <option value="1101">1101 | North Depot Expansion</option>
    </Select>
    <NavbarIconButton label="Browse projects">
      <FolderIcon />
    </NavbarIconButton>
  </>
);

const Actions = () => (
  <>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 8 }}>
      <span style={{ color: 'var(--ds-color-icon-default)', display: 'inline-flex' }}>
        <GlobeIcon />
      </span>
      <Select size="sm" aria-label="Language" defaultValue="en-CA">
        <option value="en-CA">English (Canada)</option>
        <option value="fr-CA">Français (Canada)</option>
        <option value="en-US">English (US)</option>
      </Select>
    </span>
    <NavbarIconButton label="Notifications" badge={3}>
      <BellIcon />
    </NavbarIconButton>
    <NavbarIconButton label="Help">
      <HelpIcon />
    </NavbarIconButton>
    <NavbarIconButton label="Settings">
      <SettingsIcon />
    </NavbarIconButton>
  </>
);

const meta = {
  title: 'Global/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    brand: <Wordmark />,
    onMenuClick: () => {},
    children: <ProjectPicker />,
    actions: <Actions />,
    account: <NavbarAvatar name="Kai Moreno" />,
  },
  argTypes: {
    brand: { control: false },
    children: { control: false },
    actions: { control: false },
    account: { control: false },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Minimal: Story = {
  args: { children: undefined, actions: undefined },
};

/** Navbar + Sidebar together. Narrow the viewport to see the sidebar become a drawer. */
export const AppShell: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('inbox');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar
          {...args}
          sticky
          menuOpen={open}
          menuControls="app-sidebar"
          onMenuClick={() => setOpen((o) => !o)}
        />
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <Sidebar
            id="app-sidebar"
            sections={sampleSections}
            activeId={active}
            open={open}
            onClose={() => setOpen(false)}
            onSelect={(item) => {
              setActive(item.id);
              setOpen(false);
            }}
          />
          <main style={{ flex: 1, padding: 32, background: 'var(--ds-color-surface-neutral-light)' }}>
            <h1 style={{ margin: 0, fontSize: 'var(--ds-font-size-xl)' }}>{active}</h1>
          </main>
        </div>
      </div>
    );
  },
};
