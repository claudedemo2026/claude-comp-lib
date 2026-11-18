import type { SidebarSection } from '../../../../global/Sidebar';

/** Gate Three product navigation. Schedule A lives under Subcontracts. */
export const GATE_THREE_SECTIONS: SidebarSection[] = [
  {
    id: 'products',
    title: 'Products',
    items: [
      { id: 'p-projects', label: 'Projects' },
      { id: 'p-estimating', label: 'Estimating' },
      { id: 'p-subcontracts', label: 'Subcontracts' },
      { id: 'p-field', label: 'Field Operations' },
      { id: 'p-financials', label: 'Financials' },
      { id: 'p-documents', label: 'Documents' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    items: [
      { id: 'p-reports', label: 'Reports' },
      { id: 'p-admin', label: 'Administration' },
    ],
  },
];

export const ACTIVE_NAV_ID = 'p-subcontracts';
