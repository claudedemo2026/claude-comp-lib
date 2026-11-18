import { isHistoricalDoc } from '../data/documents';
import { PEOPLE } from '../data/project';
import { DIVISIONS } from '../data/sections';
import type { StepKey } from '../data/types';
import type { AppState } from '../state/types';
import { summarize } from './findings';
import { plural } from './format';

export const divisionName = (code: string) => DIVISIONS.find(([c]) => c === code)?.[1] ?? '';

export interface StepInfo {
  key: StepKey;
  label: string;
  sub: string;
  done: boolean;
  count?: string;
  countTone?: 'red' | 'grey';
}

/** Everything the screens compute from state, in one place. */
export function derive(s: AppState) {
  const me = PEOPLE[s.role];
  const canEdit = s.role !== 'follower';
  const divisions = s.details.divisions.slice().sort();
  const divisionLine = divisions.map((c) => `Div ${c} ${divisionName(c)}`).join(', ');

  const sectionIndex = new Map(s.sections.map((x, i) => [x.id, { n: i + 1, title: x.title }]));
  const sectionLabel = (id: string) => {
    const x = sectionIndex.get(id);
    return x ? `§${x.n} ${x.title}` : 'Section not in scope';
  };

  const items = s.sections.flatMap((x) => x.items);
  const stats = {
    sections: s.sections.length,
    items: items.length,
    critical: items.filter((i) => i.crit).length,
  };

  const docSel = s.docs.filter((d) => d.selected).length;
  const histSel = s.docs.filter((d) => d.selected && isHistoricalDoc(d.type)).length;
  const stdSel = s.docs.filter((d) => d.selected && d.type === 'Standard').length;

  const f = summarize(s.findings);
  const { lang, gap } = s.agents;
  const anyRunning = lang.status === 'running' || gap.status === 'running';
  const bothDone = lang.status === 'complete' && gap.status === 'complete';
  const anyStale = lang.stale || gap.stale;
  const detailsDone = !!(s.scopeTitle && s.details.trade && divisions.length);

  const steps: StepInfo[] = [
    { key: 'details', label: 'Scope details', done: detailsDone,
      sub: detailsDone ? `${s.details.trade} · ${plural(divisions.length, 'division')}` : 'Required fields missing' },
    { key: 'refs', label: 'Reference documents', done: docSel > 0 && stdSel > 0, sub: `${docSel} of ${s.docs.length} linked`,
      count: stdSel === 0 && s.refsTried ? 'Required' : undefined, countTone: 'red' },
    { key: 'editor', label: 'Scope editor', done: stats.items > 0, sub: `${stats.sections} sections · ${stats.items} items` },
    { key: 'review', label: 'AI review', done: bothDone && !anyStale && f.openCrit === 0,
      sub: anyRunning ? 'Agents running…' : bothDone ? (anyStale ? 'Rerun needed' : 'Both agents complete') : 'Not run',
      count: f.openCrit + f.openHigh ? `${f.openCrit + f.openHigh} open` : undefined, countTone: f.openCrit ? 'red' : 'grey' },
    { key: 'export', label: 'Finalize and export', done: s.details.status === 'Attached to requisition', sub: s.details.status },
  ];
  // A step only counts as done when every step before it is done.
  let prevDone = true;
  steps.forEach((x) => {
    x.done = x.done && prevDone;
    prevDone = x.done;
  });
  const doneCount = steps.filter((x) => x.done).length;
  const nextStep = steps.find((x) => !x.done);

  const attachReason = !canEdit
    ? 'Followers cannot attach.'
    : s.details.status === 'Issued for tender'
      ? 'Issued for tender: revise for award before attaching.'
      : !s.details.requisition
        ? 'Choose the awarded requisition first.'
        : f.openCrit > 0 && !s.override
          ? `Resolve critical findings first${s.role === 'admin' ? ', or record an override below.' : '.'}`
          : '';

  return {
    me, canEdit, divisions, divisionLine, sectionIndex, sectionLabel, stats, docSel, histSel, stdSel,
    findings: f, anyRunning, bothDone, anyStale, detailsDone, steps,
    progressPct: Math.round((doneCount / steps.length) * 100),
    nextHint: nextStep ? `Up next: ${nextStep.label.toLowerCase()}` : 'All steps complete',
    attachReason,
  };
}

export type Derived = ReturnType<typeof derive>;
