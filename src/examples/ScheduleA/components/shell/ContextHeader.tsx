import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { STATUS_COLOR } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { EyeIcon } from '../../icons';
import { Banner } from '../shared/Banner';

/** Breadcrumbs, scope title, status, save state and the scope-level actions. */
export function ContextHeader() {
  const { state, d, actions } = useScheduleA();
  const onList = state.screen === 'list';
  const title = state.scopeTitle || 'New scope of work';
  const alerts = d.findings.openCrit + d.findings.openHigh;

  return (
    <>
      <header className="sa-ctx">
        <nav className="sa-crumbs" aria-label="Breadcrumb">
          <span>Projects</span>
          <span aria-hidden="true">/</span>
          <span>{state.details.project} ({state.details.projectNo})</span>
          <span aria-hidden="true">/</span>
          <button type="button" className="sa-link-btn" onClick={() => actions.ui.go('list')}>All Schedule A scopes</button>
          {!onList && (
            <>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </>
          )}
        </nav>
        {!onList && (
          <div className="sa-row sa-row--between">
            <div className="sa-row">
              <h1 className="sa-ctx__title">{title}</h1>
              <Badge color={STATUS_COLOR[state.details.status]} dot>{state.details.status}</Badge>
              <span className="sa-save" role="status">
                <span className={`sa-save__dot${state.saveState === 'saving' ? ' sa-save__dot--saving' : ''}`} />
                v{state.version} · {state.saveState === 'saving' ? 'Saving…' : `All changes saved · ${state.savedAt}`}
              </span>
            </div>
            <div className="sa-row">
              <Button variant="ghost" size="sm" onClick={() => actions.ui.setHistoryOpen(true)}>Versions</Button>
              <Button variant="ghost" size="sm" aria-expanded={state.panelOpen && state.panelTab === 'refs'}
                onClick={() => actions.ui.togglePanel('refs')}>References</Button>
              <Button variant="ghost" size="sm" aria-expanded={state.panelOpen && state.panelTab === 'review'}
                onClick={() => actions.ui.togglePanel('review')}>Review{alerts ? ` (${alerts})` : ''}</Button>
              <Button variant="primary" size="sm" disabled={!d.canEdit} onClick={actions.lifecycle.openExport}>Export</Button>
            </div>
          </div>
        )}
      </header>
      {state.role === 'follower' && (
        <div className="sa-follower">
          <Banner tone="info" icon={<EyeIcon size={18} />}>
            <b>Follower access.</b> You can view the scope and review findings and add notes. Editing, finding decisions,
            versions and export are turned off.
          </Banner>
        </div>
      )}
    </>
  );
}
