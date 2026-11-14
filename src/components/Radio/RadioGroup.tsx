import { useId, useMemo, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { FieldMessage } from '../FormField/FieldMessage';
import { joinIds } from '../shared/ChoiceText';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/useControllableState';
import { RadioGroupContext } from './RadioGroupContext';
import './Radio.scss';

export interface RadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  /** Group label, rendered as the fieldset legend. */
  label: ReactNode;
  /** Shared input name. Generated when omitted. */
  name?: string;
  /** Selected value (controlled). */
  value?: string;
  /** Initially selected value (uncontrolled). */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}

export function RadioGroup({
  label,
  name,
  value,
  defaultValue,
  onValueChange,
  orientation = 'vertical',
  required = false,
  disabled = false,
  hint,
  error,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = name ?? `radio-group${autoId}`;
  const hintId = hint ? `${groupName}-hint` : undefined;
  const errorId = error ? `${groupName}-error` : undefined;
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as ((v: string | undefined) => void) | undefined,
  });

  const context = useMemo(
    () => ({
      name: groupName,
      value: selected,
      disabled,
      required,
      invalid: Boolean(error),
      select: (next: string) => setSelected(next),
    }),
    [groupName, selected, disabled, required, error, setSelected],
  );

  return (
    <fieldset
      {...rest}
      className={cx('ds-radio-group', `ds-radio-group--${orientation}`, className)}
      disabled={disabled}
      aria-describedby={joinIds(rest['aria-describedby'], hintId, errorId)}
    >
      <legend className="ds-radio-group__legend">
        {label}
        {required && (
          <span className="ds-radio-group__required" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {hint && hintId && (
        <FieldMessage id={hintId} tone="hint">
          {hint}
        </FieldMessage>
      )}
      <div className="ds-radio-group__options">
        <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
      </div>
      {error && errorId && (
        <FieldMessage id={errorId} tone="error">
          {error}
        </FieldMessage>
      )}
    </fieldset>
  );
}
