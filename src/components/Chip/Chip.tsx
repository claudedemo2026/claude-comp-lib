import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Chip.scss';

export type ChipSize = 'sm' | 'md';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Chip label. */
  children: ReactNode;
  /**
   * Makes the chip a toggle (`aria-pressed`). Use with `onClick` for filter chips.
   * Leave undefined for a plain clickable or static chip.
   */
  selected?: boolean;
  /** Makes the label a button. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Shows a remove (×) button that calls this handler. */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the remove button. Defaults to "Remove <label>" for string labels. */
  removeLabel?: string;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  size?: ChipSize;
  disabled?: boolean;
}

/**
 * A compact element for filters, selections and entered values (tags).
 * The label becomes a button when `onClick` or `selected` is set; the remove
 * button is a separate control so the two never nest.
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { children, selected, onClick, onRemove, removeLabel, icon, size = 'md', disabled = false, className, ...rest },
  ref,
) {
  const interactive = onClick !== undefined || selected !== undefined;
  const content = (
    <>
      {icon && (
        <span className="ds-chip__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ds-chip__text">{children}</span>
    </>
  );

  return (
    <span
      ref={ref}
      className={cx(
        'ds-chip',
        `ds-chip--${size}`,
        interactive && 'ds-chip--interactive',
        selected && 'ds-chip--selected',
        onRemove && 'ds-chip--removable',
        disabled && 'ds-chip--disabled',
        className,
      )}
      {...rest}
    >
      {interactive ? (
        <button
          type="button"
          className="ds-chip__label"
          aria-pressed={selected}
          disabled={disabled}
          onClick={onClick}
        >
          {content}
        </button>
      ) : (
        <span className="ds-chip__label">{content}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className="ds-chip__remove"
          aria-label={removeLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove')}
          disabled={disabled}
          onClick={onRemove}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
});
