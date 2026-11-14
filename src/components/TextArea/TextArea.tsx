import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { useFormFieldControl } from '../FormField/FormFieldContext';
import { cx } from '../../utils/cx';
import './TextArea.scss';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the textarea as invalid. Inferred from a parent FormField's `error`. */
  invalid?: boolean;
  /** Which directions the user can resize. */
  resize?: 'none' | 'vertical' | 'both';
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    invalid,
    resize = 'vertical',
    rows = 4,
    className,
    id,
    disabled,
    required,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const control = useFormFieldControl({ id, disabled, required, invalid, describedBy });

  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      id={control.id}
      className={cx(
        'ds-textarea',
        `ds-textarea--resize-${resize}`,
        control.invalid && 'ds-textarea--invalid',
        className,
      )}
      disabled={control.disabled}
      required={control.required}
      aria-invalid={control.invalid || undefined}
      aria-describedby={control.describedBy}
    />
  );
});
