import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { PlusIcon, SearchIcon } from '../../stories/icons';
import { Stack } from '../../stories/Stack';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Chip' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { onClick: fn(), onRemove: fn() },
};

const FILTERS = ['Open', 'In progress', 'Blocked', 'Done'];

/** Toggle chips: `selected` + `onClick` render an `aria-pressed` button. */
export const Filters: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<string[]>(['Open']);
    const toggle = (f: string) =>
      setSelected((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
    return (
      <Stack direction="row" gap={8}>
        {FILTERS.map((f) => (
          <Chip {...args} key={f} selected={selected.includes(f)} onClick={() => toggle(f)}>
            {f}
          </Chip>
        ))}
      </Stack>
    );
  },
};

/** Removable chips, e.g. entered tags or applied filters. */
export const Removable: Story = {
  render: function Render(args) {
    const [tags, setTags] = useState(['Design', 'Engineering', 'Marketing', 'Finance']);
    return (
      <Stack direction="row" gap={8}>
        {tags.map((t) => (
          <Chip {...args} key={t} onRemove={() => setTags((s) => s.filter((x) => x !== t))}>
            {t}
          </Chip>
        ))}
        {tags.length === 0 && <span>All tags removed.</span>}
      </Stack>
    );
  },
};

export const Variations: Story = {
  render: (args) => (
    <Stack gap={12}>
      <Stack direction="row" align="center" gap={8}>
        <Chip {...args}>Static</Chip>
        <Chip {...args} icon={<SearchIcon />} onClick={fn()}>With icon</Chip>
        <Chip {...args} selected onClick={fn()} onRemove={fn()}>Selected + removable</Chip>
        <Chip {...args} icon={<PlusIcon />} onClick={fn()}>Add filter</Chip>
      </Stack>
      <Stack direction="row" align="center" gap={8}>
        <Chip {...args} size="sm">Small</Chip>
        <Chip {...args} size="sm" selected onClick={fn()}>Small selected</Chip>
        <Chip {...args} size="sm" onRemove={fn()}>Small removable</Chip>
      </Stack>
      <Stack direction="row" align="center" gap={8}>
        <Chip {...args} disabled onClick={fn()}>Disabled</Chip>
        <Chip {...args} disabled selected onClick={fn()} onRemove={fn()}>Disabled selected</Chip>
      </Stack>
    </Stack>
  ),
};
