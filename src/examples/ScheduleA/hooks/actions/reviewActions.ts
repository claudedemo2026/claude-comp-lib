import { isHistoricalDoc } from '../../data/documents';
import { seedFindings } from '../../data/findings';
import { PEOPLE } from '../../data/project';
import { clause } from '../../data/sections';
import type { AgentKey, Finding, FindingStatus } from '../../data/types';
import { newId, stamp } from '../../lib/format';
import type { FindingFilters } from '../../state/types';
import { scrollToId, type Store } from '../useStore';
import { mutateSections } from './scopeActions';

const AGENT_NAME: Record<AgentKey, string> = { lang: 'Language Review Agent', gap: 'Historical Scope Gap Agent' };

/** The two review agents (step 4) and the decisions recorded on their findings. */
export function createReviewActions(store: Store) {
  const setAgent = (key: AgentKey, patch: Partial<ReturnType<Store['get']>['agents'][AgentKey]>) =>
    store.set((s) => ({ agents: { ...s.agents, [key]: { ...s.agents[key], ...patch } } }));

  const run = (key: AgentKey) => {
    const s = store.get();
    const std = s.docs.filter((d) => d.selected && !isHistoricalDoc(d.type)).length;
    const hist = s.docs.filter((d) => d.selected && isHistoricalDoc(d.type)).length;
    if (!s.sections.length) return setAgent(key, { status: 'error', error: 'The scope has no items to review yet.' });
    if (key === 'lang' && !std) return setAgent(key, { status: 'error', error: 'No standard schedules, templates or project schedules are selected.' });
    if (key === 'gap' && !hist) return setAgent(key, { status: 'error', error: 'No historical scopes or change-order records are selected.' });

    setAgent(key, { status: 'running', error: '', stale: false });
    store.later(() => {
      store.set((st) => ({
        agents: { ...st.agents, [key]: { status: 'complete', ranAt: stamp(), stale: false, error: '' } },
        findings: st.findings.some((f) => f.agent === key)
          ? st.findings
          : st.findings.concat(seedFindings(false).filter((f) => f.agent === key)),
      }));
      store.toast(`${AGENT_NAME[key]} finished.`);
    }, key === 'lang' ? 2200 : 2900);
  };

  const decide = (id: string, status: FindingStatus, note: string, message?: string) => {
    store.set((s) => ({
      findings: s.findings.map((f) =>
        f.id === id ? { ...f, status, notes: [...f.notes, { by: PEOPLE[s.role].name, at: stamp(), text: note }] } : f,
      ),
    }));
    if (message) store.toast(message);
  };

  return {
    run,
    runBoth: () => {
      run('lang');
      run('gap');
    },
    select: (id: string | null) => store.set({ selectedId: id, panelOpen: true, panelTab: 'review' }),
    setFilter: (patch: Partial<FindingFilters>) => store.set((s) => ({ filters: { ...s.filters, ...patch } })),
    resolve: (id: string) => decide(id, 'Resolved', 'Marked resolved.', `${id} marked resolved.`),
    accept: (id: string) => decide(id, 'Accepted', 'Risk accepted without scope change.', `${id} accepted.`),
    dismiss: (id: string) => decide(id, 'Dismissed', 'Dismissed as not applicable.', `${id} dismissed.`),
    reopen: (id: string) => decide(id, 'Open', 'Reopened.'),
    addNote: (id: string, text: string) =>
      store.set((s) => ({
        findings: s.findings.map((f) => (f.id === id ? { ...f, notes: [...f.notes, { by: PEOPLE[s.role].name, at: stamp(), text }] } : f)),
      })),
    /** Inserts the finding's recommended wording as a new clause, closes the panel and opens the clause for editing. */
    insert: (f: Finding, sectionLabel: string) => {
      const id = newId();
      const crit = f.sev === 'Critical';
      mutateSections(store, (secs) => {
        const sec = secs.find((x) => x.id === f.section) ?? secs[0];
        sec?.items.push(clause(id, f.recommendation, 'Inclusion', crit, [], `review finding ${f.id}`, 'ai'));
      }, {
        draft: { id, text: f.recommendation, kind: 'Inclusion', crit },
        screen: 'editor',
        highlight: f.section,
        panelOpen: false,
        findings: store.get().findings.map((x) => (x.id === f.id ? { ...x, inserted: true } : x)),
      });
      store.toast(`Recommended language inserted into ${sectionLabel}. Review and save it.`);
      scrollToId(`item-${id}`);
    },
    jumpTo: (sectionId: string) => {
      store.set({ screen: 'editor', highlight: sectionId, panelOpen: false });
      scrollToId(`sec-${sectionId}`);
    },
  };
}
