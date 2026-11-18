import type { ReactNode } from 'react';

export interface StepHeadingProps {
  title: string;
  description: ReactNode;
  /** Buttons shown to the right of the heading. */
  actions?: ReactNode;
}

/** Title, one-line explanation and optional actions at the top of each step. */
export function StepHeading({ title, description, actions }: StepHeadingProps) {
  return (
    <div className="sa-row sa-row--between sa-row--start">
      <div className="sa-step-heading">
        <h2 className="sa-h-step">{title}</h2>
        <p className="sa-muted">{description}</p>
      </div>
      {actions && <div className="sa-row">{actions}</div>}
    </div>
  );
}
