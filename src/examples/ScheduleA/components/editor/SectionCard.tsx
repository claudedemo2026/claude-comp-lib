import { Button } from '../../../../components/Button';
import type { Section } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { SEVERITY } from '../../lib/findings';
import { ClauseEditor } from './ClauseEditor';
import { ClauseRow } from './ClauseRow';

/** One numbered section of the scope: heading, open-finding link, and its clauses. */
export function SectionCard({ section, index }: { section: Section; index: number }) {
  const { state, d, actions } = useScheduleA();
  const n = index + 1;
  const findings = d.findings.open
    .filter((f) => f.section === section.id)
    .sort((a, b) => SEVERITY[a.sev].rank - SEVERITY[b.sev].rank);

  return (
    <section id={`sec-${section.id}`} aria-label={section.title}
      className={`sa-section${state.highlight === section.id ? ' sa-section--highlight' : ''}`}>
      <div className="sa-section__head">
        <span className="sa-section__num">§{n}</span>
        <h3 className="sa-h-sec sa-section__title">
          {section.title} <span className="sa-small sa-muted">· {section.items.length} items</span>
        </h3>
        {findings.length > 0 && (
          <button type="button" className="sa-finding-link" onClick={() => actions.review.select(findings[0].id)}>
            {findings.length} open finding{findings.length > 1 ? 's' : ''} · {findings[0].sev}
          </button>
        )}
        {d.canEdit && (
          <div className="sa-row">
            <Button variant="ghost" size="sm" onClick={() => actions.ui.openHistorical(section.id)}>Reuse a past clause</Button>
            <Button variant="outline" size="sm" onClick={() => actions.clause.add(section.id)}>Add clause</Button>
          </div>
        )}
      </div>
      {section.items.length === 0 && (
        <p className="sa-small sa-muted sa-section__empty">No items yet. Add an item or insert language from a historical scope.</p>
      )}
      {section.items.map((item, i) => {
        const num = `${n}.${i + 1}`;
        return state.draft?.id === item.id ? (
          <ClauseEditor key={item.id} clause={item} num={num} />
        ) : (
          <ClauseRow key={item.id} clause={item} num={num} isFirst={i === 0} isLast={i === section.items.length - 1} />
        );
      })}
    </section>
  );
}
