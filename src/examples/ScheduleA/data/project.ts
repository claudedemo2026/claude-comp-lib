import type { HistClause, Person, Requisition, Role, ScopeStatus, Version } from './types';

/** Fixed "today" so the prototype renders the same every time. */
export const TODAY = 'Nov 18, 2026';

export const PROJECT = { name: 'Harbourfront Tower — Phase 2', no: '24-0187', type: 'High-rise residential, 38 storeys' };

export const PEOPLE: Record<Role, Person> = {
  admin: { name: 'Priya Raman', title: 'Project Manager' },
  editor: { name: 'Marcus Lee', title: 'Estimator' },
  follower: { name: 'Elena Petrov', title: 'Construction Manager' },
};

export const ROLE_LABEL: Record<Role, string> = { admin: 'Admin', editor: 'Editor', follower: 'Follower' };

export const REQUISITIONS: Requisition[] = [
  { id: 'REQ-0187-0412', sub: 'Northline Mechanical Ltd.', contract: 'SC-23-014 HVAC Subcontract', label: 'REQ-0187-0412 · Northline Mechanical Ltd. · HVAC' },
  { id: 'REQ-0187-0471', sub: 'Polar Air Systems Inc.', contract: 'SC-23-015 HVAC Subcontract', label: 'REQ-0187-0471 · Polar Air Systems Inc. · HVAC' },
  { id: 'REQ-0187-0466', sub: 'Brightway Electric Ltd.', contract: 'SC-26-021 Electrical Subcontract', label: 'REQ-0187-0466 · Brightway Electric Ltd. · Electrical' },
];

export const TRADES = ['Electrical', 'Mechanical — HVAC', 'Mechanical — Plumbing', 'Fire protection'];

/** Default divisions for a trade picked in the New scope dialog. */
export const tradeDivisions = (trade: string) =>
  trade === 'Electrical' ? ['26'] : trade === 'Fire protection' ? ['21'] : trade.includes('Plumbing') ? ['22'] : ['23'];

export const LIFECYCLE: ScopeStatus[] = ['Draft', 'Issued for tender', 'Revising for award', 'Attached to requisition'];

export const STATUS_COLOR: Record<ScopeStatus, 'blue' | 'indigo' | 'orange' | 'green'> = {
  Draft: 'blue',
  'Issued for tender': 'indigo',
  'Revising for award': 'orange',
  'Attached to requisition': 'green',
};

export function seedVersions(): Version[] {
  return [
    { v: '2.3', by: 'Priya Raman', role: 'Project Manager', at: 'Nov 18, 2026, 10:42 AM', note: 'Issued for tender to Northline Mechanical, Polar Air Systems and Climatech.' },
    { v: '2.2', by: 'Marcus Lee', role: 'Estimator', at: 'Nov 14, 2026, 4:18 PM', note: 'Resolved balancing language (L4). Added condensate drainage from Liberty Village scope.' },
    { v: '2.1', by: 'Priya Raman', role: 'Project Manager', at: 'Nov 7, 2026, 9:05 AM', note: 'Incorporated legal comments on Schedule B hoisting.' },
    { v: '2.0', by: 'Priya Raman', role: 'Project Manager', at: 'Oct 30, 2026, 2:40 PM', note: 'Issued for pricing to three bidders.' },
    { v: '1.0', by: 'Marcus Lee', role: 'Estimator', at: 'Oct 12, 2026, 11:15 AM', note: 'Created from Schedule A Template — Mechanical (HVAC) v4.2.' },
  ];
}

export const HISTORICAL_CLAUSES: HistClause[] = [
  { id: 'h1', title: 'Temporary heating and ventilation', from: 'Liberty Village (2023)', meta: 'Used in 7 executed scopes', text: 'Provide temporary heating and ventilation using permanent equipment where permitted, from building enclosure to Substantial Performance, including filter replacement before turnover.' },
  { id: 'h2', title: 'Seismic restraints', from: 'Queens Quay East (2024)', meta: 'Used in 5 executed scopes', text: 'Provide seismic restraint and vibration isolation for all mechanical equipment, piping and ductwork per Section 23 05 48, designed by a professional engineer licensed in Ontario.' },
  { id: 'h3', title: 'Firestopping at penetrations', from: 'The Kingsway Tower (2022)', meta: 'Used in 9 executed scopes', text: 'Supply and install listed firestopping systems at all mechanical penetrations through fire-rated assemblies, with ULC system drawings submitted for review.' },
  { id: 'h4', title: 'Duct cleaning before turnover', from: 'Mimico Commons (2025)', meta: 'Used in 4 executed scopes', text: 'Clean all supply, return and exhaust ductwork to NADCA ACR standard before turnover, with a written report and photos for each system.' },
  { id: 'h5', title: 'Attic stock', from: 'Template v4.2', meta: 'Template clause 9.4', text: 'Provide attic stock of one complete set of filters for every air-handling unit and fan coil, and 2% of each diffuser and grille type, delivered to the Owner’s storage room.' },
  { id: 'h6', title: 'Winter protection of hydronic piping', from: 'Queens Quay East (2024)', meta: 'Used in 3 executed scopes', text: 'Protect filled hydronic piping from freezing until permanent heat is available, including glycol or temporary heat tracing where required.' },
];

export const SAMPLE_IMPORT_NAME = 'Div 23 scope notes.docx';

export const SAMPLE_IMPORT = [
  'GENERAL REQUIREMENTS',
  '1. Provide all labour, materials and equipment for the Division 23 work shown on M-001 to M-412, IFC Rev. 3.',
  '2. Coordinate shutdowns of existing Phase 1 services with the Owner at least 72 hours in advance.',
  'EQUIPMENT',
  '3. Supply and install two rooftop make-up air units (MAU-1, MAU-2) complete with roof curbs.',
  '4. Supply and install 412 fan coil units with factory-mounted controls.',
  'INSTALLATION',
  '5. Install seismic restraints for all suspended equipment, piping and ductwork per Section 23 05 48.',
  '6. Firestop all mechanical penetrations through fire-rated assemblies per Section 07 84 00.',
  'TESTING AND COMMISSIONING',
  '7. Return within 12 months of Substantial Performance for opposite-season testing.',
  'EXCLUSIONS',
  '8. Line-voltage power wiring to mechanical equipment, by Division 26.',
  '9. Painting of exposed piping and ductwork, by others.',
].join('\n');
