import { TODAY } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { kindPrefix } from '../../lib/format';

/** Paper preview of the Schedule A document, watermarked DRAFT while critical findings are open. */
export function SchedulePreview() {
  const { state, d } = useScheduleA();
  const { details } = state;

  return (
    <article className="sa-paper" aria-label="Schedule A preview">
      {d.findings.openCrit > 0 && <div className="sa-paper__watermark" aria-hidden="true">DRAFT</div>}
      <p className="sa-small sa-muted sa-paper__meta">{details.contract || 'No contract'} · v{state.version}</p>
      <h2 className="sa-paper__title">SCHEDULE A — SCOPE OF WORK</h2>
      <p className="sa-paper__subtitle">{state.scopeTitle}</p>
      <table className="sa-paper__table">
        <tbody>
          <tr><th scope="row">Project</th><td>{details.project} ({details.projectNo})</td></tr>
          <tr><th scope="row">Subcontractor</th><td>{details.sub || 'Not awarded'}</td></tr>
          <tr><th scope="row">Trade / Division</th><td>{details.trade} / {d.divisionLine}</td></tr>
          <tr><th scope="row">Prepared by</th><td>{d.me.name}, {d.me.title} · {TODAY}</td></tr>
        </tbody>
      </table>
      <p>{state.scopeDesc}</p>
      {state.sections.map((sec, si) => (
        <section key={sec.id}>
          <h3>{si + 1}. {sec.title.toUpperCase()}</h3>
          <ol>
            {sec.items.map((it, ii) => (
              <li key={it.id}>
                <span>{si + 1}.{ii + 1}</span>
                <span>{kindPrefix(it.kind)}{it.text}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </article>
  );
}
