import type { DocType, Excerpt, RefDoc } from './types';

export const DOC_GROUPS = [
  'Standard contract schedules',
  'Schedule A templates',
  'Project-specific schedules',
  'Historical scope examples',
  'Historical change-order records',
];

export function seedDocs(): RefDoc[] {
  return [
    { id: 'd1', group: 'Standard contract schedules', name: 'CCDC 17 — Stipulated Price Contract between Contractor and Subcontractor', type: 'Standard', meta: 'Gate Three library · 38 pages', date: 'Mar 12, 2024', selected: true },
    { id: 'd2', group: 'Standard contract schedules', name: 'Schedule B — Supplementary General Conditions (Harbourfront Ph. 2)', type: 'Standard', meta: 'Gate Three · project contract · 24 pages', date: 'Aug 21, 2026', selected: true },
    { id: 'd3', group: 'Standard contract schedules', name: 'Schedule C — Health, Safety and Environmental Requirements', type: 'Standard', meta: 'Gate Three library · 16 pages', date: 'Jan 9, 2026', selected: true },
    { id: 'd4', group: 'Schedule A templates', name: 'Schedule A Template — Mechanical (HVAC) v4.2', type: 'Template', meta: 'Legal-approved · 27 clauses', date: 'May 30, 2026', selected: true },
    { id: 'd5', group: 'Schedule A templates', name: 'Schedule A Template — Mechanical (Plumbing) v4.1', type: 'Template', meta: 'Legal-approved · 22 clauses', date: 'May 30, 2026', selected: false },
    { id: 'd6', group: 'Project-specific schedules', name: 'Division 01 General Requirements — IFC Rev. 3', type: 'Project', meta: 'Harbourfront Ph. 2 · 86 pages', date: 'Sep 15, 2026', selected: true },
    { id: 'd7', group: 'Project-specific schedules', name: 'Section 07 84 00 Firestopping — IFC Rev. 3', type: 'Project', meta: 'Harbourfront Ph. 2 · 9 pages', date: 'Sep 15, 2026', selected: true },
    { id: 'd8', group: 'Historical scope examples', name: 'Liberty Village Residences — HVAC Schedule A (executed)', type: 'Historical', meta: '2023 · 34 storeys · Northline Mechanical', date: 'Jun 2, 2023', selected: true },
    { id: 'd9', group: 'Historical scope examples', name: 'Queens Quay East — Mechanical Schedule A (executed)', type: 'Historical', meta: '2024 · 41 storeys · Polar Air Systems', date: 'Feb 19, 2024', selected: true },
    { id: 'd10', group: 'Historical change-order records', name: 'Mechanical change-order log, 2019–2025', type: 'CO records', meta: '412 change orders · 38 projects', date: 'Oct 31, 2026', selected: true },
    { id: 'd11', group: 'Historical change-order records', name: 'Electrical change-order log, 2019–2025', type: 'CO records', meta: '377 change orders · 35 projects', date: 'Oct 31, 2026', selected: false },
  ];
}

export const DOC_TYPE_COLOR: Record<DocType, 'indigo' | 'blue' | 'teal' | 'cyan' | 'brown'> = {
  Standard: 'indigo',
  Template: 'blue',
  Project: 'teal',
  Historical: 'cyan',
  'CO records': 'brown',
};

export const isHistoricalDoc = (type: DocType) => type === 'Historical' || type === 'CO records';

export const REF_EXCERPTS: Record<string, Excerpt[]> = {
  d1: [
    { ref: 'GC 3.7', text: 'The Subcontractor shall coordinate the Subcontract Work with the work of other subcontractors and the Contractor.' },
    { ref: 'GC 6.1', text: 'The Contractor may, without invalidating the Subcontract, make changes by altering, adding to, or deducting from the Subcontract Work.' },
  ],
  d2: [
    { ref: 'GC 3.14 Hoisting', text: 'The Contractor’s tower crane will be available to subcontractors according to the Contractor’s weekly lift schedule. All other hoisting is by the Subcontractor.' },
    { ref: 'GC 3.21 Temporary services', text: 'Temporary heat after building enclosure shall be provided by the mechanical subcontractor using permanent equipment where permitted by the Consultant.' },
  ],
  d3: [
    { ref: 's. 2.4 Fall protection', text: 'Workers exposed to a fall of 3 m or more shall use a fall-arrest system with 100% tie-off.' },
    { ref: 's. 4.1 Hot work', text: 'A hot work permit is required for all welding, brazing and cutting, with a fire watch of 60 minutes after work stops.' },
  ],
  d4: [
    { ref: 'Clause 1.1', text: 'Supply all labour, materials, equipment, supervision and services to complete the work described in the Division 23 specifications and drawings.' },
    { ref: 'Clause 7.2', text: 'Test, adjust and balance all air and hydronic systems to within ±10% of design through an independent AABC- or NEBB-certified agency.' },
    { ref: 'Clause 9.4', text: 'Provide attic stock of one complete set of filters for every air-handling unit and fan coil.' },
  ],
  d5: [{ ref: 'Clause 3.2', text: 'Supply and install domestic water, sanitary and storm piping per Division 22.' }],
  d6: [
    { ref: '01 31 19 Project meetings', text: 'Attend weekly coordination meetings and submit three-week look-ahead schedules every Monday.' },
    { ref: '01 78 00 Closeout', text: 'Submit O&M manuals and as-built drawings within 30 days of Substantial Performance.' },
  ],
  d7: [
    { ref: '1.3.2 Responsibility', text: 'Firestopping at penetrations shall be provided by the trade making the penetration.' },
    { ref: '1.5 Submittals', text: 'Submit ULC-listed system drawings for each firestopping condition before installation.' },
  ],
  d8: [
    { ref: 'Clause 2.6', text: 'Provide temporary heating and ventilation using permanent equipment from building enclosure until Substantial Performance.' },
    { ref: 'Clause 4.3', text: 'Condensate drain piping from each fan coil unit to the nearest plumbing stack connection, including traps and cleanouts.' },
  ],
  d9: [{ ref: 'Clause 3.5', text: 'Provide seismic restraint and vibration isolation for all mechanical equipment, piping and ductwork, designed by a P.Eng. licensed in Ontario.' }],
  d10: [
    { ref: 'CO-114 Liberty Village', text: 'Temporary heat during enclosure, not in scope: $48,200.' },
    { ref: 'CO-062 Queens Quay East', text: 'Temporary ventilation for drywall curing: $41,800.' },
    { ref: 'CO-044 Kingsway Tower', text: 'Mobile crane for rooftop MAU placement: $31,000.' },
  ],
  d11: [{ ref: 'CO-201 Mimico Commons', text: 'BAS low-voltage wiring disputed between Divisions 23 and 26: $27,300.' }],
};
