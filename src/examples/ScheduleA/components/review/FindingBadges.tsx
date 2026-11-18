import { Badge } from '../../../../components/Badge';
import type { Finding, FindingStatus } from '../../data/types';
import { SEVERITY, STATUS_COLOR } from '../../lib/findings';

/** Severity for language findings; "<severity> risk" for historical gaps. */
export function SeverityBadge({ finding, long }: { finding: Finding; long?: boolean }) {
  const sv = SEVERITY[finding.sev];
  return (
    <Badge size="sm" color={sv.color} variant={sv.variant}>
      {long && finding.agent === 'gap' ? `${finding.sev} risk` : finding.sev}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: FindingStatus }) {
  return <Badge size="sm" color={STATUS_COLOR[status]} dot>{status}</Badge>;
}
