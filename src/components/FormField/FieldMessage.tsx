import type { ReactNode } from 'react';
import './FormField.scss';

interface FieldMessageProps {
  id: string;
  tone: 'hint' | 'error';
  children: ReactNode;
}

/** Hint or error text below a control. Internal, shared by FormField and RadioGroup. */
export function FieldMessage({ id, tone, children }: FieldMessageProps) {
  return (
    <p id={id} className={`ds-field__${tone}`}>
      {children}
    </p>
  );
}
