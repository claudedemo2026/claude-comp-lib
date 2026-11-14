import { createContext, useContext } from 'react';

export interface FormFieldContextValue {
  controlId: string;
  hintId?: string;
  errorId?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

interface ControlProps {
  id?: string;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Lets a control pick up id, ARIA wiring and state from a surrounding
 * <FormField>, while still allowing explicit props to win.
 */
export function useFormFieldControl(props: ControlProps) {
  const field = useContext(FormFieldContext);
  const describedBy =
    [props.describedBy, field?.hintId, field?.errorId].filter(Boolean).join(' ') || undefined;
  const invalid = props.invalid ?? field?.invalid ?? false;

  return {
    id: props.id ?? field?.controlId,
    describedBy,
    invalid,
    required: props.required ?? field?.required,
    disabled: props.disabled ?? field?.disabled,
  };
}
