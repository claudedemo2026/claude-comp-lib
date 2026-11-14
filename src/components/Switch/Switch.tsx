import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { ChoiceText, joinIds } from '../shared/ChoiceText';
import { cx } from '../../utils/cx';
import './Switch.scss';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  /** Visible label. If omitted, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text below the label. */
  description?: ReactNode;
}

/** An on/off toggle for settings that take effect immediately. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, id, className, disabled, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `switch${autoId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  return (
    <div className={cx('ds-choice', 'ds-switch', disabled && 'ds-choice--disabled', className)}>
      <span className="ds-choice__control">
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className="ds-switch__input"
          disabled={disabled}
          aria-describedby={joinIds(describedBy, descriptionId)}
        />
        <span className="ds-switch__thumb" aria-hidden="true" />
      </span>
      <ChoiceText htmlFor={inputId} label={label} description={description} descriptionId={descriptionId} />
    </div>
  );
});
