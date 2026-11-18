import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { FormField } from '../../../../components/FormField';
import { TextArea } from '../../../../components/TextArea';
import type { Finding } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';

/** Notes and decision history on a finding. Followers can add notes too. */
export function FindingNotes({ finding: f }: { finding: Finding }) {
  const { actions } = useScheduleA();
  const [draft, setDraft] = useState('');

  return (
    <div className="sa-dl">
      <span className="sa-dl__term">Notes and activity</span>
      {f.notes.length ? (
        <ul className="sa-notes">
          {f.notes.map((n, i) => (
            <li key={i} className="sa-note">
              {n.text}
              <small>{n.by} · {n.at}</small>
            </li>
          ))}
        </ul>
      ) : (
        <span className="sa-small sa-muted">No notes yet.</span>
      )}
      <FormField label="Add a note">
        <TextArea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="e.g. Confirmed with Division 26 estimator" />
      </FormField>
      <div>
        <Button variant="outline" size="sm" disabled={!draft.trim()}
          onClick={() => { actions.review.addNote(f.id, draft.trim()); setDraft(''); }}>
          Add note
        </Button>
      </div>
    </div>
  );
}
