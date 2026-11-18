import type { ReactNode } from 'react';
import { Badge } from '../../../../components/Badge';
import { Card } from '../../../../components/Card';
import { useScheduleA } from '../../hooks/useScheduleA';
import { DownloadIcon, HistoryIcon, NewDocIcon, TemplateIcon } from '../../icons';

interface OptionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  recommended?: boolean;
  onClick: () => void;
}

function StartOption({ icon, title, children, recommended, onClick }: OptionProps) {
  return (
    <button type="button" className={`sa-option${recommended ? ' sa-option--recommended' : ''}`} onClick={onClick}>
      <span className="sa-row sa-row--between sa-row--nowrap">
        <span className="sa-option__icon">{icon}</span>
        {recommended && <Badge size="sm" color="blue">Recommended</Badge>}
      </span>
      <b>{title}</b>
      <span className="sa-small sa-muted">{children}</span>
    </button>
  );
}

/** Empty state for a scope with no clauses: template, past scope, import, or blank. */
export function StartOptions({ blankStarted }: { blankStarted: boolean }) {
  const { d, actions } = useScheduleA();
  const disabled = !d.canEdit;

  return (
    <Card padding="lg" className="sa-empty">
      <div className="sa-empty__icon"><NewDocIcon size={28} /></div>
      <h2 className="sa-h-step">Start the scope of work</h2>
      <p className="sa-muted sa-measure">
        {blankStarted
          ? 'You started a blank scope. Changed your mind? Any option below replaces the empty sections, or keep going and add clauses to the sections below.'
          : 'This Schedule A has no sections yet. Start from the company template for this trade, reuse a scope from a similar project, or build it section by section.'}
      </p>
      {disabled ? (
        <p className="sa-small sa-muted">Followers can't start a scope.</p>
      ) : (
        <>
          <div className="sa-options">
            <StartOption recommended icon={<TemplateIcon size={20} />} title="Start from the trade template" onClick={actions.scope.startTemplate}>
              Schedule A Template — Mechanical (HVAC) v4.2. 9 standard sections, 27 clauses. Legal-approved May 2026.
            </StartOption>
            <StartOption icon={<HistoryIcon size={20} />} title="Copy a past scope" onClick={actions.scope.startHistorical}>
              Liberty Village Residences — HVAC (2023), 38-storey residential.
            </StartOption>
            <StartOption icon={<DownloadIcon size={20} />} title="Import your notes" onClick={actions.refs.openImport}>
              From your drawing and spec review. Paste text or upload a file, then check the clauses before adding them.
            </StartOption>
          </div>
          {!blankStarted && (
            <p className="sa-small sa-muted">
              Prefer to write it yourself?{' '}
              <button type="button" className="sa-link-btn" onClick={actions.scope.startBlank}>Start with a blank scope</button>
            </p>
          )}
        </>
      )}
    </Card>
  );
}
