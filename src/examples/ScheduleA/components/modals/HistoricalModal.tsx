import { useState } from 'react';
import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { HISTORICAL_CLAUSES } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { SearchIcon } from '../../icons';
import { Modal } from '../shared/Modal';

/** Search executed scopes and the trade template for a clause to reuse in a section. */
export function HistoricalModal() {
  const { state, d, actions } = useScheduleA();
  const [query, setQuery] = useState('');
  const sectionId = state.histSection ?? '';
  const sec = d.sectionIndex.get(sectionId);
  const q = query.trim().toLowerCase();
  const results = HISTORICAL_CLAUSES.filter((h) => !q || `${h.title} ${h.text}`.toLowerCase().includes(q));

  return (
    <Modal wide title="Insert historical language" onClose={actions.ui.closeModal}
      description={`Into §${sec?.n ?? ''} ${sec?.title ?? ''}. Clauses come from executed Schedule A scopes and the trade template.`}>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} startAdornment={<SearchIcon />}
        placeholder="Search clauses, e.g. seismic, temporary heat, firestopping" aria-label="Search historical clauses" />
      {results.map((h) => (
        <div key={h.id} className="sa-hist">
          <div className="sa-row sa-row--between">
            <b>{h.title}</b>
            <Badge size="sm" color="cyan">{h.from}</Badge>
          </div>
          <p className="sa-clause__text">{h.text}</p>
          <div className="sa-row sa-row--between">
            <span className="sa-small sa-muted">{h.meta}</span>
            <Button variant="outline" size="sm" onClick={() => {
              actions.scope.insertClause(sectionId, h.text, h.from, 'hist');
              actions.ui.closeModal();
              actions.ui.notice(`Inserted “${h.title}”. Edit it to fit this contract.`);
            }}>
              Insert into §{sec?.n}
            </Button>
          </div>
        </div>
      ))}
      {!results.length && <p className="sa-muted">No clauses match “{query}”.</p>}
    </Modal>
  );
}
