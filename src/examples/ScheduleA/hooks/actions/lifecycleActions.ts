import { PEOPLE, tradeDivisions } from '../../data/project';
import type { Role } from '../../data/types';
import { summarize } from '../../lib/findings';
import { bumpVersion, stamp } from '../../lib/format';
import { initialState } from '../../state/initial';
import type { AppState, ExportResult } from '../../state/types';
import { staleAgents, type Store } from '../useStore';

/** Versions, export, issue for tender, revise for award, and switching between scopes. */
export function createLifecycleActions(store: Store) {
  /** Saves a new version entry and returns its number. */
  const addVersion = (s: AppState, note: string) => {
    const v = bumpVersion(s.version);
    const me = PEOPLE[s.role];
    return { version: v, versions: [{ v, by: me.name, role: me.title, at: stamp(), note }, ...s.versions] };
  };

  return {
    createVersion: (note: string) => {
      const next = addVersion(store.get(), note.trim() || 'No summary.');
      store.set({ ...next, modal: null });
      store.toast(`Version v${next.version} created.`);
    },
    askRestore: (v: string) => store.set({ modal: 'restore', restoreV: v, historyOpen: false }),
    restore: () => {
      const s = store.get();
      const next = addVersion(s, `Restored from v${s.restoreV}.`);
      store.set({ ...next, modal: null, agents: staleAgents(s.agents) });
      store.toast(`v${s.restoreV} restored as v${next.version}.`);
    },
    openExport: () => store.set({ modal: 'export', exportDone: null, override: false }),
    exportAs: (kind: 'pdf' | 'word' | 'attach') => {
      const s = store.get();
      const d = s.details;
      const draft = summarize(s.findings).openCrit > 0;
      const base = `Schedule-A_${d.projectNo}_${(d.sub || 'Draft').split(' ')[0]}_v${s.version}`;
      const results: Record<typeof kind, ExportResult> = {
        pdf: {
          title: 'PDF exported',
          detail: draft ? 'Watermarked DRAFT because critical findings are open.' : d.sub ? `Ready to send to ${d.sub}.` : 'Ready to send to bidders.',
          file: `${base}${draft ? '_DRAFT' : ''}.pdf`,
        },
        word: {
          title: 'Word document exported',
          detail: 'Editable copy for legal markup. Changes made in Word are not synced back.',
          file: `${base}${draft ? '_DRAFT' : ''}.docx`,
        },
        attach: {
          title: `Attached to ${d.requisition}`,
          detail: `Schedule A v${s.version} is now on the requisition for ${d.sub} in Gate Three${draft ? ', with an Admin override recorded.' : '.'}`,
          file: `${base}.pdf`,
        },
      };
      store.set({
        exportDone: results[kind],
        ...(kind === 'attach' ? { details: { ...d, status: 'Attached to requisition' as const } } : {}),
      });
    },
    issueForTender: () => {
      const s = store.get();
      const next = addVersion(s, 'Issued for tender.');
      store.set({
        ...next,
        details: { ...s.details, status: 'Issued for tender' },
        exportDone: {
          title: `Issued for tender as v${next.version}`,
          detail: 'The tender package PDF is ready to send to bidders. When the subcontract is awarded, use Revise for award.',
          file: `SOW_${s.details.projectNo}_${(s.details.trade || 'Scope').split(' ')[0]}_v${next.version}_TENDER.pdf`,
        },
      });
    },
    reviseForAward: () => {
      const s = store.get();
      const next = addVersion(s, 'Revision for award started from the tender issue.');
      store.set({ ...next, screen: 'details', details: { ...s.details, status: 'Revising for award' } });
      store.toast(`Revision v${next.version} created. Assign the awarded requisition under Award.`);
    },
    /** Opens the populated HVAC scope (issued for tender) at the Finalize step. */
    openExample: () => store.set({ ...initialState('main', store.get().role), screen: 'export' }),
    createScope: (title: string, trade: string) => {
      const role: Role = store.get().role;
      const me = PEOPLE[role];
      const st = initialState('fresh', role);
      store.set({
        ...st,
        scopeTitle: title,
        details: { ...st.details, trade, divisions: tradeDivisions(trade), owner: me.name },
        versions: [{ v: '0.1', by: me.name, role: me.title, at: stamp(), note: 'Scope created.' }],
      });
      store.toast('Draft created. Add divisions, then link reference documents.');
    },
  };
}
