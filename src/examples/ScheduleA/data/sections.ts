import type { Clause, ClauseKind, ClauseSource, Section } from './types';

export const clause = (
  id: string,
  text: string,
  kind: ClauseKind = 'Inclusion',
  crit = false,
  tags: string[] = [],
  src = '',
  srcType: ClauseSource = '',
): Clause => ({ id, text, kind, crit, tags, src, srcType });

const C = clause;

/** The HVAC trade template content (9 sections, 27 clauses), also used by the populated example scope. */
export function seedSections(): Section[] {
  return [
    { id: 'gen', title: 'General Requirements', items: [
      C('i1', 'Supply all labour, materials, equipment, supervision and services to complete the HVAC work described in Division 23 specifications and drawings M-001 to M-412, Issued for Construction Rev. 3.', 'Inclusion', true, ['Div 23']),
      C('i2', 'Work covers Levels P3 through 38 and the Mechanical Penthouse of the Phase 2 tower only. Phase 1 podium tie-ins are limited to the connections shown on M-210.', 'Inclusion', false, ['Phasing']),
      C('i3', 'Provide all hoisting, rigging and material handling required for the Work.', 'Inclusion', false, ['Hoisting']),
      C('i4', 'Pricing is based on the Contractor’s master schedule dated 2026-10-02. Resequencing beyond two mobilizations per floor is a change to the Work.', 'Clarification', false, ['Schedule']),
    ] },
    { id: 'lab', title: 'Labour', items: [
      C('i5', 'Provide a full-time site superintendent with at least 10 years of high-rise HVAC experience, on site whenever the Subcontractor’s forces are working.'),
      C('i6', 'All work performed by UA Local 46 and Sheet Metal Workers Local 30 tradespeople, consistent with the Contractor’s collective agreements.', 'Inclusion', true, ['Labour relations']),
      C('i7', 'Overtime and shift premiums needed to meet the Subcontractor’s own schedule commitments are included.'),
    ] },
    { id: 'mat', title: 'Materials and Equipment', items: [
      C('i8', 'Supply all ductwork, piping, valves, insulation and fittings per Sections 23 07 00, 23 21 13 and 23 31 13.', 'Inclusion', false, ['23 07 00', '23 21 13']),
      C('i9', 'Supply 412 in-suite fan coil units (FCU-1 to FCU-6) and two rooftop make-up air units (MAU-1, MAU-2).', 'Inclusion', true, ['Long lead']),
      C('i10', 'Owner-furnished energy recovery ventilators ERV-1 to ERV-4: receive, store, hoist and install.', 'Clarification', false, ['OFCI']),
    ] },
    { id: 'ins', title: 'Installation', items: [
      C('i11', 'Install all HVAC equipment, ductwork and hydronic piping complete and ready for operation.'),
      C('i12', 'Provide sleeves and lay out penetrations in post-tensioned slabs before each pour. No coring without the structural engineer’s written approval.', 'Inclusion', true, ['PT slabs']),
      C('i13', 'Condensate drain piping from each fan coil unit to the nearest plumbing stack connection, including traps and cleanouts.', 'Inclusion', false, [], 'Liberty Village Residences (2023)', 'hist'),
      C('i14', 'Supply and install all low-voltage control wiring and conduit for the building automation system.', 'Inclusion', false, ['BAS']),
    ] },
    { id: 'coord', title: 'Coordination', items: [
      C('i15', 'Attend weekly BIM coordination meetings and submit clash-free LOD 400 models two weeks before installation starts on each floor.', 'Inclusion', false, ['BIM']),
      C('i16', 'Coordinate equipment and housekeeping pad locations with Division 03 before each pour.', 'Inclusion', false, ['Div 03']),
    ] },
    { id: 'test', title: 'Testing and Commissioning', items: [
      C('i17', 'Test, adjust and balance all air and hydronic systems to within ±10% of design through an independent AABC- or NEBB-certified agency, and submit a certified TAB report.', 'Inclusion', false, ['TAB']),
      C('i18', 'Pressure test hydronic piping at 1.5 times working pressure for two hours, witnessed by the Consultant.'),
      C('i19', 'Support the Commissioning Authority through pre-functional checklists and functional performance testing.', 'Inclusion', false, ['Cx']),
    ] },
    { id: 'safe', title: 'Safety and Compliance', items: [
      C('i20', 'Comply with WSIB requirements, the Construction Projects Regulation (O. Reg. 213/91) and fall-protection requirements, including 100% tie-off above 3 m.', 'Inclusion', false, ['OHSA']),
      C('i21', 'Obtain hot work permits for all brazing and welding and provide a fire watch for 60 minutes after completion.', 'Inclusion', false, ['Hot work']),
    ] },
    { id: 'close', title: 'Closeout and Documentation', items: [
      C('i22', 'Submit O&M manuals, as-built drawings (CAD and PDF) and warranty letters within 30 days of Substantial Performance.'),
      C('i23', 'Provide eight hours of recorded operator training to the Owner’s facilities staff.'),
    ] },
    { id: 'excl', title: 'Exclusions', items: [
      C('i24', 'Line-voltage power wiring to mechanical equipment (by Division 26).', 'Exclusion', false, ['Div 26']),
      C('i25', 'Control wiring (by Division 26).', 'Exclusion', false, ['Div 26']),
      C('i26', 'Structural steel dunnage for rooftop equipment (by Division 05).', 'Exclusion', false, ['Div 05']),
      C('i27', 'Building permit fees are by the Contractor. The Subcontractor’s own trade permits and inspections are included.', 'Clarification', false, ['Permits']),
    ] },
  ];
}

/** Standard section names, in document order. */
export const SECTION_ORDER = [
  'General Requirements', 'Labour', 'Materials and Equipment', 'Installation', 'Coordination',
  'Testing and Commissioning', 'Safety and Compliance', 'Closeout and Documentation', 'Clarifications', 'Exclusions',
];

export const DIVISIONS: [code: string, name: string][] = [
  ['01', 'General Requirements'], ['07', 'Thermal and Moisture Protection'], ['21', 'Fire Suppression'],
  ['22', 'Plumbing'], ['23', 'HVAC'], ['25', 'Integrated Automation'], ['26', 'Electrical'],
  ['27', 'Communications'], ['28', 'Electronic Safety and Security'], ['33', 'Utilities'],
];

/** Position of a section in the standard document order; unknown names go after Coordination. */
export function sectionRank(title: string) {
  const k = SECTION_ORDER.indexOf(title);
  return k < 0 ? 4.5 : k;
}
