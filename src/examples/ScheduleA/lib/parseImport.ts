import type { ClauseKind, ImportRow } from '../data/types';

/** Heading keywords mapped to standard Schedule A section names. */
const SECTION_MATCHERS: [RegExp, string][] = [
  [/exclu/i, 'Exclusions'],
  [/clarif|assum|qualif/i, 'Clarifications'],
  [/test|commission|balanc/i, 'Testing and Commissioning'],
  [/coord/i, 'Coordination'],
  [/install|execution/i, 'Installation'],
  [/material|equipment|product/i, 'Materials and Equipment'],
  [/labou?r|staff|manpower/i, 'Labour'],
  [/safety|complian|health/i, 'Safety and Compliance'],
  [/close|document|warrant|o\s*&\s*m|turnover/i, 'Closeout and Documentation'],
  [/general|scope|summary/i, 'General Requirements'],
];

const titleCase = (t: string) => t.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());

function isHeading(line: string) {
  const shortCaps = line.length < 70 && /[A-Za-z]/.test(line) && line === line.toUpperCase() && !/^[0-9]/.test(line);
  return shortCaps || (/:$/.test(line) && line.length < 70) || /^(part|section)\s/i.test(line);
}

function kindFor(section: string, text: string): ClauseKind {
  if (section === 'Exclusions' || /^(excluded|exclude|not included)|by others|by division \d+\.?$/i.test(text)) return 'Exclusion';
  if (section === 'Clarifications' || /^(clarification|based on|assum)/i.test(text)) return 'Clarification';
  return 'Inclusion';
}

/**
 * Turns pasted scope notes into clauses: short upper-case or colon-ended lines become section
 * headings, every other line becomes a clause with its numbering stripped.
 */
export function parseImport(text: string): ImportRow[] {
  let current = 'General Requirements';
  const rows: ImportRow[] = [];
  text.split(/\n/).forEach((raw) => {
    const line = raw.replace(/\t/g, ' ').trim();
    if (!line) return;
    if (isHeading(line)) {
      const bare = line.replace(/:$/, '').replace(/^(part|section)\s+[0-9.\-]*\s*[-—:]?\s*/i, '');
      current = SECTION_MATCHERS.find(([re]) => re.test(bare))?.[1] ?? titleCase(bare);
      return;
    }
    const clause = line.replace(/^(\(?[0-9]{1,3}(\.[0-9]{1,3})*[.)]?|\(?[a-zA-Z][.)]|[-•*–])\s+/, '').trim();
    if (clause) rows.push({ section: current, text: clause, kind: kindFor(current, clause), on: true });
  });
  return rows;
}
