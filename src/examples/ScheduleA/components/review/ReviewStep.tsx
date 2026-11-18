import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useScheduleA } from '../../hooks/useScheduleA';
import { StepHeading } from '../steps/StepHeading';
import { AgentCard } from './AgentCard';
import { FindingsTable } from './FindingsTable';

/** Step 4: run the review agents and work through their findings. */
export function ReviewStep() {
  const { state, d, actions } = useScheduleA();

  return (
    <>
      <StepHeading
        title="AI review"
        description="Agents flag issues and suggest wording. Nothing is added to the scope until you insert and save it."
        actions={
          <Button variant="primary" disabled={!d.canEdit} loading={d.anyRunning} onClick={actions.review.runBoth}>
            Run both agents
          </Button>
        }
      />
      <div className="sa-grid-2">
        <AgentCard agent="lang" />
        <AgentCard agent="gap" />
      </div>
      {state.findings.length > 0 ? (
        <FindingsTable />
      ) : (
        <Card padding="lg" className="sa-empty">
          <h3 className="sa-h-sec">No findings yet</h3>
          <p className="sa-muted">Run the agents to compare this draft with {d.docSel} reference documents.</p>
        </Card>
      )}
    </>
  );
}
