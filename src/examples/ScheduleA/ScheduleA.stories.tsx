import type { Meta, StoryObj } from '@storybook/react';
import { ScheduleA } from './ScheduleA';

const meta = {
  title: 'Examples/Schedule A',
  component: ScheduleA,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['fresh', 'main'] },
    role: { control: 'inline-radio', options: ['admin', 'editor', 'follower'] },
  },
} satisfies Meta<typeof ScheduleA>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A new scope, starting at step 1. */
export const Default: Story = { args: { mode: 'fresh', role: 'admin' } };

/** The populated HVAC scope, issued for tender, with review findings. */
export const PopulatedScope: Story = { args: { mode: 'main', role: 'admin' } };

/** Read-only view: editing, decisions, versions and export are turned off. */
export const Follower: Story = { args: { mode: 'main', role: 'follower' } };
