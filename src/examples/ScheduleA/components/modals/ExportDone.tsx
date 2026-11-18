import { Button } from '../../../../components/Button';
import { useScheduleA } from '../../hooks/useScheduleA';
import { CheckIcon } from '../../icons';
import type { ExportResult } from '../../state/types';
import { Modal } from '../shared/Modal';

/** Confirmation after an export, issue or attach. */
export function ExportDone({ result }: { result: ExportResult }) {
  const { actions } = useScheduleA();
  return (
    <Modal wide title="Export Schedule A" description="Review what will be issued." onClose={actions.ui.closeModal}
      footer={
        <>
          <Button variant="outline" onClick={actions.ui.clearExportResult}>Export another format</Button>
          <Button variant="primary" onClick={actions.ui.closeModal}>Done</Button>
        </>
      }>
      <div className="sa-success" role="status">
        <span className="sa-success__icon"><CheckIcon size={24} strokeWidth={3} /></span>
        <h3 className="sa-h-sec">{result.title}</h3>
        <p className="sa-muted">{result.detail}</p>
        <span className="sa-code">{result.file}</span>
      </div>
    </Modal>
  );
}
