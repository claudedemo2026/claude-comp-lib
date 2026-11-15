import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../utils/types';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. */
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    startIcon,
    endIcon,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${size}`,
        fullWidth && 'ds-button--full-width',
        loading && 'ds-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="ds-button__spinner" aria-hidden="true" />
      ) : (
        startIcon && (
          <span className="ds-button__icon" aria-hidden="true">
            {startIcon}
          </span>
        )
      )}
      {children != null && <span className="ds-button__label">{children}</span>}
      {endIcon && !loading && (
        <span className="ds-button__icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
});
