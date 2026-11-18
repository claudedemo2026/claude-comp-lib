import { TODAY } from '../data/project';
import type { ClauseKind } from '../data/types';

/** "$35k" */
export const moneyShort = (n: number) => `$${Math.round(n / 1000)}k`;

/** "$35,000" */
export const money = (n: number) => `$${n.toLocaleString('en-CA')}`;

/** Current time of day, e.g. "2:05 p.m.". */
export function clock() {
  return new Date().toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

/** Timestamp for notes and versions, pinned to the prototype's fixed date. */
export const stamp = () => `${TODAY}, ${clock()}`;

/** "2.3" → "2.4" */
export function bumpVersion(v: string) {
  const [major, minor = '0'] = v.split('.');
  return `${major}.${parseInt(minor, 10) + 1}`;
}

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const kindColor = (kind: ClauseKind) =>
  kind === 'Exclusion' ? 'orange' : kind === 'Clarification' ? 'neutral' : 'blue';

/** Prefix used when a clause is printed in the exported document. */
export const kindPrefix = (kind: ClauseKind) =>
  kind === 'Exclusion' ? 'Excluded: ' : kind === 'Clarification' ? 'Clarification: ' : '';

let nextId = 900;
export const newId = () => `n${++nextId}`;
