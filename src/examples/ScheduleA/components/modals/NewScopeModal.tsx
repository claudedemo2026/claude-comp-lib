import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { FormField } from '../../../../components/FormField';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { TRADES } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Modal } from '../shared/Modal';

/** Starts a new draft scope for the current project. */
export function NewScopeModal() {
  const { state, actions } = useScheduleA();
  const [title, setTitle] = useState('');
  const [trade, setTrade] = useState(TRADES[0]);
  const [error, setError] = useState('');

  const create = () => {
    if (!title.trim()) {
      setError('Enter a title for the scope of work.');
      return;
    }
    actions.lifecycle.createScope(title.trim(), trade);
  };

  return (
    <Modal title="New scope of work" description="For a tender or a subcontract. You can assign a subcontractor and requisition later."
      onClose={actions.ui.closeModal}
      footer={
        <>
          <Button variant="ghost" onClick={actions.ui.closeModal}>Cancel</Button>
          <Button variant="primary" onClick={create}>Create draft</Button>
        </>
      }>
      <FormField label="Project">
        <Input value={`${state.details.project} (${state.details.projectNo})`} disabled />
      </FormField>
      <FormField label="Scope title" required error={error}>
        <Input value={title} autoFocus placeholder="e.g. Electrical Scope of Work — Phase 2 Tower"
          onChange={(e) => { setTitle(e.target.value); setError(''); }} />
      </FormField>
      <FormField label="Trade">
        <Select value={trade} onChange={(e) => setTrade(e.target.value)}>
          {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
      </FormField>
    </Modal>
  );
}
