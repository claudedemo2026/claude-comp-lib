import { Card } from '../../../../components/Card';
import { useScheduleA } from '../../hooks/useScheduleA';
import { CheckIcon, CloseIcon } from '../../icons';

type CheckState = 'ok' | 'no' | 'warn';

interface Check {
  state: CheckState;
  label: string;
  detail: string;
}

const STATE_TEXT: Record<CheckState, string> = { ok: 'Passed', no: 'Blocking', warn: 'Warning' };

/** Checklist of what must be true before the scope is issued. */
export function Readiness() {
  const { state, d } = useScheduleA();
  const f = d.findings;
  const checks: Check[] = [
    { state: d.detailsDone ? 'ok' : 'no', label: 'Scope details complete', detail: `${state.details.trade || 'Trade not set'} · ${d.divisionLine || 'no divisions'}` },
    { state: d.stats.items ? 'ok' : 'no', label: 'Scope content', detail: `${d.stats.sections} sections, ${d.stats.items} items, ${d.stats.critical} critical items` },
    { state: d.docSel ? 'ok' : 'no', label: 'Reference documents', detail: `${d.docSel} documents compared` },
    { state: d.bothDone ? (d.anyStale ? 'warn' : 'ok') : 'no', label: 'Review agents',
      detail: d.bothDone ? (d.anyStale ? 'Scope changed since last run. Rerun recommended.' : 'Both agents ran on the current wording.') : 'Run both agents before issuing.' },
    { state: f.openCrit ? 'no' : 'ok', label: 'Critical findings', detail: f.openCrit ? `${f.openCrit} open: ${f.openCritIds.join(', ')}` : 'None open' },
    { state: f.openHigh ? 'warn' : 'ok', label: 'High findings', detail: f.openHigh ? `${f.openHigh} open. Resolve, accept or dismiss each.` : 'None open' },
    { state: f.gapsOpen ? 'warn' : 'ok', label: 'Unpriced gap exposure', detail: f.exposure },
  ];

  return (
    <Card as="section" padding="lg" aria-labelledby="sa-ready-title">
      <h3 id="sa-ready-title" className="sa-h-sec">Readiness</h3>
      <ul className="sa-checks">
        {checks.map((c) => (
          <li key={c.label} className="sa-check">
            <span className={`sa-check__mark sa-check__mark--${c.state}`}>
              {c.state === 'ok' ? <CheckIcon size={12} strokeWidth={3} /> : c.state === 'no' ? <CloseIcon size={12} strokeWidth={3} /> : '!'}
              <span className="sa-visually-hidden">{STATE_TEXT[c.state]}:</span>
            </span>
            <div>
              <b>{c.label}</b>
              <p className="sa-small sa-muted">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
