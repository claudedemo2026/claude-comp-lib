import { TODAY } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';

/** What the exported document will say about itself. */
export function ExportSummary() {
  const { state, d } = useScheduleA();
  const { details } = state;
  const f = d.findings;
  const award = details.sub ? `${details.sub}${details.contract ? ` · ${details.contract}` : ''}` : 'Not awarded (tender scope)';
  const review = d.bothDone
    ? `${f.openCrit} critical, ${f.openHigh} high open · ${f.resolved} resolved, ${f.accepted} accepted, ${f.dismissed} dismissed`
    : 'Review agents have not completed';
  const sections = state.sections.map((x, i) => `${i + 1}. ${x.title} (${x.items.length})`).join(' · ');

  const rows: [string, string][] = [
    ['Document title', `Schedule A — ${state.scopeTitle}`],
    ['Project', `${details.project} (${details.projectNo})`],
    ['Subcontractor', award],
    ['Status', details.status],
    ['Version', `v${state.version}`],
    ['Prepared by', `${d.me.name}, ${d.me.title}`],
    ['Prepared date', TODAY],
    ['Review status', review],
    ['Included sections', sections || 'None'],
  ];

  return (
    <table className="sa-paper__table sa-paper__table--compact">
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
