import type { ReactNode } from 'react';
import { AlertCircleIcon, CheckIcon, InfoIcon, WarningIcon } from '../../icons';

export type BannerTone = 'info' | 'warn' | 'crit' | 'ok';

const ICON: Record<BannerTone, ReactNode> = {
  info: <InfoIcon size={18} />,
  warn: <WarningIcon size={18} />,
  crit: <AlertCircleIcon size={18} />,
  ok: <CheckIcon size={18} />,
};

export interface BannerProps {
  tone: BannerTone;
  children: ReactNode;
  /** Replaces the tone's default icon. */
  icon?: ReactNode;
  compact?: boolean;
}

/** Inline status message. Critical banners are announced as alerts. */
export function Banner({ tone, children, icon, compact }: BannerProps) {
  return (
    <div className={`sa-banner sa-banner--${tone}${compact ? ' sa-banner--compact' : ''}`} role={tone === 'crit' ? 'alert' : undefined}>
      {icon ?? ICON[tone]}
      <span>{children}</span>
    </div>
  );
}
