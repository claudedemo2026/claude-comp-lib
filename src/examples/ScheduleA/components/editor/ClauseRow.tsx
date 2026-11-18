import { Badge } from '../../../../components/Badge';
import type { Clause } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { kindColor } from '../../lib/format';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, EditIcon, TrashIcon } from '../../icons';
import { Provenance } from './Provenance';

interface ClauseRowProps {
  clause: Clause;
  num: string;
  isFirst: boolean;
  isLast: boolean;
}

/** A clause in read mode, with its tags, where it came from, and the edit actions. */
export function ClauseRow({ clause: c, num, isFirst, isLast }: ClauseRowProps) {
  const { d, actions } = useScheduleA();
  const a = actions.clause;

  return (
    <div id={`item-${c.id}`} className={`sa-clause${c.kind === 'Exclusion' ? ' sa-clause--exclusion' : ''}`}>
      <span className="sa-clause__num">{num}</span>
      <div>
        <p className="sa-clause__text">{c.text}</p>
        <div className="sa-clause__tags">
          {c.kind !== 'Inclusion' && <Badge size="sm" color={kindColor(c.kind)}>{c.kind}</Badge>}
          {c.crit && <Badge size="sm" color="red" dot>Critical item</Badge>}
          {c.tags.map((t) => <span key={t} className="sa-tag">{t}</span>)}
          <Provenance clause={c} />
        </div>
      </div>
      {d.canEdit && (
        <div className="sa-clause__actions">
          <button type="button" className="sa-icon-btn" aria-label={`Edit item ${num}`} title="Edit" onClick={() => a.edit(c)}><EditIcon /></button>
          <button type="button" className="sa-icon-btn" aria-label={`Duplicate item ${num}`} title="Duplicate" onClick={() => a.duplicate(c.id, num)}><CopyIcon /></button>
          <button type="button" className="sa-icon-btn" aria-label={`Move item ${num} up`} title="Move up" disabled={isFirst} onClick={() => a.move(c.id, -1)}><ArrowUpIcon /></button>
          <button type="button" className="sa-icon-btn" aria-label={`Move item ${num} down`} title="Move down" disabled={isLast} onClick={() => a.move(c.id, 1)}><ArrowDownIcon /></button>
          <button type="button" className="sa-icon-btn sa-icon-btn--danger" aria-label={`Delete item ${num}`} title="Delete" onClick={() => a.remove(c.id, num)}><TrashIcon /></button>
        </div>
      )}
    </div>
  );
}
