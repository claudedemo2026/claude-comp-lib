import { Button } from '../../../../components/Button';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Modal } from '../shared/Modal';
import { ImportInput } from './ImportInput';
import { ImportPreview } from './ImportPreview';

/** Paste or upload scope notes, review the parsed clauses, then add them to the scope. */
export function ImportModal() {
  const { state, actions } = useScheduleA();
  const { imp } = state;
  const r = actions.refs;
  const lines = imp.text.split(/\n/).filter((l) => l.trim()).length;
  const selected = imp.rows.filter((x) => x.on).length;

  const footer =
    imp.stage === 'input' ? (
      <>
        <Button variant="ghost" onClick={actions.ui.closeModal}>Cancel</Button>
        <Button variant="primary" disabled={!lines} onClick={r.parse}>Review import</Button>
      </>
    ) : imp.stage === 'preview' ? (
      <>
        <Button variant="ghost" onClick={r.backToInput}>Back</Button>
        <Button variant="primary" disabled={!selected} onClick={r.doImport}>Import {selected} clauses</Button>
      </>
    ) : undefined;

  return (
    <Modal wide title="Import text or document" onClose={actions.ui.closeModal} footer={footer}
      description="Bring in scope notes from your drawing and specification review. Headings become sections; each line becomes a clause.">
      {imp.stage === 'input' && <ImportInput lines={lines} />}
      {imp.stage === 'parsing' && (
        <div className="sa-empty" role="status">
          <span className="sa-spinner" />
          <p className="sa-muted">Reading {lines} lines and detecting sections…</p>
        </div>
      )}
      {imp.stage === 'preview' && <ImportPreview />}
    </Modal>
  );
}
