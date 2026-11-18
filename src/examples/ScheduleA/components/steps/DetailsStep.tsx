import { Badge } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Chip } from '../../../../components/Chip';
import { FormField } from '../../../../components/FormField';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { REQUISITIONS } from '../../data/project';
import { DIVISIONS } from '../../data/sections';
import { useScheduleA } from '../../hooks/useScheduleA';
import { StepHeading } from './StepHeading';

/** Step 1: what the scope covers, and (optionally) who it is awarded to. */
export function DetailsStep() {
  const { state, d, actions } = useScheduleA();
  const { details, detErr } = state;
  const { scope } = actions;
  const ro = !d.canEdit;

  return (
    <>
      <StepHeading title="Scope details"
        description="What this scope of work covers. A contract and subcontractor are not needed while drafting; assign them when the scope is awarded." />

      <Card as="section" padding="lg" className="sa-stack" aria-labelledby="sa-details-scope">
        <h3 id="sa-details-scope" className="sa-h-sec">Scope of work</h3>
        <div className="sa-fields">
          <FormField label="Scope title" required error={detErr.title}>
            <Input value={state.scopeTitle} onChange={(e) => scope.setTitle(e.target.value)} disabled={ro}
              placeholder="e.g. Electrical Scope of Work — Phase 2 Tower" />
          </FormField>
          <FormField label="Trade" required error={detErr.trade}>
            <Input value={details.trade} onChange={(e) => scope.setDetail('trade', e.target.value)} disabled={ro} placeholder="e.g. Mechanical — HVAC" />
          </FormField>
          <FormField label="Project" hint="From Gate Three.">
            <Input value={`${details.project} (${details.projectNo})`} disabled />
          </FormField>
          <FormField label="Project type" hint="Used to match similar historical projects.">
            <Input value={details.projectType} onChange={(e) => scope.setDetail('projectType', e.target.value)} disabled={ro} />
          </FormField>
        </div>
        <div role="group" aria-labelledby="sa-div-label" className="sa-stack sa-stack--tight">
          <span className="sa-field-label" id="sa-div-label">Divisions (MasterFormat)<i aria-hidden="true">*</i></span>
          <span className="sa-small sa-muted">Select every division this scope covers. One trade often carries several.</span>
          <div className="sa-chips">
            {DIVISIONS.map(([code, name]) => (
              <Chip key={code} selected={details.divisions.includes(code)} disabled={ro} onClick={() => scope.toggleDivision(code)}>
                {code} {name}
              </Chip>
            ))}
          </div>
          <span className="sa-small">{d.divisions.length ? `${d.divisions.length} selected: ${d.divisionLine}` : 'None selected'}</span>
          {detErr.divisions && <span className="sa-field-error" role="alert">{detErr.divisions}</span>}
        </div>
      </Card>

      <Card as="section" padding="lg" className="sa-stack" aria-labelledby="sa-details-award">
        <div className="sa-row sa-row--between">
          <h3 id="sa-details-award" className="sa-h-sec">Award</h3>
          <Badge size="sm">Optional while drafting</Badge>
        </div>
        <p className="sa-small sa-muted">
          Leave blank for a tender scope. When the subcontract is awarded, pick its requisition from Gate Three; the contract and subcontractor fill in from it.
        </p>
        <div className="sa-fields">
          <FormField label="Requisition">
            <Select value={details.requisition} onChange={(e) => scope.setRequisition(e.target.value)} disabled={ro}>
              <option value="">Not assigned</option>
              {REQUISITIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </Select>
          </FormField>
          <FormField label="Contract">
            <Input value={details.contract} onChange={(e) => scope.setDetail('contract', e.target.value)} placeholder="Not awarded" disabled={ro} />
          </FormField>
          <FormField label="Subcontractor">
            <Input value={details.sub} onChange={(e) => scope.setDetail('sub', e.target.value)} placeholder="Not awarded" disabled={ro} />
          </FormField>
        </div>
      </Card>

      <Card padding="lg">
        <dl className="sa-kv">
          <div><dt>Scope status</dt><dd>{details.status}</dd></div>
          <div><dt>Current version</dt><dd className="sa-mono">v{state.version}</dd></div>
          <div><dt>Last updated</dt><dd>{state.mode === 'main' ? 'Nov 18, 2026, 10:42 AM' : 'Today'}</dd></div>
          <div><dt>Owner</dt><dd>{details.owner}</dd></div>
        </dl>
      </Card>

      <div className="sa-row sa-row--end">
        <Button variant="primary" onClick={scope.continueDetails}>Continue to reference documents</Button>
      </div>
    </>
  );
}
