// Internal icons shared by the global navigation components.
import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 16,
  height: 16,
  'aria-hidden': true,
  focusable: false,
};

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={22} height={22} {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...base} width={22} height={22} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
