import type { ScopeStatus } from '../../data/types';

export interface ScopeRow {
  key: string;
  title: string;
  sub: string;
  req: string;
  trade: string;
  division: string;
  status: ScopeStatus;
  version: string;
  updated: string;
  owner: string;
  action: string;
  /** What opening the row does: the scope being edited, the populated HVAC example, or a placeholder. */
  target: 'current' | 'example' | 'placeholder';
}

/** Other scopes in the project's subcontract register. Only the HVAC scope holds full demo content. */
export const REGISTER_ROWS: ScopeRow[] = [
  { key: 'hvac', title: 'HVAC Scope of Work — Phase 2 Residential Tower', sub: 'Not awarded · 3 bidders', req: 'Tender closed Nov 25, 2026',
    trade: 'Mechanical — HVAC', division: 'Div 07, 23, 25', status: 'Issued for tender', version: '2.3', updated: 'Nov 18, 2026',
    owner: 'Priya Raman', action: 'Open', target: 'example' },
  { key: 'plumbing', title: 'Plumbing and Drainage Scope of Work', sub: 'Aquaflow Plumbing Inc.', req: 'REQ-0187-0398',
    trade: 'Mechanical — Plumbing', division: 'Division 22 — Plumbing', status: 'Revising for award', version: '1.4', updated: 'Nov 12, 2026',
    owner: 'Marcus Lee', action: 'Open', target: 'placeholder' },
  { key: 'electrical', title: 'Electrical Scope of Work', sub: 'Not awarded', req: 'Tender open',
    trade: 'Electrical', division: 'Div 26, 27, 28', status: 'Issued for tender', version: '3.0', updated: 'Nov 3, 2026',
    owner: 'Priya Raman', action: 'Open', target: 'placeholder' },
  { key: 'fire', title: 'Fire Suppression Scope of Work', sub: 'Sentinel Fire Systems', req: 'REQ-0187-0302',
    trade: 'Fire protection', division: 'Division 21 — Fire Suppression', status: 'Attached to requisition', version: '4.1', updated: 'Sep 22, 2026',
    owner: 'Dana Whitfield', action: 'View', target: 'placeholder' },
];
