import { createContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  disabled?: boolean;
  required?: boolean;
  invalid: boolean;
  select: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);
