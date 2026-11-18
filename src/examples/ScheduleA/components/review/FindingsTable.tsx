import { Card } from '../../../../components/Card';
import { useScheduleA } from '../../hooks/useScheduleA';
import { agentLabel, sortFindings } from '../../lib/findings';
import { moneyShort } from '../../lib/format';
import { SeverityBadge, StatusBadge } from './FindingBadges';

/** All findings by priority. Selecting one opens it in the side panel. */
export function FindingsTable() {
  const { state, d, actions } = useScheduleA();
  const rows = sortFindings(state.findings);

  return (
    <Card as="section" padding="none" aria-labelledby="sa-findings-title">
      <div className="sa-card-head">
        <div>
          <h3 id="sa-findings-title" className="sa-h-sec">Findings by priority</h3>
          <p className="sa-small sa-muted">Critical and high findings first. Select a finding to review it in the panel.</p>
        </div>
        <span className="sa-small">Open gap exposure <b className="sa-mono">{d.findings.exposure}</b></span>
      </div>
      <div className="sa-table-wrap">
        <table className="sa-table">
          <thead>
            <tr>
              <th scope="col">ID</th><th scope="col">Finding</th><th scope="col">Agent</th><th scope="col">Severity / risk</th>
              <th scope="col">Section</th><th scope="col">Exposure</th><th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className={`sa-table__row--click${state.selectedId === f.id ? ' sa-table__row--selected' : ''}`}
                onClick={() => actions.review.select(f.id)}>
                <td><span className="sa-code">{f.id}</span></td>
                <td>
                  <button type="button" className="sa-table__link" onClick={(e) => { e.stopPropagation(); actions.review.select(f.id); }}>
                    {f.title}
                  </button>
                </td>
                <td className="sa-small sa-nowrap">{agentLabel(f)}</td>
                <td><SeverityBadge finding={f} /></td>
                <td className="sa-small">{d.sectionLabel(f.section)}</td>
                <td className="sa-small sa-mono sa-nowrap">{f.agent === 'gap' ? `${moneyShort(f.lo ?? 0)}–${moneyShort(f.hi ?? 0)}` : '—'}</td>
                <td><StatusBadge status={f.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
