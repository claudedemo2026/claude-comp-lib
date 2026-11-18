import { Button } from '../../../../components/Button';
import type { Finding } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { agentLabel } from '../../lib/findings';
import { BackIcon, InfoIcon } from '../../icons';
import { SeverityBadge, StatusBadge } from '../review/FindingBadges';
import { FindingEvidence } from './FindingEvidence';
import { FindingNotes } from './FindingNotes';

/** One finding: why it was raised, the suggested wording, and the decision on it. */
export function FindingDetail({ finding: f }: { finding: Finding }) {
  const { d, actions } = useScheduleA();
  const r = actions.review;
  const locked = !d.canEdit;
  const secNum = d.sectionIndex.get(f.section)?.n ?? '?';
  const isGap = f.agent === 'gap';

  return (
    <div className="sa-panel-detail">
      <button type="button" className="sa-back" onClick={() => actions.review.select(null)}><BackIcon />All findings</button>
      <div className="sa-stack sa-stack--tight">
        <span className="sa-row sa-row--tight">
          <span className="sa-code">{f.id}</span>
          <SeverityBadge finding={f} long />
          <StatusBadge status={f.status} />
        </span>
        <h3 className="sa-h-sub">{f.title}</h3>
        <span className="sa-small sa-muted">{agentLabel(f)} · {d.sectionLabel(f.section)}</span>
      </div>

      <FindingEvidence finding={f} />

      <div className="sa-ai">
        <span className="sa-ai__label"><InfoIcon size={14} />{isGap ? 'Suggested scope language' : 'AI recommendation'} · not contract language</span>
        {!isGap && <p className="sa-small">{f.action}</p>}
        <p className="sa-ai__text">{f.recommendation}</p>
        {f.inserted && (
          <p className="sa-small sa-text-success">Inserted into §{secNum}. Mark the finding resolved once the wording is final.</p>
        )}
        <div className="sa-row">
          <Button variant="primary" size="sm" disabled={locked} onClick={() => r.insert(f, d.sectionLabel(f.section))}>
            {f.inserted ? 'Insert again' : 'Insert into scope'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => r.jumpTo(f.section)}>Go to §{secNum}</Button>
        </div>
      </div>

      <div className="sa-dl">
        <span className="sa-dl__term">Decision</span>
        <div className="sa-row">
          <Button variant="secondary" size="sm" disabled={locked || f.status === 'Resolved'} onClick={() => r.resolve(f.id)}>Mark resolved</Button>
          <Button variant="outline" size="sm" disabled={locked || f.status === 'Accepted'} onClick={() => r.accept(f.id)}>Accept risk</Button>
          <Button variant="ghost" size="sm" disabled={locked || f.status === 'Dismissed'} onClick={() => r.dismiss(f.id)}>Dismiss</Button>
          {f.status !== 'Open' && <Button variant="ghost" size="sm" disabled={locked} onClick={() => r.reopen(f.id)}>Reopen</Button>}
        </div>
        <p className="sa-small sa-muted">Resolved: the scope now addresses it. Accepted: risk acknowledged, no change. Dismissed: not applicable.</p>
      </div>

      <FindingNotes finding={f} />
    </div>
  );
}
