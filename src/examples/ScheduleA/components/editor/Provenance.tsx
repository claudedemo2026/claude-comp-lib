import type { Clause } from '../../data/types';

/** Shows where a clause came from, so reviewers can tell drafted, reused, imported and AI wording apart. */
export function Provenance({ clause: c }: { clause: Clause }) {
  switch (c.srcType) {
    case 'ai':
      return <span className="sa-prov sa-prov--ai">From {c.src} · AI recommendation, edited by user</span>;
    case 'hist':
      return <span className="sa-prov sa-prov--hist">Reused from {c.src}</span>;
    case 'ref':
      return <span className="sa-prov sa-prov--ref">From reference: {c.src}</span>;
    case 'import':
      return <span className="sa-prov sa-prov--import">Imported from {c.src}</span>;
    default:
      return null;
  }
}
