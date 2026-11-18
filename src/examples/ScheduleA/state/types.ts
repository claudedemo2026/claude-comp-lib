import type {
  AgentKey, AgentRun, ClauseKind, Clause, Details, Finding, FindingStatus, ImportRow, Mode, RefDoc, Role,
  Screen, Section, Severity, Version,
} from '../data/types';

export type ModalName = 'import' | 'historical' | 'export' | 'newScope' | 'createVersion' | 'restore';
export type PanelTab = 'refs' | 'review';

export interface ImportState {
  stage: 'input' | 'parsing' | 'preview';
  text: string;
  source: string;
  rows: ImportRow[];
}

export interface ExportResult {
  title: string;
  detail: string;
  file: string;
}

export interface FindingFilters {
  agent: AgentKey | 'All';
  sev: Severity | 'All';
  status: FindingStatus | 'All';
}

export interface ClauseDraft {
  id: string;
  text: string;
  kind: ClauseKind;
  crit: boolean;
}

export interface AppState {
  mode: Mode;
  role: Role;
  screen: Screen;
  details: Details;
  detErr: Partial<Record<'title' | 'trade' | 'divisions', string>>;
  scopeTitle: string;
  scopeDesc: string;
  sections: Section[];
  docs: RefDoc[];
  refsTried: boolean;
  agents: Record<AgentKey, AgentRun>;
  findings: Finding[];
  version: string;
  versions: Version[];
  saveState: 'saved' | 'saving';
  savedAt: string;
  /** The clause open in the inline editor, with its unsaved text. */
  draft: ClauseDraft | null;
  highlight: string | null;
  panelOpen: boolean;
  panelTab: PanelTab;
  selectedId: string | null;
  refDocId: string | null;
  filters: FindingFilters;
  modal: ModalName | null;
  histSection: string | null;
  historyOpen: boolean;
  restoreV: string | null;
  imp: ImportState;
  exportDone: ExportResult | null;
  override: boolean;
  toast: { text: string; undo: boolean } | null;
  undo: { sec: string; idx: number; item: Clause } | null;
}
