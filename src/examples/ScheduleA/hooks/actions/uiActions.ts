import type { Role, Screen } from '../../data/types';
import type { ModalName, PanelTab } from '../../state/types';
import type { Store } from '../useStore';

/** Screen navigation, the side panel, dialogs, the version drawer and the demo role switcher. */
export function createUiActions(store: Store) {
  /** Opens the panel on a tab, or closes it when that tab is already showing. */
  const togglePanel = (tab: PanelTab) => {
    const s = store.get();
    store.set({ panelOpen: !(s.panelOpen && s.panelTab === tab), panelTab: tab });
  };

  return {
    go: (screen: Screen) => store.set({ screen, highlight: null }),
    setRole: (role: Role) => store.set({ role, draft: null }),
    togglePanel,
    showPanel: (panelTab: PanelTab) => store.set({ panelOpen: true, panelTab }),
    closePanel: () => store.set({ panelOpen: false }),
    openModal: (modal: ModalName) => store.set({ modal }),
    openHistorical: (sectionId: string) => store.set({ modal: 'historical', histSection: sectionId }),
    closeModal: () => store.set({ modal: null }),
    setHistoryOpen: (historyOpen: boolean) => store.set({ historyOpen }),
    setOverride: (override: boolean) => store.set({ override }),
    clearExportResult: () => store.set({ exportDone: null }),
    notice: (text: string) => store.toast(text),
  };
}
