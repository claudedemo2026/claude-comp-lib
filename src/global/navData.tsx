// Sample data shared by the global navigation stories (not exported from the library).
import type { SidebarSection } from './Sidebar';

const sub = (prefix: string, labels: string[]) =>
  labels.map((label) => ({ id: `${prefix}-${label.toLowerCase().replace(/\W+/g, '-')}`, label }));

export const sampleSections: SidebarSection[] = [
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      { id: 'inbox', label: 'Inbox' },
      { id: 'tasks', label: 'My Tasks', children: sub('tasks', ['Assigned to me', 'Created by me', 'Overdue']) },
      { id: 'views', label: 'Saved Views', children: sub('views', ['Weekly summary', 'Open items']) },
    ],
  },
  {
    id: 'organization',
    title: 'Organization',
    items: [
      { id: 'directory', label: 'People & Vendors', children: sub('directory', ['People', 'Vendors', 'Teams']) },
      { id: 'library', label: 'Templates', children: sub('library', ['Checklists', 'Forms']) },
      { id: 'insights', label: 'Insights', children: sub('insights', ['Dashboards', 'Exports']) },
      { id: 'projects', label: 'All Projects' },
    ],
  },
  {
    id: 'project',
    title: 'Project',
    items: [
      { id: 'setup', label: 'Setup', children: sub('setup', ['General', 'Members', 'Permissions']) },
      { id: 'files', label: 'Files & Drawings', children: sub('files', ['Drawings', 'Specifications', 'Submittals']) },
      { id: 'site', label: 'Site Operations', children: sub('site', ['Daily logs', 'Inspections', 'Punch list']) },
      { id: 'budget', label: 'Budget & Costs', children: sub('budget', ['Budget', 'Change orders', 'Invoices']) },
      { id: 'reports', label: 'Reports', children: sub('reports', ['Progress', 'Safety']) },
    ],
  },
];

export const Wordmark = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '0.12em' }}>
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 20L10 6l4 7 2-3 5 10z" fill="var(--ds-color-surface-primary-dark-default)" />
      <path d="M14 13l2-3 5 10h-4z" fill="var(--ds-color-surface-secondary-default)" />
    </svg>
    <span style={{ color: 'var(--ds-color-surface-primary-dark-default)' }}>SUMMIT</span>
  </span>
);
