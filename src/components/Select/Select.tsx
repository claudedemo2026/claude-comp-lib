import { forwardRef, type SelectHTMLAttributes } from 'react';
import { useFormFieldControl } from '../FormField/FormFieldContext';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../utils/types';
import './Select.scss';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: ControlSize;
  /** Marks the select as invalid. Inferred from a parent FormField's `error`. */
  invalid?: boolean;
  /** Text shown before the user picks an option. */
  placeholder?: string;
  /** Class name for the outer wrapper. */
  className?: string;
}

/** A styled native <select>. Pass <option> and <optgroup> elements as children. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    size = 'md',
    invalid,
    placeholder,
    className,
    id,
    disabled,
    required,
    value,
    defaultValue,
    children,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const control = useFormFieldControl({ id, disabled, required, invalid, describedBy });
  // Show the placeholder by default when the select is uncontrolled.
  const initialValue =
    value === undefined && defaultValue === undefined && placeholder ? '' : defaultValue;

  return (
    <div
      className={cx(
        'ds-select',
        `ds-select--${size}`,
        control.invalid && 'ds-select--invalid',
        className,
      )}
    >
      <select
        {...rest}
        ref={ref}
        id={control.id}
        className="ds-select__control"
        value={value}
        defaultValue={initialValue}
        disabled={control.disabled}
        required={control.required}
        aria-invalid={control.invalid || undefined}
        aria-describedby={control.describedBy}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <svg className="ds-select__chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
