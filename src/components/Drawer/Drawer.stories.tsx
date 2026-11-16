import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Stack } from '../../stories/Stack';
import { FilterIcon, RefreshIcon } from '../../stories/icons';
import { Drawer, type DrawerProps } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { docs: { story: { inline: false, iframeHeight: 560 } } },
  args: {
    open: false,
    title: 'Filters',
    icon: <FilterIcon />,
    onClose: fn(),
    onOpen: fn(),
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['left', 'right'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: false },
    children: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Wires `open`/`onClose` to local state so the drawer can be toggled in Storybook. */
function DrawerDemo({ trigger = 'Open drawer', ...args }: DrawerProps & { trigger?: string }) {
  const [open, setOpen] = useState(args.open);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{trigger}</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
          args.onClose();
        }}
      />
    </>
  );
}

const FILTERS = ['Original Contract', 'Current Contract', 'Construction Date', 'Pending Changes', 'Name'];

function FilterList() {
  return (
    <Stack gap={12}>
      {FILTERS.map((name) => (
        <Card key={name}>
          <Checkbox label={name} />
        </Card>
      ))}
    </Stack>
  );
}

export const Playground: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: { children: 'Drawer content goes here.' },
};

/** The filter panel layout: checkbox list as children, reset/apply actions in the footer. */
export const Filters: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      trigger="Show filters"
      footer={
        <>
          <Button variant="ghost" size="lg" startIcon={<RefreshIcon />}>Reset Filters</Button>
          <Button size="lg">Apply Filters</Button>
        </>
      }
    >
      <FilterList />
    </DrawerDemo>
  ),
};

export const LeftPlacement: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: { placement: 'left', title: 'Menu', icon: undefined, children: 'Slides in from the left.' },
};

/** Long content scrolls inside the body; the header and footer stay pinned. */
export const LongContent: Story = {
  render: (args) => (
    <DrawerDemo {...args} footer={<Button>Done</Button>}>
      <Stack gap={12}>
        {Array.from({ length: 30 }, (_, i) => (
          <Card key={i}>Item {i + 1}</Card>
        ))}
      </Stack>
    </DrawerDemo>
  ),
};
