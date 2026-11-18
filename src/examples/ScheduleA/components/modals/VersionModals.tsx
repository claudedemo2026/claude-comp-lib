import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { FormField } from '../../../../components/FormField';
import { TextArea } from '../../../../components/TextArea';
import { useScheduleA } from '../../hooks/useScheduleA';
import { bumpVersion } from '../../lib/format';
import { Modal } from '../shared/Modal';

/** Saves a named snapshot of the scope. */
export function CreateVersionModal() {
  const { state, actions } = useScheduleA();
  const [note, setNote] = useState('');
  const next = bumpVersion(state.version);

  return (
    <Modal title={`Create version v${next}`} description="Saves a snapshot of the scope, references and finding decisions."
      onClose={actions.ui.closeModal} hideClose
      footer={
        <>
          <Button variant="ghost" onClick={actions.ui.closeModal}>Cancel</Button>
          <Button variant="primary" onClick={() => actions.lifecycle.createVersion(note)}>Create v{next}</Button>
        </>
      }>
      <FormField label="Change summary" hint="Optional. Shown in version history.">
        <TextArea rows={3} autoFocus value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Resolved controls wiring conflict (L1)" />
      </FormField>
    </Modal>
  );
}

/** Confirms restoring an older version as a new one. */
export function RestoreModal() {
  const { state, actions } = useScheduleA();
  const next = bumpVersion(state.version);

  return (
    <Modal alert hideClose title={`Restore v${state.restoreV}?`} onClose={actions.ui.closeModal}
      footer={
        <>
          <Button variant="ghost" onClick={actions.ui.closeModal}>Cancel</Button>
          <Button variant="danger" onClick={actions.lifecycle.restore}>Restore as v{next}</Button>
        </>
      }>
      <p>
        The scope content from v{state.restoreV} will be saved as a new version, v{next}. The current v{state.version} stays in history,
        and finding decisions are kept. Review agents will need to be rerun.
      </p>
    </Modal>
  );
}
