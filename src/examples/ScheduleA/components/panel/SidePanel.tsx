import { useRef, type KeyboardEvent } from 'react';
import { Drawer } from '../../../../components/Drawer';
import { useScheduleA } from '../../hooks/useScheduleA';
import type { PanelTab } from '../../state/types';
import { ReferencesTab } from './ReferencesTab';
import { ReviewTab } from './ReviewTab';

const TABS: PanelTab[] = ['refs', 'review'];

/** Right-hand panel with the linked references and the AI review, beside whatever step is open. */
export function SidePanel() {
  const { state, d, actions } = useScheduleA();
  const tabRefs = useRef<Record<PanelTab, HTMLButtonElement | null>>({ refs: null, review: null });
  const alerts = d.findings.openCrit + d.findings.openHigh;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const next = TABS[(TABS.indexOf(state.panelTab) + 1) % TABS.length];
    actions.ui.showPanel(next);
    tabRefs.current[next]?.focus();
  };

  const tab = (key: PanelTab, label: string, count: number, tone: 'grey' | 'red') => (
    <button
      ref={(el) => (tabRefs.current[key] = el)}
      type="button" role="tab" id={`sa-tab-${key}`} aria-controls={`sa-tabpanel-${key}`}
      aria-selected={state.panelTab === key} tabIndex={state.panelTab === key ? 0 : -1}
      className={`sa-tab${state.panelTab === key ? ' sa-tab--on' : ''}`}
      onClick={() => actions.ui.showPanel(key)}
    >
      {label}
      {count > 0 && <span className={`sa-count sa-count--${tone}`}>{count}</span>}
    </button>
  );

  return (
    <Drawer open={state.panelOpen} onClose={actions.ui.closePanel} title="Scope workspace" placement="right" size="lg"
      className="sa-panel" closeLabel="Close side panel">
      <div className="sa-tabs" role="tablist" aria-label="Side panel" onKeyDown={onKeyDown}>
        {tab('refs', 'References', d.docSel, 'grey')}
        {tab('review', 'AI review', alerts, 'red')}
      </div>
      <div role="tabpanel" id={`sa-tabpanel-${state.panelTab}`} aria-labelledby={`sa-tab-${state.panelTab}`} className="sa-panel__body">
        {state.panelTab === 'refs' ? <ReferencesTab /> : <ReviewTab />}
      </div>
    </Drawer>
  );
}
