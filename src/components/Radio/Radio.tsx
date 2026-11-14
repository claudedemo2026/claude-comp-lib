import { forwardRef, useContext, useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { ChoiceText, joinIds } from '../shared/ChoiceText';
import { cx } from '../../utils/cx';
import { RadioGroupContext } from './RadioGroupContext';
import './Radio.scss';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value'> {
  value: string;
  /** Visible label. If omitted, pass `aria-label`. */
  label?: ReactNode;
  /** Secondary text below the label. */
  description?: ReactNode;
}

/** A radio button. Use inside <RadioGroup>, which manages name, value and state. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, id, className, disabled, name, checked, onChange, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? `radio${autoId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isDisabled = disabled ?? group?.disabled;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    if (group && event.target.checked) group.select(value);
  };

  return (
    <div className={cx('ds-choice', 'ds-radio', isDisabled && 'ds-choice--disabled', className)}>
      <span className="ds-choice__control">
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type="radio"
          className="ds-radio__input"
          value={value}
          name={group?.name ?? name}
          checked={group ? group.value === value : checked}
          onChange={handleChange}
          disabled={isDisabled}
          required={rest.required ?? group?.required}
          aria-invalid={group?.invalid || undefined}
          aria-describedby={joinIds(describedBy, descriptionId)}
        />
      </span>
      <ChoiceText htmlFor={inputId} label={label} description={description} descriptionId={descriptionId} />
    </div>
  );
});
