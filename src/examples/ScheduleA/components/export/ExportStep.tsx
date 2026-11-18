import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { LIFECYCLE } from '../../data/project';
import { useScheduleA } from '../../hooks/useScheduleA';
import { Banner } from '../shared/Banner';
import { StepHeading } from '../steps/StepHeading';
import { Readiness } from './Readiness';
import { SchedulePreview } from './SchedulePreview';

/** Step 5: lifecycle, readiness checks and a preview of the document that will be issued. */
export function ExportStep() {
  const { state, d, actions } = useScheduleA();
  const { status, requisition } = state.details;
  const current = LIFECYCLE.indexOf(status);
  const { openCrit } = d.findings;
  const lifeNote = status === 'Draft'
    ? 'Issue for tender from Export, or assign a requisition to attach directly.'
    : status === 'Issued for tender' ? 'Waiting for award.'
      : status === 'Revising for award' ? (requisition ? `Ready to attach to ${requisition}.` : 'Assign the awarded requisition.')
        : 'Complete.';

  return (
    <>
      <StepHeading
        title="Finalize and export"
        description="Check readiness, preview the document, then issue it for tender or attach it to a requisition."
        actions={<Button variant="primary" disabled={!d.canEdit} onClick={actions.lifecycle.openExport}>Export Schedule A</Button>}
      />
      <Card as="section" padding="lg" className="sa-stack" aria-labelledby="sa-life-title">
        <div className="sa-row sa-row--between">
          <h3 id="sa-life-title" className="sa-h-sec">Scope lifecycle</h3>
          <span className="sa-small sa-muted">{lifeNote}</span>
        </div>
        <ol className="sa-lifecycle">
          {LIFECYCLE.map((label, i) => (
            <li key={label} aria-current={i === current ? 'step' : undefined}
              className={i === current ? 'sa-lifecycle__on' : i < current ? 'sa-lifecycle__past' : undefined}>
              {label}
            </li>
          ))}
        </ol>
        {status === 'Issued for tender' && (
          <>
            <Banner tone="info">
              <b>Issued for tender.</b> When bids are in and the subcontract is awarded, revise this scope for award. That creates a
              new version you can edit, assign a requisition to, and attach.
            </Banner>
            <div><Button variant="primary" size="sm" disabled={!d.canEdit} onClick={actions.lifecycle.reviseForAward}>Revise for award</Button></div>
          </>
        )}
      </Card>
      {openCrit > 0 && (
        <Banner tone="crit">
          <b>{openCrit} critical finding{openCrit > 1 ? 's' : ''} unresolved.</b> You can export a watermarked draft, but attaching to the
          requisition is blocked until it is resolved or an Admin records an override.
        </Banner>
      )}
      {openCrit === 0 && d.bothDone && <Banner tone="ok"><b>Ready to issue.</b> No critical findings remain open.</Banner>}
      <div className="sa-export-grid">
        <Readiness />
        <SchedulePreview />
      </div>
    </>
  );
}
