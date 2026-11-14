import type { ReactNode } from 'react';
import './choice.scss';

interface ChoiceTextProps {
  htmlFor: string;
  label?: ReactNode;
  description?: ReactNode;
  descriptionId?: string;
}

/** Label + description shown next to a checkbox, radio or switch. Internal. */
export function ChoiceText({ htmlFor, label, description, descriptionId }: ChoiceTextProps) {
  if (!label && !description) return null;
  return (
    <span className="ds-choice__text">
      {label && (
        <label htmlFor={htmlFor} className="ds-choice__label">
          {label}
        </label>
      )}
      {description && (
        <span id={descriptionId} className="ds-choice__description">
          {description}
        </span>
      )}
    </span>
  );
}

export function joinIds(...ids: Array<string | undefined | false>): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined;
}
