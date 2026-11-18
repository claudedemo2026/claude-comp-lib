import { useState } from 'react';
import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { FormField } from '../../../../components/FormField';
import { Select } from '../../../../components/Select';
import { DOC_TYPE_COLOR, REF_EXCERPTS } from '../../data/documents';
import type { RefDoc } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { BackIcon } from '../../icons';

/** One reference document's excerpts, each insertable into a chosen section. */
export function ReferenceDocument({ doc }: { doc: RefDoc }) {
  const { state, d, actions } = useScheduleA();
  const targets = state.sections.length
    ? state.sections.map((x, i) => ({ id: x.id, label: `§${i + 1} ${x.title}` }))
    : [{ id: '__new', label: 'General Requirements (new section)' }];
  const [target, setTarget] = useState(targets[0].id);
  const chosen = targets.some((t) => t.id === target) ? target : targets[0].id;
  const excerpts = REF_EXCERPTS[doc.id] ?? [{ ref: 'Summary', text: doc.meta }];
  const docShort = doc.name.split(' — ')[0];

  return (
    <div className="sa-panel-detail">
      <button type="button" className="sa-back" onClick={() => actions.refs.openDoc(null)}><BackIcon />All references</button>
      <div className="sa-stack sa-stack--tight">
        <span><Badge size="sm" color={DOC_TYPE_COLOR[doc.type]}>{doc.type}</Badge></span>
        <h3 className="sa-h-sub">{doc.name}</h3>
        <span className="sa-small sa-muted">{doc.meta} · {doc.date}</span>
      </div>
      {d.canEdit && (
        <FormField label="Insert into">
          <Select size="sm" value={chosen} onChange={(e) => setTarget(e.target.value)}>
            {targets.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </Select>
        </FormField>
      )}
      {excerpts.map((x) => (
        <div key={x.ref} className="sa-excerpt">
          <span className="sa-code">{x.ref}</span>
          <q>{x.text}</q>
          {d.canEdit && (
            <div>
              <Button variant="outline" size="sm" onClick={() => {
                actions.ui.go('editor');
                actions.scope.insertClause(chosen, x.text, `${docShort}, ${x.ref}`, 'ref');
                actions.ui.notice('Excerpt inserted. Edit it to read as a scope obligation.');
              }}>
                Insert as clause
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => actions.ui.notice('Opens the document viewer in Gate Three (simulated).')}>
        Open full document
      </Button>
    </div>
  );
}
