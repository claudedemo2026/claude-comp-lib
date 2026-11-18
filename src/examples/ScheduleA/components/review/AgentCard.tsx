import { Badge, type BadgeColor } from '../../../../components/Badge';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import type { AgentKey, AgentRun } from '../../data/types';
import { useScheduleA } from '../../hooks/useScheduleA';
import { AgentIcon } from '../../icons';
import { Banner } from '../shared/Banner';

const AGENTS: Record<AgentKey, { name: string; desc: string }> = {
  lang: { name: 'Language Review Agent', desc: 'Finds contradictions, overlap with standard schedules, unclear responsibilities and conflicting inclusions and exclusions.' },
  gap: { name: 'Historical Scope Gap Agent', desc: 'Ranks the five most likely scope gaps from similar projects by trade, division, project type and draft wording.' },
};

function statusOf(run: AgentRun): [string, BadgeColor] {
  if (run.status === 'running') return ['Running', 'lavender'];
  if (run.status === 'error') return ['Failed', 'red'];
  if (run.status === 'idle') return ['Not run', 'neutral'];
  return run.stale ? ['Outdated', 'orange'] : ['Complete', 'green'];
}

/** Status, last run and rerun control for one review agent. */
export function AgentCard({ agent }: { agent: AgentKey }) {
  const { state, d, actions } = useScheduleA();
  const run = state.agents[agent];
  const { name, desc } = AGENTS[agent];
  const [label, color] = statusOf(run);
  const count = state.findings.filter((f) => f.agent === agent).length;
  const stdDocs = d.docSel - d.histSel;
  const sources = agent === 'lang' ? `${stdDocs} documents` : `${d.histSel} historical sources`;
  const progress = agent === 'lang'
    ? `Comparing ${d.stats.items} clauses with ${stdDocs} contract documents…`
    : 'Matching against 412 change orders on 38 projects…';

  return (
    <Card as="section" padding="lg" className="sa-agent" aria-label={name}>
      <div className="sa-row sa-row--nowrap sa-row--start">
        <span className="sa-agent__icon"><AgentIcon size={22} /></span>
        <div className="sa-grow">
          <h3 className="sa-h-sec">{name}</h3>
          <p className="sa-small sa-muted">{desc}</p>
        </div>
        <Badge color={color} dot>{label}</Badge>
      </div>
      <dl className="sa-kv sa-kv--3 sa-kv--ruled">
        <div><dt>Last run</dt><dd>{run.ranAt || 'Never'}</dd></div>
        <div><dt>Findings</dt><dd>{run.status === 'complete' || count ? count : '—'}</dd></div>
        <div><dt>Sources</dt><dd>{sources}</dd></div>
      </dl>
      {run.status === 'running' && (
        <div className="sa-stack sa-stack--tight" role="status">
          <div className="sa-indeterminate"><i /></div>
          <span className="sa-small sa-muted sa-row"><span className="sa-spinner" />{progress}</span>
        </div>
      )}
      {run.status === 'complete' && run.stale && <Banner tone="warn" compact>The scope changed after this run. Rerun to check the new wording.</Banner>}
      {run.status === 'error' && <Banner tone="crit" compact><b>Run failed.</b> {run.error}</Banner>}
      <div className="sa-row">
        <Button variant="outline" size="sm" disabled={!d.canEdit || run.status === 'running'} onClick={() => actions.review.run(agent)}>
          {run.status === 'idle' ? 'Run agent' : run.status === 'running' ? 'Running…' : 'Rerun agent'}
        </Button>
        {run.status === 'error' && <Button variant="ghost" size="sm" onClick={() => actions.ui.go('refs')}>Choose documents</Button>}
      </div>
    </Card>
  );
}
