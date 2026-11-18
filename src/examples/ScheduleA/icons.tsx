import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** 24×24 stroke icon. The library has no public icon set, so the page keeps its own. */
function Icon({ size = 16, strokeWidth = 2, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

const path = (d: string) => (props: IconProps) => <Icon {...props}><path d={d} /></Icon>;

export const SearchIcon = (p: IconProps) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></Icon>;
export const BellIcon = path('M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0');
export const HelpIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></Icon>;
export const EyeIcon = (p: IconProps) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>;
export const AlertCircleIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 17h.01" /></Icon>;
export const WarningIcon = path('M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01');
export const InfoIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></Icon>;
export const CheckIcon = path('M5 12l5 5L20 7');
export const CloseIcon = path('M6 6l12 12M18 6L6 18');
export const BackIcon = path('M15 18l-6-6 6-6');
export const EditIcon = path('M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z');
export const CopyIcon = (p: IconProps) => <Icon {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></Icon>;
export const ArrowUpIcon = path('M12 19V5M5 12l7-7 7 7');
export const ArrowDownIcon = path('M12 5v14M19 12l-7 7-7-7');
export const TrashIcon = path('M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14');
export const NewDocIcon = path('M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M12 12v6M9 15h6');
export const TemplateIcon = (p: IconProps) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>;
export const HistoryIcon = path('M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2');
export const DownloadIcon = path('M12 3v12M7 10l5 5 5-5M5 21h14');
export const AgentIcon = (p: IconProps) => <Icon {...p}><path d="M4 4h10l6 6v10H4z" /><circle cx="11" cy="14" r="3" /><path d="M13.2 16.2L16 19" /></Icon>;

/** Icons for the five workflow steps. */
export const StepIcons = {
  details: path('M9 3h6v4H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4'),
  refs: path('M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h5'),
  editor: EditIcon,
  review: path('M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4'),
  export: path('M22 2L11 13M22 2l-7 20-4-9-9-4z'),
};
