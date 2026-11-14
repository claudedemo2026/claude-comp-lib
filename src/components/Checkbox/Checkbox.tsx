import { forwardRef, useEffect, useId, useMemo, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { ChoiceText, joinIds } from '../shared/ChoiceText';
import { cx } from '../../utils/cx';
import { mergeRefs } from '../../utils/mergeRefs';
import './Checkbox.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label. If omitted, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text below the label. */
  description?: ReactNode;
  /** Shows a "mixed" state, e.g. for a "select all" checkbox. */
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, invalid = false, id, className, disabled, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? `checkbox${autoId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const innerRef = useRef<HTMLInputElement>(null);
  const combinedRef = useMemo(() => mergeRefs(innerRef, ref), [ref]);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={cx('ds-choice', 'ds-checkbox', disabled && 'ds-choice--disabled', className)}>
      <span className="ds-choice__control">
        <input
          {...rest}
          ref={combinedRef}
          id={inputId}
          type="checkbox"
          className="ds-checkbox__input"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={joinIds(describedBy, descriptionId)}
        />
        <svg className="ds-checkbox__icon ds-checkbox__icon--check" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="ds-checkbox__icon ds-checkbox__icon--dash" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 8h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <ChoiceText htmlFor={inputId} label={label} description={description} descriptionId={descriptionId} />
    </div>
  );
});
