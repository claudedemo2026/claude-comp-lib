import { useScheduleA } from '../../hooks/useScheduleA';
import { agentLabel, filterFindings, sortFindings } from '../../lib/findings';
import { SeverityBadge, StatusBadge } from '../review/FindingBadges';

/** Findings matching the current filters, most urgent first. */
export function FindingList() {
  const { state, d, actions } = useScheduleA();
  const list = filterFindings(sortFindings(state.findings), state.filters);

  return (
    <div className="sa-panel-list">
      {list.map((f) => (
        <button type="button" key={f.id} className="sa-panel-item" onClick={() => actions.review.select(f.id)}>
          <span className="sa-row sa-row--tight">
            <span className="sa-code">{f.id}</span>
            <SeverityBadge finding={f} />
            <StatusBadge status={f.status} />
          </span>
          <span className="sa-panel-item__title">{f.title}</span>
          <span className="sa-small sa-muted">{agentLabel(f)} · {d.sectionLabel(f.section)}</span>
        </button>
      ))}
      {!list.length && (
        <p className="sa-small sa-muted sa-panel__intro">
          {state.findings.length ? 'No findings match these filters.' : 'No findings yet. Run the review agents from step 4.'}
        </p>
      )}
    </div>
  );
}
