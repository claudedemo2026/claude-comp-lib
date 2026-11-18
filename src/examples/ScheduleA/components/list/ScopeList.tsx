import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { STATUS_COLOR } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { REGISTER_ROWS, type ScopeRow } from './scopeRows';

/** All Schedule A scopes on the project: open one or start a new one. */
export function ScopeList() {
  const { state, d, actions } = useScheduleA();

  const current: ScopeRow = {
    key: 'current', title: state.scopeTitle || 'Untitled scope of work', sub: state.details.sub || 'Not awarded',
    req: state.details.requisition, trade: state.details.trade || 'Trade not set', division: d.divisionLine || 'No divisions',
    status: state.details.status, version: state.version, updated: state.mode === 'main' ? 'Nov 18, 2026' : 'Today',
    owner: state.details.owner, action: 'Open draft', target: 'current',
  };
  // The populated example is only listed separately while another scope is open.
  const rows = [current, ...REGISTER_ROWS.filter((r) => !(state.mode === 'main' && r.target === 'example'))];

  const open = (row: ScopeRow) => {
    if (row.target === 'current') actions.ui.go('editor');
    else if (row.target === 'example') actions.lifecycle.openExample();
    else actions.ui.notice(`${row.sub} is not populated in this prototype. Open the HVAC scope.`);
  };

  return (
    <div className="sa-page sa-stack">
      <div className="sa-row sa-row--between">
        <div>
          <h2 className="sa-h-page">Schedule A scopes</h2>
          <p className="sa-muted">{state.details.project} · Project {state.details.projectNo} · scopes for tender and subcontract</p>
        </div>
        <Button variant="primary" disabled={!d.canEdit} onClick={() => actions.ui.openModal('newScope')}>New scope of work</Button>
      </div>
      <Card padding="none" className="sa-table-wrap">
        <table className="sa-table">
          <thead>
            <tr>
              <th scope="col">Scope</th><th scope="col">Award</th><th scope="col">Trade · Division</th><th scope="col">Status</th>
              <th scope="col">Version</th><th scope="col">Last updated</th><th scope="col">Owner</th>
              <th scope="col"><span className="sa-visually-hidden">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td><button type="button" className="sa-table__link" onClick={() => open(r)}>{r.title}</button></td>
                <td>{r.sub}<div className="sa-small sa-muted">{r.req}</div></td>
                <td>{r.trade}<div className="sa-small sa-muted">{r.division}</div></td>
                <td><Badge color={STATUS_COLOR[r.status]} dot>{r.status}</Badge></td>
                <td className="sa-mono">v{r.version}</td>
                <td className="sa-nowrap">{r.updated}</td>
                <td className="sa-nowrap">{r.owner}</td>
                <td><Button variant="outline" size="sm" onClick={() => open(r)}>{r.action}</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="sa-small sa-muted">Scopes are listed from the project's subcontract register in Gate Three. Only the HVAC scope holds full demo content.</p>
    </div>
  );
}
