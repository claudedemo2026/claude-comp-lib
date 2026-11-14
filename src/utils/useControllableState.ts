import { useCallback, useState } from 'react';

interface Options<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

/** Supports both controlled (`value`) and uncontrolled (`defaultValue`) usage. */
export function useControllableState<T>({ value, defaultValue, onChange }: Options<T>) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue] as const;
}
