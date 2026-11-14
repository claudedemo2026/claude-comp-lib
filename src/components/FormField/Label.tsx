import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './FormField.scss';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Shows a visual required indicator. Pair with `required` on the control. */
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required = false, className, children, ...rest },
  ref,
) {
  return (
    <label ref={ref} className={cx('ds-label', className)} {...rest}>
      {children}
      {required && (
        <span className="ds-label__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});
