import { useId, useMemo, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldMessage } from './FieldMessage';
import { FormFieldContext } from './FormFieldContext';
import { Label } from './Label';
import './FormField.scss';

export interface FormFieldProps {
  /** Visible label for the control. */
  label: ReactNode;
  /** Help text shown below the control. */
  hint?: ReactNode;
  /** Error text. When present, the control is marked invalid. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Id for the control. Generated when omitted. */
  id?: string;
  className?: string;
  /** A single form control, e.g. <Input />, <TextArea /> or <Select />. */
  children: ReactNode;
}

/**
 * Wraps a control with a label, hint and error message, and wires up
 * `id`, `aria-describedby`, `aria-invalid`, `required` and `disabled`.
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  disabled = false,
  id,
  className,
  children,
}: FormFieldProps) {
  const autoId = useId();
  const controlId = id ?? `field${autoId}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const invalid = Boolean(error);

  const context = useMemo(
    () => ({ controlId, hintId, errorId, invalid, required, disabled }),
    [controlId, hintId, errorId, invalid, required, disabled],
  );

  return (
    <div className={cx('ds-field', disabled && 'ds-field--disabled', className)}>
      <Label htmlFor={controlId} required={required}>
        {label}
      </Label>
      <FormFieldContext.Provider value={context}>{children}</FormFieldContext.Provider>
      {hint && hintId && (
        <FieldMessage id={hintId} tone="hint">
          {hint}
        </FieldMessage>
      )}
      {error && errorId && (
        <FieldMessage id={errorId} tone="error">
          {error}
        </FieldMessage>
      )}
    </div>
  );
}
