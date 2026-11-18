import { useScheduleA } from '../../hooks/useScheduleA';
import { FindingDetail } from './FindingDetail';
import { FindingFiltersBar } from './FindingFiltersBar';
import { FindingList } from './FindingList';

/** Review summary tiles, then either the filtered finding list or one finding's detail. */
export function ReviewTab() {
  const { state, d } = useScheduleA();
  const { lang, gap } = state.agents;
  const time = (at: string) => at.split(', ').slice(-1)[0];
  const ran = d.bothDone
    ? `Language review ${time(lang.ranAt)} · Gap review ${time(gap.ranAt)}`
    : d.anyRunning ? 'Agents running…' : 'Agents not run yet';
  const selected = state.findings.find((f) => f.id === state.selectedId);

  return (
    <>
      <div className="sa-panel__summary">
        <p className="sa-small sa-muted">{ran} · {state.findings.length} findings</p>
        <div className="sa-tiles">
          <div className="sa-tile sa-tile--crit"><b>{d.findings.openCrit}</b><span>Critical open</span></div>
          <div className="sa-tile sa-tile--high"><b>{d.findings.openHigh}</b><span>High open</span></div>
          <div className="sa-tile"><b>{d.findings.open.length}</b><span>All open</span></div>
        </div>
        {d.findings.openCrit > 0 && (
          <p className="sa-small sa-text-destructive">Resolve critical findings before attaching to a requisition.</p>
        )}
      </div>
      {selected ? (
        <FindingDetail finding={selected} />
      ) : (
        <>
          <FindingFiltersBar />
          <FindingList />
        </>
      )}
    </>
  );
}
