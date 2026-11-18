import { REQUISITIONS } from '../../data/project';
import { clause, sectionRank, seedSections } from '../../data/sections';
import type { Details, Section } from '../../data/types';
import { newId } from '../../lib/format';
import type { AppState } from '../../state/types';
import { scrollToId, staleAgents, type Store } from '../useStore';

/** Applies an edit to a copy of the sections, marks the scope as changed and the agents as outdated. */
export function mutateSections(store: Store, fn: (secs: Section[]) => void, extra: Partial<AppState> = {}) {
  store.set((s) => {
    const sections = s.sections.map((x) => ({ ...x, items: x.items.slice() }));
    fn(sections);
    return { sections, agents: staleAgents(s.agents), ...extra };
  });
  store.touch();
}

/** Scope details (step 1), title and description, and how a blank scope gets started. */
export function createScopeActions(store: Store) {
  const setDetail = <K extends keyof Details>(key: K, value: Details[K]) => {
    store.set((s) => {
      const detErr = { ...s.detErr };
      delete detErr[key as keyof typeof detErr];
      return { details: { ...s.details, [key]: value }, detErr };
    });
    store.touch();
  };

  return {
    setDetail,
    setTitle: (scopeTitle: string) => {
      store.set((s) => ({ scopeTitle, detErr: { ...s.detErr, title: undefined } }));
      store.touch();
    },
    setDesc: (scopeDesc: string) => {
      store.set({ scopeDesc });
      store.touch();
    },
    toggleDivision: (code: string) => {
      const cur = store.get().details.divisions;
      setDetail('divisions', cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code]);
    },
    setRequisition: (id: string) => {
      const r = REQUISITIONS.find((x) => x.id === id);
      store.set((s) => ({ details: { ...s.details, requisition: id, sub: r?.sub ?? '', contract: r?.contract ?? '' } }));
      store.touch();
      if (r) store.toast(`Assigned ${r.sub} from ${r.id}.`);
    },
    continueDetails: () => {
      const s = store.get();
      const err: AppState['detErr'] = {};
      if (!s.scopeTitle) err.title = 'Enter a title for the scope of work.';
      if (!s.details.trade) err.trade = 'Enter the trade.';
      if (!s.details.divisions.length) err.divisions = 'Select at least one division.';
      if (Object.keys(err).length) {
        store.set({ detErr: err });
        store.toast('Complete the required fields to continue.');
        return;
      }
      store.set({ detErr: {}, screen: 'refs' });
    },
    startTemplate: () => {
      const s = store.get();
      const trade = s.details.trade || 'HVAC';
      mutateSections(store, (secs) => {
        secs.length = 0;
        seedSections().forEach((x) => secs.push({ ...x, items: x.items.map((i) => ({ ...i, src: '', srcType: '' })) }));
      }, {
        scopeTitle: s.scopeTitle || `${trade} Scope of Work — Phase 2 Residential Tower`,
        scopeDesc: `Complete ${trade.toLowerCase()} work for the Phase 2 residential tower as shown on the Issued for Construction drawings.`,
      });
      store.toast('Template applied: 9 sections, 27 clauses. Edit them for this subcontract.');
    },
    startHistorical: () => {
      const s = store.get();
      const src = 'Liberty Village Residences (2023)';
      mutateSections(store, (secs) => {
        secs.length = 0;
        seedSections().forEach((x) => secs.push({ ...x, items: x.items.map((i) => ({ ...i, src, srcType: 'hist' })) }));
      }, {
        scopeTitle: s.scopeTitle || 'Scope of Work — Phase 2 Residential Tower',
        scopeDesc: 'Adapted from the executed Liberty Village Residences Schedule A (2023).',
      });
      store.toast('Copied 27 clauses from Liberty Village Residences.');
    },
    startBlank: () =>
      mutateSections(store, (secs) => {
        secs.push({ id: 'gen', title: 'General Requirements', items: [] }, { id: 'excl', title: 'Exclusions', items: [] });
      }),
    addSection: (title: string) => {
      const id = `s${newId()}`;
      mutateSections(store, (secs) => {
        const sec = { id, title, items: [] };
        const at = secs.findIndex((x) => sectionRank(x.title) > sectionRank(title));
        if (at < 0) secs.push(sec);
        else secs.splice(at, 0, sec);
      }, { highlight: id });
      scrollToId(`sec-${id}`);
    },
    insertClause: (sectionId: string, text: string, src: string, srcType: 'hist' | 'ref') => {
      const id = newId();
      mutateSections(store, (secs) => {
        let sec = secs.find((x) => x.id === sectionId);
        if (!sec) {
          sec = { id: 'gen', title: 'General Requirements', items: [] };
          secs.unshift(sec);
        }
        sec.items.push(clause(id, text, 'Inclusion', false, [], src, srcType));
      }, { highlight: sectionId === '__new' ? 'gen' : sectionId });
      scrollToId(`item-${id}`);
    },
  };
}
