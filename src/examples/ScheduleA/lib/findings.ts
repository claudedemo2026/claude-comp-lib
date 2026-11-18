import type { BadgeColor } from '../../../components/Badge';
import type { Finding, FindingStatus, Severity } from '../data/types';
import type { FindingFilters } from '../state/types';
import { money } from './format';

export const SEVERITY: Record<Severity, { rank: number; color: BadgeColor; variant: 'solid' | 'subtle' }> = {
  Critical: { rank: 0, color: 'red', variant: 'solid' },
  High: { rank: 1, color: 'orange', variant: 'subtle' },
  Medium: { rank: 2, color: 'yellow', variant: 'subtle' },
  Low: { rank: 3, color: 'neutral', variant: 'subtle' },
};

export const STATUS_COLOR: Record<FindingStatus, BadgeColor> = {
  Open: 'blue',
  Accepted: 'indigo',
  Resolved: 'green',
  Dismissed: 'neutral',
};

const STATUS_RANK: Record<FindingStatus, number> = { Open: 0, Accepted: 1, Resolved: 2, Dismissed: 3 };

export const agentLabel = (f: Finding) => (f.agent === 'lang' ? 'Language review' : 'Historical gap');

/** Open first, then by severity, then by id. */
export const sortFindings = (list: Finding[]) =>
  list
    .slice()
    .sort(
      (a, b) =>
        STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
        SEVERITY[a.sev].rank - SEVERITY[b.sev].rank ||
        a.id.localeCompare(b.id),
    );

export const filterFindings = (list: Finding[], f: FindingFilters) =>
  list.filter(
    (x) =>
      (f.agent === 'All' || x.agent === f.agent) &&
      (f.sev === 'All' || x.sev === f.sev) &&
      (f.status === 'All' || x.status === f.status),
  );

export function summarize(findings: Finding[]) {
  const open = findings.filter((f) => f.status === 'Open');
  const gapsOpen = open.filter((f) => f.agent === 'gap');
  const lo = gapsOpen.reduce((a, f) => a + (f.lo ?? 0), 0);
  const hi = gapsOpen.reduce((a, f) => a + (f.hi ?? 0), 0);
  const count = (status: FindingStatus) => findings.filter((f) => f.status === status).length;
  return {
    open,
    openCrit: open.filter((f) => f.sev === 'Critical').length,
    openHigh: open.filter((f) => f.sev === 'High').length,
    openCritIds: open.filter((f) => f.sev === 'Critical').map((f) => f.id),
    gapsOpen: gapsOpen.length,
    exposure: gapsOpen.length ? `${money(lo)} – ${money(hi)}` : '$0',
    resolved: count('Resolved'),
    accepted: count('Accepted'),
    dismissed: count('Dismissed'),
  };
}

export type FindingSummary = ReturnType<typeof summarize>;
