import { Badge } from '../../../../components/Badge';
import { Checkbox } from '../../../../components/Checkbox';
import { useScheduleA } from '../../hooks/useScheduleA';
import { kindColor } from '../../lib/format';
import { Banner } from '../shared/Banner';

/** Second stage of the import: the parsed clauses, each with a checkbox. */
export function ImportPreview() {
  const { state, actions } = useScheduleA();
  const rows = state.imp.rows;
  const sectionCount = new Set(rows.map((r) => r.section)).size;
  const existing = new Set(state.sections.map((s) => s.title.toLowerCase()));

  return (
    <>
      <Banner tone="info">
        Found <b>{rows.length} clauses</b> in <b>{sectionCount} sections</b>. Untick anything you do not want. Imported clauses are
        tagged so reviewers can see their source.
      </Banner>
      <div className="sa-table-wrap sa-table-wrap--bordered">
        <table className="sa-table">
          <thead>
            <tr><th scope="col">Import</th><th scope="col">Section</th><th scope="col">Clause</th><th scope="col">Type</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td><Checkbox aria-label={`Import clause ${i + 1}`} checked={r.on} onChange={() => actions.refs.toggleRow(i)} /></td>
                <td className="sa-small sa-nowrap">
                  {r.section}
                  {!existing.has(r.section.toLowerCase()) && <div className="sa-small sa-muted">New section</div>}
                </td>
                <td>{r.text}</td>
                <td><Badge size="sm" color={kindColor(r.kind)}>{r.kind}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
