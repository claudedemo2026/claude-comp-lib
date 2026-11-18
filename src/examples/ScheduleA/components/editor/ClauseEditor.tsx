import { Button } from '../../../../components/Button';
import { Checkbox } from '../../../../components/Checkbox';
import { FormField } from '../../../../components/FormField';
import { Select } from '../../../../components/Select';
import { TextArea } from '../../../../components/TextArea';
import type { Clause, ClauseKind } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Banner } from '../shared/Banner';

/** Inline editor for one clause. New and AI-inserted clauses open here until saved. */
export function ClauseEditor({ clause: c, num }: { clause: Clause; num: string }) {
  const { state, actions } = useScheduleA();
  const draft = state.draft;
  if (!draft) return null;
  const a = actions.clause;

  return (
    <div id={`item-${c.id}`} className="sa-clause sa-clause--editing">
      <span className="sa-clause__num">{num}</span>
      <div className="sa-clause__editor">
        {c.srcType === 'ai' && (
          <Banner tone="info" compact>
            Inserted from <b>{c.src}</b>. This is AI-recommended wording: edit it to fit this contract before saving. It is not
            accepted contract language until you save it.
          </Banner>
        )}
        <FormField label={`Clause text for item ${num}`}>
          <TextArea rows={5} autoFocus value={draft.text} onChange={(e) => a.updateDraft({ text: e.target.value })} />
        </FormField>
        <div className="sa-row sa-row--between">
          <div className="sa-row">
            <label className="sa-row sa-small">
              Type
              <Select size="sm" value={draft.kind} onChange={(e) => a.updateDraft({ kind: e.target.value as ClauseKind })}>
                <option value="Inclusion">Inclusion</option>
                <option value="Exclusion">Exclusion</option>
                <option value="Clarification">Clarification</option>
              </Select>
            </label>
            <Checkbox label="Critical item" checked={draft.crit} onChange={(e) => a.updateDraft({ crit: e.target.checked })} />
          </div>
          <div className="sa-row">
            <Button variant="ghost" size="sm" onClick={a.cancel}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={a.save}>Save item</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
