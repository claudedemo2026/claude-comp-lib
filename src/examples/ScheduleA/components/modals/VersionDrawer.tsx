import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Drawer } from '../../../../components/Drawer';
import { useScheduleA } from '../../hooks/useScheduleA';

/** Version history. Editors and Admins can save a version; only Admins can restore. */
export function VersionDrawer() {
  const { state, d, actions } = useScheduleA();

  return (
    <Drawer open={state.historyOpen} onClose={() => actions.ui.setHistoryOpen(false)} title="Version history" placement="right" size="md">
      <div className="sa-row sa-row--between">
        <p className="sa-small sa-muted">Current version <b className="sa-mono">v{state.version}</b>. Only Admins can restore.</p>
        <Button variant="outline" size="sm" disabled={!d.canEdit}
          onClick={() => { actions.ui.setHistoryOpen(false); actions.ui.openModal('createVersion'); }}>
          Save a version
        </Button>
      </div>
      <ol className="sa-versions">
        {state.versions.map((v, i) => (
          <li key={`${v.v}-${i}`} className="sa-version">
            <div className="sa-row sa-row--between">
              <span className="sa-row sa-row--tight">
                <b className="sa-mono">v{v.v}</b>
                {i === 0 && <Badge size="sm" color="blue">Current</Badge>}
              </span>
              <span className="sa-small sa-muted">{v.at}</span>
            </div>
            <span className="sa-small"><b>{v.by}</b> · {v.role}</span>
            <p className="sa-small sa-muted">{v.note}</p>
            {i > 0 && (
              <div className="sa-row">
                <Button variant="ghost" size="sm" onClick={() => actions.ui.notice(`Opened v${v.v} read-only in a new tab (simulated).`)}>View</Button>
                <Button variant="outline" size="sm" disabled={state.role !== 'admin'} onClick={() => actions.lifecycle.askRestore(v.v)}>Restore</Button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </Drawer>
  );
}
