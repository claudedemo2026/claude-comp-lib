import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Checkbox } from '../../../../components/Checkbox';
import { FormField } from '../../../../components/FormField';
import { Select } from '../../../../components/Select';
import { REQUISITIONS } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Banner } from '../shared/Banner';
import { Modal } from '../shared/Modal';
import { ExportDone } from './ExportDone';
import { ExportSummary } from './ExportSummary';

/** Export as PDF or Word, issue for tender, or attach to the awarded requisition. */
export function ExportModal() {
  const { state, d, actions } = useScheduleA();
  const { lifecycle, ui } = actions;
  const { openCrit, openHigh } = d.findings;
  const { details } = state;

  if (state.exportDone) return <ExportDone result={state.exportDone} />;

  return (
    <Modal wide title="Export Schedule A" description="Review what will be issued." onClose={ui.closeModal}
      footer={
        <>
          <Button variant="ghost" onClick={ui.closeModal}>Cancel</Button>
          <Button variant="outline" onClick={() => lifecycle.exportAs('word')}>Export as Word</Button>
          <Button variant="outline" onClick={() => lifecycle.exportAs('pdf')}>Export as PDF</Button>
          {details.status === 'Draft' && d.canEdit && (
            <Button variant="secondary" onClick={lifecycle.issueForTender}>Issue for tender</Button>
          )}
          <Button variant="primary" disabled={!!d.attachReason} onClick={() => lifecycle.exportAs('attach')}>
            {details.requisition ? `Attach to ${details.requisition}` : 'Attach to requisition'}
          </Button>
        </>
      }>
      {openCrit > 0 ? (
        <Banner tone="crit">
          <b>{openCrit} critical and {openHigh} high findings are unresolved.</b> PDF and Word exports will carry a DRAFT watermark.
          Attaching to the requisition is blocked.
        </Banner>
      ) : d.bothDone ? (
        <Banner tone="ok">No critical findings open. {openHigh} high findings remain; they are listed in the review log appendix.</Banner>
      ) : null}
      <ExportSummary />
      <Card padding="md" className="sa-stack">
        <b>Attach to a requisition</b>
        <FormField label="Requisition" hint="Choosing one fills in the contract and subcontractor.">
          <Select value={details.requisition} disabled={!d.canEdit} onChange={(e) => actions.scope.setRequisition(e.target.value)}>
            <option value="">Not assigned</option>
            {REQUISITIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </Select>
        </FormField>
        {d.attachReason && <span className="sa-small sa-text-warning">{d.attachReason}</span>}
      </Card>
      {openCrit > 0 && state.role === 'admin' && (
        <Checkbox
          label="Admin override: attach despite open critical findings"
          description="Recorded in the audit log with your name and the open finding IDs."
          checked={state.override}
          onChange={(e) => ui.setOverride(e.target.checked)}
        />
      )}
    </Modal>
  );
}
