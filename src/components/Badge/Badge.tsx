import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Badge.scss';

/** Hues from theme.json `colors.accent` that have both a light and a dark shade. */
export const BADGE_HUES = [
  'blue', 'brown', 'cyan', 'green', 'indigo', 'jade', 'lavender', 'mint',
  'olive', 'orange', 'pink', 'purple', 'red', 'sky', 'teal', 'yellow',
] as const;

export type BadgeHue = (typeof BADGE_HUES)[number];
export type BadgeColor = 'neutral' | BadgeHue;
export type BadgeVariant = 'subtle' | 'solid';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Accent hue from the theme, or neutral grey. */
  color?: BadgeColor;
  /** `subtle`: light background with dark text. `solid`: dark background with white text. */
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a small dot before the label (e.g. for status). */
  dot?: boolean;
  /** Icon rendered before the label. */
  icon?: ReactNode;
}

/** A small, non-interactive label for status, counts or categories. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { color = 'neutral', variant = 'subtle', size = 'md', dot = false, icon, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('ds-badge', `ds-badge--${color}`, `ds-badge--${variant}`, `ds-badge--${size}`, className)}
      {...rest}
    >
      {dot && <span className="ds-badge__dot" aria-hidden="true" />}
      {icon && !dot && (
        <span className="ds-badge__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
});
