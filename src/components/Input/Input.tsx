import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { useFormFieldControl } from '../FormField/FormFieldContext';
import { cx } from '../../utils/cx';
import type { ControlSize } from '../../utils/types';
import './Input.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ControlSize;
  /** Marks the input as invalid. Inferred from a parent FormField's `error`. */
  invalid?: boolean;
  /** Content (usually an icon or unit) rendered inside, before the text. */
  startAdornment?: ReactNode;
  /** Content rendered inside, after the text. */
  endAdornment?: ReactNode;
  /** Class name for the outer wrapper. */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    invalid,
    startAdornment,
    endAdornment,
    className,
    id,
    disabled,
    required,
    type = 'text',
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const control = useFormFieldControl({ id, disabled, required, invalid, describedBy });

  return (
    <div
      className={cx(
        'ds-input',
        `ds-input--${size}`,
        control.invalid && 'ds-input--invalid',
        control.disabled && 'ds-input--disabled',
        className,
      )}
    >
      {startAdornment && <span className="ds-input__adornment">{startAdornment}</span>}
      <input
        {...rest}
        ref={ref}
        type={type}
        id={control.id}
        className="ds-input__control"
        disabled={control.disabled}
        required={control.required}
        aria-invalid={control.invalid || undefined}
        aria-describedby={control.describedBy}
      />
      {endAdornment && <span className="ds-input__adornment">{endAdornment}</span>}
    </div>
  );
});
