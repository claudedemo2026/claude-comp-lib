import { Chip } from '../../../../components/Chip';
import { useScheduleA } from '../../hooks/useScheduleA';
import type { FindingFilters } from '../../state/types';

const GROUPS: { key: keyof FindingFilters; label: string; options: [string, string][] }[] = [
  { key: 'agent', label: 'Agent', options: [['All', 'All'], ['lang', 'Language'], ['gap', 'Historical gaps']] },
  { key: 'sev', label: 'Severity', options: [['All', 'All'], ['Critical', 'Critical'], ['High', 'High'], ['Medium', 'Medium'], ['Low', 'Low']] },
  { key: 'status', label: 'Status', options: [['All', 'All'], ['Open', 'Open'], ['Accepted', 'Accepted'], ['Resolved', 'Resolved'], ['Dismissed', 'Dismissed']] },
];

/** Toggle chips that filter the finding list by agent, severity and status. */
export function FindingFiltersBar() {
  const { state, actions } = useScheduleA();
  return (
    <div className="sa-filters">
      {GROUPS.map((g) => (
        <div key={g.key} role="group" aria-label={`Filter by ${g.label.toLowerCase()}`} className="sa-filters__group">
          <span className="sa-filters__label">{g.label}</span>
          <div className="sa-chips sa-chips--tight">
            {g.options.map(([value, label]) => (
              <Chip key={value} size="sm" selected={state.filters[g.key] === value}
                onClick={() => actions.review.setFilter({ [g.key]: value } as Partial<FindingFilters>)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
