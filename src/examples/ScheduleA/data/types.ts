export type Role = 'admin' | 'editor' | 'follower';
export type Mode = 'fresh' | 'main';
export type Screen = 'list' | 'details' | 'refs' | 'editor' | 'review' | 'export';
export type StepKey = Exclude<Screen, 'list'>;

export type ClauseKind = 'Inclusion' | 'Exclusion' | 'Clarification';
export type ClauseSource = '' | 'ai' | 'hist' | 'ref' | 'import';

export interface Clause {
  id: string;
  text: string;
  kind: ClauseKind;
  crit: boolean;
  tags: string[];
  /** Where the clause came from (project, document or finding), shown as a provenance tag. */
  src: string;
  srcType: ClauseSource;
}

export interface Section {
  id: string;
  title: string;
  items: Clause[];
}

export type DocType = 'Standard' | 'Template' | 'Project' | 'Historical' | 'CO records';

export interface RefDoc {
  id: string;
  group: string;
  name: string;
  type: DocType;
  meta: string;
  date: string;
  selected: boolean;
}

export interface Excerpt {
  ref: string;
  text: string;
}

export type AgentKey = 'lang' | 'gap';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type FindingStatus = 'Open' | 'Accepted' | 'Resolved' | 'Dismissed';

export interface Note {
  by: string;
  at: string;
  text: string;
}

export interface Finding {
  id: string;
  agent: AgentKey;
  sev: Severity;
  /** Section id the finding belongs to. */
  section: string;
  title: string;
  recommendation: string;
  status: FindingStatus;
  notes: Note[];
  inserted?: boolean;
  // Language review findings
  explanation?: string;
  source?: string;
  action?: string;
  // Historical gap findings
  confidence?: number;
  evidence?: string;
  projects?: string[];
  lo?: number;
  hi?: number;
  median?: string;
}

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error';

export interface AgentRun {
  status: AgentStatus;
  ranAt: string;
  stale: boolean;
  error: string;
}

export type ScopeStatus = 'Draft' | 'Issued for tender' | 'Revising for award' | 'Attached to requisition';

export interface Details {
  project: string;
  projectNo: string;
  contract: string;
  requisition: string;
  sub: string;
  trade: string;
  divisions: string[];
  projectType: string;
  owner: string;
  status: ScopeStatus;
}

export interface Version {
  v: string;
  by: string;
  role: string;
  at: string;
  note: string;
}

export interface Requisition {
  id: string;
  sub: string;
  contract: string;
  label: string;
}

export interface HistClause {
  id: string;
  title: string;
  from: string;
  meta: string;
  text: string;
}

export interface ImportRow {
  section: string;
  text: string;
  kind: ClauseKind;
  on: boolean;
}

export interface Person {
  name: string;
  title: string;
}
