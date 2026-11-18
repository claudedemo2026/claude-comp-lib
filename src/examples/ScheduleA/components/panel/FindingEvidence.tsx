import type { Finding } from '../../data/types';
import { money } from '../../lib/format';

/** Why the finding was raised: a source clause for language findings, history and pricing for gaps. */
export function FindingEvidence({ finding: f }: { finding: Finding }) {
  if (f.agent === 'lang') {
    return (
      <dl className="sa-dl-list">
        <div className="sa-dl"><dt className="sa-dl__term">Explanation</dt><dd>{f.explanation}</dd></div>
        <div className="sa-dl"><dt className="sa-dl__term">Source</dt><dd><span className="sa-source">{f.source}</span></dd></div>
      </dl>
    );
  }
  return (
    <dl className="sa-dl-list">
      <div className="sa-dl">
        <dt className="sa-dl__term">Confidence</dt>
        <dd className="sa-row sa-row--nowrap">
          <div className="sa-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={f.confidence} aria-label="Confidence">
            <i style={{ width: `${f.confidence ?? 0}%` }} />
          </div>
          <b className="sa-mono">{f.confidence}%</b>
        </dd>
      </div>
      <div className="sa-dl">
        <dt className="sa-dl__term">Estimated pricing range</dt>
        <dd>
          <b className="sa-mono sa-price">{money(f.lo ?? 0)} – {money(f.hi ?? 0)}</b>
          <span className="sa-small sa-muted sa-block">Median change-order value {f.median} on similar projects</span>
        </dd>
      </div>
      <div className="sa-dl"><dt className="sa-dl__term">Historical evidence</dt><dd>{f.evidence}</dd></div>
      <div className="sa-dl">
        <dt className="sa-dl__term">Similar projects</dt>
        <dd>
          <ul className="sa-plain-list">
            {f.projects?.map((p) => <li key={p} className="sa-small">{p}</li>)}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
