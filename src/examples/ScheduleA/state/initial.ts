import { seedDocs } from '../data/documents';
import { seedFindings } from '../data/findings';
import { PEOPLE, PROJECT, seedVersions } from '../data/project';
import { seedSections } from '../data/sections';
import type { Mode, Role } from '../data/types';
import type { AppState } from './types';

/**
 * `fresh`: a new, empty scope that starts at step 1.
 * `main`: the populated HVAC scope, already issued for tender.
 */
export function initialState(mode: Mode, role: Role): AppState {
  const main = mode === 'main';
  return {
    mode,
    role,
    screen: main ? 'editor' : 'details',
    details: {
      project: PROJECT.name,
      projectNo: PROJECT.no,
      contract: '',
      requisition: '',
      sub: '',
      trade: main ? 'Mechanical — HVAC' : '',
      divisions: main ? ['23', '25', '07'] : [],
      projectType: PROJECT.type,
      owner: PEOPLE.admin.name,
      status: main ? 'Issued for tender' : 'Draft',
    },
    detErr: {},
    scopeTitle: main ? 'HVAC Scope of Work — Phase 2 Residential Tower' : '',
    scopeDesc: main
      ? 'Complete heating, ventilating and air-conditioning systems for the Phase 2 residential tower, from Level P3 to the Mechanical Penthouse, as shown on the Issued for Construction drawings and specified in Division 23.'
      : '',
    sections: main ? seedSections() : [],
    docs: main ? seedDocs() : seedDocs().map((d) => ({ ...d, selected: false })),
    refsTried: false,
    agents: main
      ? {
          lang: { status: 'complete', ranAt: 'Nov 18, 2026, 10:51 AM', stale: false, error: '' },
          gap: { status: 'complete', ranAt: 'Nov 18, 2026, 10:52 AM', stale: false, error: '' },
        }
      : {
          lang: { status: 'idle', ranAt: '', stale: false, error: '' },
          gap: { status: 'idle', ranAt: '', stale: false, error: '' },
        },
    findings: main ? seedFindings(true) : [],
    version: main ? '2.3' : '0.1',
    versions: main
      ? seedVersions()
      : [{ v: '0.1', by: PEOPLE.admin.name, role: PEOPLE.admin.title, at: 'Nov 18, 2026, 9:02 AM', note: 'Scope created from the Harbourfront Ph. 2 subcontract register.' }],
    saveState: 'saved',
    savedAt: main ? '10:42 AM' : '9:02 AM',
    draft: null,
    highlight: null,
    panelOpen: false,
    panelTab: main ? 'review' : 'refs',
    selectedId: null,
    refDocId: null,
    filters: { agent: 'All', sev: 'All', status: 'Open' },
    modal: null,
    histSection: null,
    historyOpen: false,
    restoreV: null,
    imp: { stage: 'input', text: '', source: '', rows: [] },
    exportDone: null,
    override: false,
    toast: null,
    undo: null,
  };
}
